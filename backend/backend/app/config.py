"""
Configuration settings for PitchPerfect application.
"""

import os
from pathlib import Path

# Whisper model configuration
WHISPER_MODEL = os.getenv("WHISPER_MODEL", "base")  # Options: tiny, base, small, medium, large

# OpenSMILE configuration (for acoustic features)
OPENSMILE_PATH = os.getenv("OPENSMILE_PATH", "opensmile/SMILExtract")

# Application settings
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
API_PREFIX = os.getenv("API_PREFIX", "/api/v1")
ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Frontend development server
    "http://localhost:8000",  # Backend server
    "*",                      # Allow all origins in development
]

# LLM configuration (for coaching feedback)
LLM_API_KEY = os.getenv("LLM_API_KEY", "")
LLM_API_URL = os.getenv("LLM_API_URL", "https://api.openai.com/v1/completions")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-3.5-turbo")

# File upload settings
MAX_UPLOAD_SIZE = 50 * 1024 * 1024  # 50 MB
ALLOWED_AUDIO_FORMATS = [".wav", ".mp3", ".flac", ".ogg", ".m4a"]
STATIC_DIR = Path("static")
TEMP_DIR = STATIC_DIR / "temp"

# Ensure temp directory exists
os.makedirs(TEMP_DIR, exist_ok=True)