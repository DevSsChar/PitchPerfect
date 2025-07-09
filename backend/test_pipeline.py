#!/usr/bin/env python
"""
End-to-end test for PitchPerfect's full analysis pipeline.

This script tests the complete backend pipeline by:
1. Transcribing sample audio
2. Analyzing the transcription text
3. Extracting acoustic features
4. Generating LLM feedback
5. Simulating the full API flow

Running this script ensures that all components are working together correctly.
"""

import os
import sys
import json
from pathlib import Path

# Add the project root to the Python path
sys.path.insert(0, str(Path(__file__).parent))
sys.path.insert(0, str(Path(__file__).parent / "backend"))

try:
    # Import required modules
    from app.services.transcription import transcribe_audio
    from app.services.text_analysis import analyze_text
    from app.services.acoustic_features import extract_features
    from app.services.llm_feedback import get_coaching_feedback
    from models.response import UploadAudioResponse
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Make sure you have installed the project in development mode: pip install -e .")
    sys.exit(1)

def test_pipeline():
    """
    Test the full analysis pipeline with a sample audio file.
    """
    # Path to sample audio file
    sample_audio = Path("backend/tests/data/sample.wav")
    
    if not sample_audio.exists():
        print(f"❌ Sample audio file not found: {sample_audio}")
        sys.exit(1)
    
    print(f"🔍 Testing full analysis pipeline with {sample_audio}")
    
    try:
        # Step 1: Transcribe audio
        print("\n📝 Step 1: Transcribing audio...")
        transcript = transcribe_audio(sample_audio)
        print(f"✅ Transcription successful: {len(transcript)} characters")
        print(f"First 100 chars: {transcript[:100]}...")
        
        # Step 2: Analyze text
        print("\n📊 Step 2: Analyzing text...")
        text_analysis = analyze_text(transcript)
        print(f"✅ Text analysis successful")
        print(f"Word count: {text_analysis['word_count']}")
        print(f"Sentence count: {text_analysis['sentence_count']}")
        print(f"Speaking rate: {text_analysis['speaking_rate']:.2f} words per minute")
        
        # Step 3: Extract acoustic features
        print("\n🔊 Step 3: Extracting acoustic features...")
        audio_features = extract_features(sample_audio)
        print(f"✅ Acoustic feature extraction successful")
        print(f"Speaking duration: {audio_features['speaking_duration']:.2f} seconds")
        print(f"Pitch mean: {audio_features['pitch_mean']:.2f}")
        print(f"Energy mean: {audio_features['energy_mean']:.2f}")
        
        # Step 4: Generate LLM feedback
        print("\n💡 Step 4: Generating LLM feedback...")
        analysis_data = {
            "transcript": transcript,
            "text_analysis": text_analysis,
            "audio_features": audio_features
        }
        llm_feedback = get_coaching_feedback(analysis_data)
        print(f"✅ LLM feedback generation successful")
        print(f"Summary: {llm_feedback['summary'][:100]}...")
        print(f"Strengths count: {len(llm_feedback['strengths'])}")
        print(f"Areas for improvement count: {len(llm_feedback['areas_for_improvement'])}")
        
        # Step 5: Create complete response
        print("\n📦 Step 5: Creating complete response...")
        response = UploadAudioResponse(
            transcript=transcript,
            text_analysis=text_analysis,
            audio_features=audio_features,
            llm_feedback=llm_feedback
        )
        print(f"✅ Response creation successful")
        
        # Save results to file
        results_file = "pipeline_test_results.json"
        with open(results_file, "w") as f:
            # Convert Pydantic model to dict for JSON serialization
            json.dump(response.dict(), f, indent=2)
        
        print(f"\n📄 Test results saved to: {results_file}")
        print("\n🎉 All pipeline components working correctly!")
        
        return True
        
    except Exception as e:
        print(f"\n❌ Pipeline test failed: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    test_pipeline()
