from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENROUTER_API_KEY: str
    ANTHROPIC_API_KEY: str
    OPENAI_API_BASE: str

    DATABASE_URL: str
    REDIS_URL: str
    CELERY_BROKER_URL: str
    CELERY_RESULT_BACKEND: str

    # DSPy config
    DSPY_GENERATOR_MODEL: str = "openai/gpt-4o-mini"
    DSPY_OPTIMIZER_MODEL: str = "openai/gpt-4o-mini"
    DSPY_OPTIMIZE_THRESHOLD: int = 20

    class Config:
        env_file = ".env"

settings = Settings()