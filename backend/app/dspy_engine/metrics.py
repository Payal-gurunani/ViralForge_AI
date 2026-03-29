import dspy
from typing import Optional


def content_quality_metric(
    example: dspy.Example,
    prediction: dspy.Prediction,
    trace: Optional[object] = None
) -> float:
    try:
        clarity = float(getattr(prediction, "clarity_score", 0))
        engagement = float(getattr(prediction, "engagement_score", 0))
        platform_fit = float(getattr(prediction, "platform_fit_score", 0))

        # Weighted average
        weighted_score = (
            clarity * 0.30 +
            engagement * 0.45 +
            platform_fit * 0.25
        )

        # Normalize (0–1)
        normalized = weighted_score / 10.0

        # Safe content handling
        content = getattr(prediction, "content", "")

        if isinstance(content, str) and len(content) > 50:
            normalized = min(1.0, normalized + 0.05)

        return normalized

    except (ValueError, TypeError):
        return 0.0