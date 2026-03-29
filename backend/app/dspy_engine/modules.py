import dspy
from app.dspy_engine.signatures import ContentGenerationSignature, QualityScoringSignature


class ContentGenerator(dspy.Module):
    def __init__(self):
        super().__init__()
        # ChainOfThought adds reasoning steps before producing output
        self.generate = dspy.ChainOfThought(ContentGenerationSignature)

    def forward(self, topic: str, platform: str, tone: str) -> dspy.Prediction:
        return self.generate(topic=topic, platform=platform, tone=tone)


class QualityScorer(dspy.Module):
    def __init__(self):
        super().__init__()
        self.score = dspy.Predict(QualityScoringSignature)

    def forward(self, content: str, platform: str, tone: str) -> dspy.Prediction:
        result = self.score(content=content, platform=platform, tone=tone)
        
        # Clamp all scores to valid 1-10 range
        result.clarity_score = max(1.0, min(10.0, float(result.clarity_score)))
        result.engagement_score = max(1.0, min(10.0, float(result.engagement_score)))
        result.platform_fit_score = max(1.0, min(10.0, float(result.platform_fit_score)))
        
        return result