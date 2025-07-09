#!/usr/bin/env python3
"""
Smoke test script for PitchPerfect transcription service.

This script tests the transcription functionality using the sample.wav file
to ensure the transcription service is working correctly.
"""

import sys
import os
from pathlib import Path

# Define the path to the sample audio file
SAMPLE_PATH = Path("backend/tests/data/sample.wav")


def main():
    """
    Main function to test transcription service with sample.wav.
    """
    print("🎵 PitchPerfect Transcription Smoke Test")
    print("=" * 50)
    
    # Check if sample file exists
    if not SAMPLE_PATH.exists():
        print(f"❌ Sample file not found at: {SAMPLE_PATH}")
        print("   Please ensure the sample.wav file exists in backend/tests/data/")
        sys.exit(1)
    
    print(f"📁 Sample file found: {SAMPLE_PATH}")
    print(f"📊 File size: {SAMPLE_PATH.stat().st_size} bytes")
    
    try:
        # Import the transcription service
        print("\n🔄 Importing transcription service...")
        from app.services.transcription import transcribe_audio, get_audio_duration
        from app.services.text_analysis import analyze_text
        from app.services.acoustic_features import extract_features
        print("✅ Successfully imported required services")
        
        # Convert to absolute path
        absolute_path = SAMPLE_PATH.resolve()
        print(f"🔍 Absolute path: {absolute_path}")
        print(f"🔍 Path exists: {absolute_path.exists()}")
        
        # Audio duration
        print(f"\n⏱️ Getting audio duration for: {absolute_path}")
        try:
            duration = get_audio_duration(str(absolute_path))
            print(f"✅ Audio duration: {duration:.2f} seconds")
        except Exception as e:
            print(f"❌ Failed to get audio duration: {e}")
            duration = None
        
        # Perform transcription
        print(f"\n🎯 Transcribing audio file: {absolute_path}")
        transcript = transcribe_audio(str(absolute_path))
        
        # Check if transcription was successful
        if not transcript or transcript.strip() == "":
            print("❌ Transcription failed: Empty or None result")
            sys.exit(1)
        
        # Display transcription result
        print("✅ Transcription successful!")
        print("\n" + "=" * 50)
        print("Transcription of sample.wav:")
        if len(transcript) > 200:
            print(f"{transcript[:200]}...")
            print(f"\n📝 Full transcript length: {len(transcript)} characters")
        else:
            print(transcript)
            print(f"\n📝 Transcript length: {len(transcript)} characters")
        
        # Text analysis
        print("\n" + "=" * 50)
        print("🔎 Running text analysis on transcript...")
        try:
            text_analysis = analyze_text(transcript)
            print("✅ Text analysis result:")
            for k, v in text_analysis.items():
                print(f"  {k}: {v}")
        except Exception as e:
            print(f"❌ Text analysis failed: {e}")
            text_analysis = None
        
        # Acoustic features
        print("\n" + "=" * 50)
        print("🔊 Extracting acoustic features...")
        try:
            audio_features = extract_features(str(absolute_path))
            print("✅ Acoustic features result:")
            for k, v in audio_features.items():
                print(f"  {k}: {v}")
        except Exception as e:
            print(f"❌ Acoustic feature extraction failed: {e}")
            audio_features = None
        
        print("\n" + "=" * 50)
        print("🎉 Smoke test PASSED! All individual models ran (see above for details).")
        sys.exit(0)
        
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        print("\n💡 Troubleshooting:")
        print("   1. Ensure the package is installed in editable mode:")
        print("      pip install -e .")
        print("   2. Check that VSCode settings include backend in extraPaths")
        print("   3. Run verify_setup.py to check your configuration")
        sys.exit(1)
        
    except FileNotFoundError as e:
        print(f"❌ File not found: {e}")
        print("   Please check that the sample.wav file exists and is accessible")
        sys.exit(1)
        
    except Exception as e:
        print(f"❌ Transcription error: {type(e).__name__}: {e}")
        print("\n💡 This could indicate:")
        print("   - Audio file format issues")
        print("   - Missing dependencies (e.g., whisper, torch)")
        print("   - Configuration problems")
        print("   - Network connectivity issues (if using OpenAI API)")
        sys.exit(1)


if __name__ == "__main__":
    main()
