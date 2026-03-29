import dspy
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.dspy_engine.program_store import ProgramStore

app = FastAPI(title="ViralForge AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
   
    lm = dspy.LM(
    model=f"openrouter/{settings.DSPY_GENERATOR_MODEL}",
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
    max_tokens=1024,
)
    dspy.configure(lm=lm)

    # Load compiled DSPy program into memory
    ProgramStore.get()
    print("✅ ViralForge AI backend ready")


@app.get("/health")
async def health():
    return {"status": "ok"}


# Register routers (we'll create these next)
from app.api import content, optimize
app.include_router(content.router, prefix="/api/content", tags=["content"])
app.include_router(optimize.router, prefix="/api/optimize", tags=["optimize"])