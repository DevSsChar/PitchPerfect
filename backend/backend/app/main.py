import logging
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from app.config import API_PREFIX, ALLOWED_ORIGINS, DEBUG, STATIC_DIR
from app.routers import audio

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if DEBUG else logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("pitch_perfect")

# Initialize FastAPI app
app = FastAPI(
    title="PitchPerfect API",
    description="API for speech analysis and feedback",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    debug=DEBUG,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create static directory if it doesn't exist
os.makedirs(STATIC_DIR, exist_ok=True)

# Mount static files directory
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Please try again later."},
    )

# Include routers
app.include_router(audio.router, prefix=API_PREFIX)

@app.get("/")
async def root():
    """Root endpoint that returns API information."""
    logger.info("Root endpoint accessed")
    return {
        "message": "Welcome to PitchPerfect API",
        "docs": "/docs",
        "version": "0.1.0",
        "api_prefix": API_PREFIX
    }

# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("PitchPerfect API starting up")
    logger.info(f"Debug mode: {DEBUG}")
    logger.info(f"API prefix: {API_PREFIX}")
    logger.info(f"Static directory: {STATIC_DIR}")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("PitchPerfect API shutting down")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
