#!/usr/bin/env python
"""
Script to start the PitchPerfect FastAPI server.
"""

import os
import sys
import uvicorn
from pathlib import Path

def start_server():
    """
    Start the FastAPI server for PitchPerfect.
    """
    print("🚀 Starting PitchPerfect API server...")
    
    # Get the backend directory
    backend_dir = Path(__file__).parent / "backend"
    
    # Change to the backend directory
    os.chdir(backend_dir)
    
    # Start the server
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    start_server()
