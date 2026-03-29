from fastapi import APIRouter
from litellm import BaseModel
from app.dspy_engine.optimizer import run_optimization
from pydantic import BaseModel
from fastapi import HTTPException
from app.dspy_engine.program_store import ProgramStore

router = APIRouter()

# Placeholder training data store (replace with DB later)
training_examples: list[dict] = []


from pydantic import BaseModel

class TrainingExample(BaseModel):
    topic: str
    platform: str
    tone: str
    content: str
    clarity_score: float
    engagement_score: float
    platform_fit_score: float


@router.post("/add-example")
async def add_example(example: TrainingExample):
    training_examples.append(example.dict())
    return {"count": len(training_examples)}


@router.post("/run")
async def run_optimizer():
    """Manually trigger DSPy optimization."""
    result = run_optimization(training_examples)
    return result


@router.get("/status")
async def get_status():
    return {
        "training_examples": len(training_examples),
        "compiled_program_exists": True,
    }

@router.post("/reset")
async def reset():
    global training_examples
    training_examples = []
    return {"status": "cleared"}

class OptimizeRequest(BaseModel):
    content: str
    platform: str
    tone: str


@router.post("/")
async def optimize_content(req: OptimizeRequest):
    """
    User-facing optimization (improves content)
    """
    try:
        store = ProgramStore.get()

        optimized = store.generator(
        topic="content optimization",
        platform=req.platform,
        tone=f"Rewrite the following content in a more engaging, clear, and viral {req.tone} tone:\n\n{req.content}"
        )

        return {
            "optimized_content": optimized.content,
            "reasoning": optimized.reasoning
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))