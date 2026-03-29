import dspy
from dspy.teleprompt import BootstrapFewShot
from app.dspy_engine.modules import ContentGenerator, QualityScorer
from app.dspy_engine.metrics import content_quality_metric
from app.dspy_engine.program_store import ProgramStore


def build_training_examples(raw_examples: list[dict]) -> list[dspy.Example]:
    """Convert DB records into DSPy Example objects."""
    examples = []
    for ex in raw_examples:
        example = dspy.Example(
            topic=ex["topic"],
            platform=ex["platform"],
            tone=ex["tone"],
            # These are the "gold" outputs DSPy learns from
            content=ex["content"],
            clarity_score=ex["clarity_score"],
            engagement_score=ex["engagement_score"],
            platform_fit_score=ex["platform_fit_score"],
        ).with_inputs("topic", "platform", "tone")
        examples.append(example)
    return examples


def run_optimization(raw_examples: list[dict]) -> dict:
    """
    Main optimization function — called by the Celery worker.
    Returns a dict with results summary.
    """
    if len(raw_examples) < 5:
        return {"status": "skipped", "reason": "Not enough training examples (need at least 5)"}

    print(f"🚀 Starting DSPy optimization with {len(raw_examples)} examples...")

    trainset = build_training_examples(raw_examples)

    # BootstrapFewShot: automatically selects the best few-shot examples
    # by running the program on training data and keeping successful traces
    optimizer = BootstrapFewShot(
        metric=content_quality_metric,
        max_bootstrapped_demos=4,   # max few-shot examples to inject
        max_labeled_demos=4,
        max_rounds=1,
    )

    store = ProgramStore.get()
    compiled_generator = optimizer.compile(
        student=ContentGenerator(),
        trainset=trainset,
    )

    # Replace the active program with the newly compiled one
    store.generator = compiled_generator
    store.save_compiled()

    print("✅ Optimization complete. New program saved and hot-swapped.")
    return {
        "status": "success",
        "examples_used": len(trainset),
    }