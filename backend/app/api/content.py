from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.dspy_engine.program_store import ProgramStore

router = APIRouter()


class GenerateRequest(BaseModel):
    topic: str
    platform: str   # twitter | linkedin | instagram | blog
    tone: str       # professional | casual | humorous | inspirational


class GenerateResponse(BaseModel):
    content: str
    reasoning: str
    clarity_score: float
    engagement_score: float
    platform_fit_score: float
    overall_score: float
    feedback: str


@router.post("/generate")
async def generate_content(req: GenerateRequest):
    try:
        store = ProgramStore.get()

        # Generate content
        # Generate caption
        caption_result = store.generator(
            topic=req.topic,
            platform=req.platform,
            tone=req.tone,
        )

# Generate hashtags
        hashtags_result = store.generator(
                topic=req.topic,
                platform=req.platform,
                tone="generate 8 trending hashtags",
        )

# Generate hooks
        hooks_result = store.generator(
            topic=req.topic,
            platform=req.platform,
            tone="write 3 short viral hooks",
        )

        # Score it immediately
        score_result = store.scorer(
            content=caption_result.content,
            platform=req.platform,
            tone=req.tone,
        )

        overall = (
            score_result.clarity_score * 0.30 +
            score_result.engagement_score * 0.45 +
            score_result.platform_fit_score * 0.25
        )

        return {
    "caption": caption_result.content,
    "hashtags": hashtags_result.content,
    "hooks": hooks_result.content,

    "reasoning": caption_result.reasoning,
    "clarity_score": score_result.clarity_score,
    "engagement_score": score_result.engagement_score,
    "platform_fit_score": score_result.platform_fit_score,
    "overall_score": round(overall, 2),
    "feedback": score_result.feedback,
}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))