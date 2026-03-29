import json
import os
from pathlib import Path
from app.dspy_engine.modules import ContentGenerator, QualityScorer

COMPILED_DIR = Path(__file__).parent / "compiled"
COMPILED_PATH = COMPILED_DIR / "content_generator.json"


class ProgramStore:
    """
    Singleton that holds the active DSPy program in memory.
    Hot-swaps to a new compiled program when optimizer finishes.
    """
    _instance = None

    def __init__(self):
        self.generator = ContentGenerator()
        self.scorer = QualityScorer()
        self._load_compiled_if_exists()

    @classmethod
    def get(cls) -> "ProgramStore":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def _load_compiled_if_exists(self):
        if COMPILED_PATH.exists():
            try:
                self.generator.load(str(COMPILED_PATH))
                print(f"✅ Loaded compiled DSPy program from {COMPILED_PATH}")
            except Exception as e:
                print(f"⚠️  Could not load compiled program: {e}. Using base program.")
        else:
            print("ℹ️  No compiled program found. Using base DSPy program.")

    def reload(self):
        """Call this after optimizer finishes to hot-swap the program."""
        self._load_compiled_if_exists()

    def save_compiled(self):
        """Save current generator state as compiled program."""
        COMPILED_DIR.mkdir(exist_ok=True)
        self.generator.save(str(COMPILED_PATH))
        print(f"💾 Compiled program saved to {COMPILED_PATH}")