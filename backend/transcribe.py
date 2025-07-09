#!/usr/bin/env python3
"""
Simple Whisper transcription utility for PitchPerfect.

Usage:
  python transcribe.py [audio_file_path]

If no audio file path is provided, it will use the sample.wav file.
"""

import sys
import os
from pathlib import Path
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("whisper_transcriber")

def main():
    # Get audio file path from command line arguments or use sample.wav
    if len(sys.argv) > 1:
        audio_path = Path(sys.argv[1])
    else:
        audio_path = Path("backend/tests/data/sample.wav")
    
    if not audio_path.exists():
        print(f"Error: Audio file not found: {audio_path}")
        sys.exit(1)
    
    print(f"🎯 Transcribing: {audio_path}")
    print(f"📊 File size: {audio_path.stat().st_size / 1024 / 1024:.2f} MB")
    
    try:
        # Import whisper
        import whisper
        
        # Load model
        start_time = time.time()
        print("🔄 Loading Whisper model (this may take a moment)...")
        model = whisper.load_model("base")
        print(f"✅ Model loaded in {time.time() - start_time:.2f} seconds")
        
        # Transcribe
        print("🔄 Transcribing audio...")
        start_time = time.time()
        result = model.transcribe(str(audio_path))
        transcription_time = time.time() - start_time
        
        # Get transcript
        transcript = result["text"]
        
        # Show results
        print("\n" + "=" * 50)
        print("Transcription:")
        print(transcript)
        print("=" * 50)
        print(f"📝 Transcript length: {len(transcript)} characters")
        print(f"⏱️ Transcription time: {transcription_time:.2f} seconds")
        
    except ImportError:
        print("❌ Error: Whisper not installed. Run: pip install openai-whisper")
        sys.exit(1)
    except FileNotFoundError:
        print("❌ Error: FFmpeg not found. Make sure FFmpeg is installed and in your PATH.")
        print("   See FFmpeg_Installation_Guide.md for installation instructions.")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error during transcription: {type(e).__name__}: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
