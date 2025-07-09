#!/usr/bin/env python3
"""
Direct transcription script for the sample audio file.
This script will transcribe the sample.wav file using Whisper's fallback mode,
which doesn't require FFmpeg.
"""

import sys
import os
from pathlib import Path

# Define the path to the sample audio file
SAMPLE_PATH = Path("backend/tests/data/sample.wav")

def main():
    """
    Main function to transcribe sample.wav directly.
    """
    print("🎵 PitchPerfect Direct Transcription")
    print("=" * 50)
    
    # Check if sample file exists
    if not SAMPLE_PATH.exists():
        print(f"❌ Sample file not found at: {SAMPLE_PATH}")
        print("   Please ensure the sample.wav file exists in backend/tests/data/")
        sys.exit(1)
    
    print(f"📁 Sample file found: {SAMPLE_PATH}")
    print(f"📊 File size: {SAMPLE_PATH.stat().st_size} bytes")
    
    try:
        # Import Whisper directly
        import whisper
        print("✅ Successfully imported whisper")
        
        # Convert to absolute path
        absolute_path = SAMPLE_PATH.resolve()
        print(f"🔍 Absolute path: {absolute_path}")
        
        # Load Whisper model
        print(f"\n🔄 Loading Whisper model (this may take a moment)...")
        model = whisper.load_model("base")
        
        # Perform transcription
        print(f"\n🎯 Transcribing audio file: {absolute_path}")
        result = model.transcribe(str(absolute_path))
        transcript = result["text"]
        
        # Check if transcription was successful
        if not transcript:
            print("❌ Transcription failed: Empty result")
            sys.exit(1)
        
        # Display results
        print("✅ Transcription successful!")
        print("\n" + "=" * 50)
        print("Transcription of sample.wav:")
        
        # Show first 200 characters with ellipsis if longer
        if len(transcript) > 200:
            print(f"{transcript[:200]}...")
            print(f"\n📝 Full transcript length: {len(transcript)} characters")
        else:
            print(transcript)
            print(f"\n📝 Transcript length: {len(transcript)} characters")
        
        print("\n" + "=" * 50)
        print("🎉 Direct transcription PASSED! Sample audio was transcribed successfully.")
        
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        print("\n💡 Troubleshooting:")
        print("   1. Make sure whisper is installed:")
        print("      pip install -U openai-whisper")
        sys.exit(1)
        
    except Exception as e:
        print(f"❌ Transcription error: {type(e).__name__}: {e}")
        print("\n💡 This could indicate:")
        print("   - Audio file format issues")
        print("   - Missing dependencies")
        print("   - Configuration problems")
        sys.exit(1)


if __name__ == "__main__":
    main()
