import dspy

class ContentGenerationSignature(dspy.Signature):
    """Generate high-quality social media or blog content optimized for engagement."""
    
    topic: str = dspy.InputField(desc="The main topic or subject to write about")
    platform: str = dspy.InputField(desc="Target platform: twitter, linkedin, instagram, or blog")
    tone: str = dspy.InputField(desc="Desired tone: professional, casual, humorous, inspirational")
    
    content: str = dspy.OutputField(desc="The generated content optimized for the platform")
    reasoning: str = dspy.OutputField(desc="Brief explanation of creative choices made")


class QualityScoringSignature(dspy.Signature):
    """Score generated content on multiple quality dimensions."""
    
    content: str = dspy.InputField(desc="The content to evaluate")
    platform: str = dspy.InputField(desc="Platform the content is intended for")
    tone: str = dspy.InputField(desc="Intended tone of the content")
    
    clarity_score: float = dspy.OutputField(desc="Score 1-10: how clear and readable is the content")
    engagement_score: float = dspy.OutputField(desc="Score 1-10: how likely to drive engagement/interaction")
    platform_fit_score: float = dspy.OutputField(desc="Score 1-10: how well it fits the platform norms")
    feedback: str = dspy.OutputField(desc="One sentence of specific improvement feedback")