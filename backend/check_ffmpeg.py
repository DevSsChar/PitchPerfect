import os
import subprocess
import sys
from pathlib import Path

def check_ffmpeg_installed():
    """Check if ffmpeg is available in PATH"""
    try:
        result = subprocess.run(["ffmpeg", "-version"], 
                               stdout=subprocess.PIPE, 
                               stderr=subprocess.PIPE, 
                               text=True, 
                               check=False)
        return result.returncode == 0, result.stdout if result.returncode == 0 else None
    except FileNotFoundError:
        return False, None

def test_whisper_transcription():
    """Test Whisper transcription with FFmpeg"""
    try:
        from backend.app.services.transcription import transcribe_audio
        
        sample_path = Path("backend/tests/data/sample.wav")
        if not sample_path.exists():
            print(f"Error: Sample audio file not found at {sample_path}")
            return False, None
        
        print("Testing Whisper transcription...")
        result = transcribe_audio(sample_path)
        
        if "FALLBACK" in result:
            return False, result
        
        return True, result
    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    print("FFmpeg and Whisper Transcription Test")
    print("=====================================")
    
    # Check if ffmpeg is installed
    ffmpeg_installed, ffmpeg_version = check_ffmpeg_installed()
    
    if ffmpeg_installed:
        print("✅ FFmpeg is installed and available in PATH")
        if ffmpeg_version:
            print(f"Version information:\n{ffmpeg_version.splitlines()[0]}")
    else:
        print("❌ FFmpeg is not installed or not in PATH")
        print("\nPlease install FFmpeg by following the instructions in FFmpeg_Installation_Guide.md")
        print("After installing FFmpeg, restart your terminal/IDE and run this script again.")
        return
    
    # Test Whisper transcription
    print("\nTesting Whisper transcription...")
    success, result = test_whisper_transcription()
    
    if success:
        print("\n✅ Whisper transcription test passed!")
        print(f"Transcription result: {result}")
    else:
        print("\n❌ Whisper transcription test failed")
        if result:
            print(f"Result: {result}")
        print("\nPossible issues:")
        print("1. FFmpeg might not be properly installed or accessible to Python")
        print("2. The Whisper model might not be downloaded yet")
        print("3. There might be an issue with the audio file")
        
        print("\nTroubleshooting steps:")
        print("1. Make sure FFmpeg is correctly installed and in PATH")
        print("2. Restart your terminal/IDE and try again")
        print("3. Check if the sample.wav file exists in backend/tests/data/")

if __name__ == "__main__":
    main()
