"""
Comprehensive test suite for PitchPerfect modules.
Tests each component individually and their integration.
"""

import os
import sys
import pytest
from pathlib import Path
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))
sys.path.insert(0, str(project_root / "backend"))

# Import the modules to test
try:
    from app.services.transcription import transcribe_audio, get_audio_duration
    from app.services.text_analysis import analyze_text
    from app.services.acoustic_features import extract_features
    from app.services.llm_feedback import get_coaching_feedback
    from models.response import UploadAudioResponse, TextAnalysis, AudioFeatures, LLMFeedback
except ImportError as e:
    logger.error(f"Import error: {e}")
    logger.error("Make sure you have installed the project in development mode: pip install -e .")
    sys.exit(1)

# Test data
SAMPLE_AUDIO = project_root / "backend" / "tests" / "data" / "sample.wav"
SAMPLE_TEXT = """Hello, this is a test speech for analyzing the text analysis module. 
I want to check if um... the filler words are being detected correctly. 
You know, it's like, really important to speak clearly and effectively."""

@pytest.fixture
def sample_audio_path():
    """Fixture to provide sample audio path and verify it exists."""
    assert SAMPLE_AUDIO.exists(), f"Sample audio file not found: {SAMPLE_AUDIO}"
    return SAMPLE_AUDIO

def test_transcription_module(sample_audio_path):
    """Test the transcription service."""
    logger.info("Testing transcription module...")
    
    # Test audio duration function
    duration = get_audio_duration(sample_audio_path)
    assert duration > 0, "Audio duration should be positive"
    logger.info(f"Audio duration: {duration:.2f} seconds")
    
    # Test transcription
    transcript = transcribe_audio(sample_audio_path)
    assert isinstance(transcript, str), "Transcript should be a string"
    assert len(transcript) > 0, "Transcript should not be empty"
    logger.info(f"Transcription successful ({len(transcript)} characters)")
    
    return transcript

def test_text_analysis_module():
    """Test the text analysis service."""
    logger.info("Testing text analysis module...")
    
    # Test text analysis
    analysis = analyze_text(SAMPLE_TEXT)
    assert isinstance(analysis, dict), "Analysis should return a dictionary"
    
    # Verify required fields
    required_fields = ['word_count', 'sentence_count', 'filler_words', 
                      'readability_scores', 'average_words_per_sentence', 
                      'speaking_rate']
    for field in required_fields:
        assert field in analysis, f"Missing required field: {field}"
    
    # Verify values
    assert analysis['word_count'] > 0, "Word count should be positive"
    assert analysis['sentence_count'] > 0, "Sentence count should be positive"
    assert isinstance(analysis['filler_words'], dict), "Filler words should be a dictionary"
    
    logger.info(f"Text analysis successful: {analysis['word_count']} words, "
                f"{analysis['sentence_count']} sentences")
    return analysis

def test_acoustic_features_module(sample_audio_path):
    """Test the acoustic features extraction service."""
    logger.info("Testing acoustic features module...")
    
    # Test feature extraction
    features = extract_features(sample_audio_path)
    assert isinstance(features, dict), "Features should return a dictionary"
    
    # Verify required fields
    required_fields = ['pitch_mean', 'pitch_std', 'energy_mean', 'energy_std',
                      'jitter', 'shimmer', 'speaking_duration', 'speech_rate']
    for field in required_fields:
        assert field in features, f"Missing required field: {field}"
    
    # Verify values
    assert features['speaking_duration'] > 0, "Speaking duration should be positive"
    assert features['pitch_mean'] > 0, "Pitch mean should be positive"
    assert features['energy_mean'] > 0, "Energy mean should be positive"
    
    logger.info(f"Acoustic feature extraction successful: "
                f"Duration={features['speaking_duration']:.2f}s, "
                f"Pitch={features['pitch_mean']:.2f}")
    return features

def test_llm_feedback_module():
    """Test the LLM feedback service."""
    logger.info("Testing LLM feedback module...")
    
    # Create sample data
    analysis_data = {
        "transcript": SAMPLE_TEXT,
        "text_analysis": test_text_analysis_module(),
        "audio_features": test_acoustic_features_module(SAMPLE_AUDIO)
    }
    
    # Test feedback generation
    feedback = get_coaching_feedback(analysis_data)
    assert isinstance(feedback, dict), "Feedback should return a dictionary"
    
    # Verify required fields
    required_fields = ['summary', 'strengths', 'areas_for_improvement', 
                      'specific_suggestions']
    for field in required_fields:
        assert field in feedback, f"Missing required field: {field}"
    
    # Verify values
    assert isinstance(feedback['strengths'], list), "Strengths should be a list"
    assert isinstance(feedback['areas_for_improvement'], list), "Areas for improvement should be a list"
    assert len(feedback['summary']) > 0, "Summary should not be empty"
    
    logger.info("LLM feedback generation successful")
    return feedback

def test_response_model():
    """Test the Pydantic response models."""
    logger.info("Testing response models...")
    
    # Get test data from other modules
    transcript = test_transcription_module(SAMPLE_AUDIO)
    text_analysis = test_text_analysis_module()
    audio_features = test_acoustic_features_module(SAMPLE_AUDIO)
    llm_feedback = test_llm_feedback_module()
    
    # Test TextAnalysis model
    text_model = TextAnalysis(**text_analysis)
    assert isinstance(text_model, TextAnalysis)
    
    # Test AudioFeatures model
    audio_model = AudioFeatures(**audio_features)
    assert isinstance(audio_model, AudioFeatures)
    
    # Test LLMFeedback model
    feedback_model = LLMFeedback(**llm_feedback)
    assert isinstance(feedback_model, LLMFeedback)
    
    # Test complete UploadAudioResponse model
    response = UploadAudioResponse(
        transcript=transcript,
        text_analysis=text_model,
        audio_features=audio_model,
        llm_feedback=feedback_model
    )
    assert isinstance(response, UploadAudioResponse)
    
    logger.info("Response models validation successful")
    return response

def test_full_pipeline(sample_audio_path):
    """Test the complete analysis pipeline."""
    logger.info("Testing full analysis pipeline...")
    
    try:
        # Step 1: Transcription
        transcript = test_transcription_module(sample_audio_path)
        
        # Step 2: Text Analysis
        text_analysis = test_text_analysis_module()
        
        # Step 3: Acoustic Features
        audio_features = test_acoustic_features_module(sample_audio_path)
        
        # Step 4: LLM Feedback
        analysis_data = {
            "transcript": transcript,
            "text_analysis": text_analysis,
            "audio_features": audio_features
        }
        llm_feedback = test_llm_feedback_module()
        
        # Step 5: Create and validate response
        response = test_response_model()
        
        logger.info("🎉 Full pipeline test successful!")
        return True
        
    except Exception as e:
        logger.error(f"Pipeline test failed: {type(e).__name__}: {str(e)}")
        raise

if __name__ == "__main__":
    # Run all tests
    pytest.main([__file__, "-v"])
