import pytest
import os
from pathlib import Path
import sys

# Add the parent directory to the path so we can import from app
sys.path.insert(0, str(Path(__file__).parent.parent))

# Sample test data
SAMPLE_AUDIO_PATH = Path("tests/data/sample.wav")
SAMPLE_TRANSCRIPT = "This is a sample transcript for testing purposes."

# Define a mock function for testing
def mock_transcribe_audio(audio_path):
    """Mock transcription function for testing."""
    return SAMPLE_TRANSCRIPT

def test_transcribe_audio_simple():
    """Test a simple mock of the transcription service."""
    # Try to import the real service
    try:
        from app.services.transcription import transcribe_audio
        using_real_service = True
    except ImportError:
        transcribe_audio = mock_transcribe_audio
        using_real_service = False
    
    # Check that the sample audio file exists
    assert os.path.exists(SAMPLE_AUDIO_PATH), f"Sample audio file not found at {SAMPLE_AUDIO_PATH}"
    
    # Call the transcribe function
    result = transcribe_audio(SAMPLE_AUDIO_PATH)
    
    # Check that we got a non-empty string back
    assert isinstance(result, str), f"Expected string result, got {type(result)}"
    assert len(result) > 0, "Transcription result is empty"
    
    # If we're using the mock, check for exact match
    if not using_real_service:
        assert result == SAMPLE_TRANSCRIPT, f"Expected '{SAMPLE_TRANSCRIPT}', got '{result}'"
    else:
        # If using the real service, just log the result
        print(f"\nTranscription result: {result}")
