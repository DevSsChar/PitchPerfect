#!/usr/bin/env python3
"""
PyTorch-based transcription script for the sample audio file.
This script uses torchaudio instead of FFmpeg to process the audio file.
"""

import sys
import os
from pathlib import Path

# Define the path to the sample audio file
SAMPLE_PATH = Path("backend/tests/data/sample.wav")

def main():
    """
    Main function to transcribe sample.wav using torchaudio.
    """
    print("🎵 PitchPerfect PyTorch Transcription")
    print("=" * 50)
    
    # Check if sample file exists
    if not SAMPLE_PATH.exists():
        print(f"❌ Sample file not found at: {SAMPLE_PATH}")
        print("   Please ensure the sample.wav file exists in backend/tests/data/")
        sys.exit(1)
    
    print(f"📁 Sample file found: {SAMPLE_PATH}")
    print(f"📊 File size: {SAMPLE_PATH.stat().st_size} bytes")
    
    try:
        # Import required libraries
        import torch
        import torchaudio
        print("✅ Successfully imported torch and torchaudio")
        
        # Try to import whisper
        import whisper
        print("✅ Successfully imported whisper")
        
        # Convert to absolute path
        absolute_path = SAMPLE_PATH.resolve()
        print(f"🔍 Absolute path: {absolute_path}")
        
        # Load audio file with torchaudio
        print(f"\n🔄 Loading audio file...")
        waveform, sample_rate = torchaudio.load(str(absolute_path))
        
        # Convert to mono if stereo
        if waveform.shape[0] > 1:
            waveform = torch.mean(waveform, dim=0, keepdim=True)
        
        # Resample to 16kHz if needed (Whisper expects 16kHz)
        if sample_rate != 16000:
            print(f"Resampling from {sample_rate}Hz to 16000Hz...")
            resampler = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)
            waveform = resampler(waveform)
            sample_rate = 16000
        
        # Save the processed audio to a temporary file
        temp_file = "temp_processed_audio.wav"
        torchaudio.save(temp_file, waveform, sample_rate)
        print(f"Audio processed and saved to temporary file: {temp_file}")
        
        # Load Whisper model
        print(f"\n🔄 Loading Whisper model (this may take a moment)...")
        model = whisper.load_model("base")
        
        # Perform transcription with the processed file
        print(f"\n🎯 Transcribing processed audio file...")
        result = model.transcribe(temp_file)
        transcript = result["text"]
        
        # Clean up temporary file
        os.remove(temp_file)
        print("Temporary file removed")
        
        # Check if transcription was successful
        if not transcript:
            print("❌ Transcription failed: Empty result")
            sys.exit(1)
        
        # Display results
        print("\n✅ Transcription successful!")
        print("\n" + "=" * 50)
        print("Transcription of sample.wav:")
        
        # Show transcript
        print(transcript)
        print(f"\n📝 Transcript length: {len(transcript)} characters")
        
        print("\n" + "=" * 50)
        print("🎉 PyTorch-based transcription PASSED! Sample audio was transcribed successfully.")
        
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        print("\n💡 Troubleshooting:")
        print("   1. Make sure required packages are installed:")
        print("      pip install torch torchaudio openai-whisper")
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
