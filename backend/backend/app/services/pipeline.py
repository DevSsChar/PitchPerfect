import sys
import os

# Dynamically add the correct backend root to sys.path for direct execution
current_file = os.path.abspath(__file__)
backend_root = os.path.abspath(os.path.join(current_file, "../../.."))
if backend_root not in sys.path:
    sys.path.insert(0, backend_root)

"""
Robust pipeline for PitchPerfect: from audio file to LLM feedback.
"""
from app.services.transcription import transcribe_audio, get_audio_duration
from app.services.text_analysis import analyze_text
from app.services.acoustic_features import extract_features
from app.services.llm_feedback import generate_llm_feedback
from pathlib import Path
from typing import Dict, Any

# Use Dict[str, Any] for result to allow any value type


def process_audio_pipeline(audio_path: str) -> Dict[str, Any]:
    """
    Complete pipeline: audio file -> transcript -> text analysis -> acoustic features -> LLM feedback.
    Returns a dictionary with all intermediate and final results.
    """
    result: Dict[str, Any] = {"success": False}
    try:
        # Step 1: Transcribe audio
        transcript = transcribe_audio(audio_path)
        if not transcript or transcript.strip() == "":
            result["error"] = "Transcription failed: Empty or None result"
            return result
        result["transcript"] = transcript

        # Step 2: Text analysis
        try:
            text_analysis = analyze_text(transcript)
            result["text_analysis"] = text_analysis
        except Exception as e:
            result["text_analysis_error"] = str(e)
            text_analysis = {}

        # Step 3: Acoustic features (openSMILE, robust, WAV conversion)
        try:
            audio_features = extract_features(Path(audio_path))
            result["acoustic_features"] = audio_features
            # Always set audio_duration from acoustic features (handles mp3/wav)
            result["audio_duration"] = audio_features.get("speaking_duration", 0.0)
        except Exception as e:
            result["acoustic_features_error"] = str(e)
            audio_features = {}
            result["audio_duration"] = 0.0

        # Step 4: LLM feedback (main output)
        try:
            llm_feedback = generate_llm_feedback(
                transcript=transcript,
                text_analysis=text_analysis,
                acoustic_features=audio_features
            )
            result["llm_feedback"] = llm_feedback
            result["success"] = True
        except Exception as e:
            result["llm_feedback_error"] = str(e)

    except Exception as e:
        result["pipeline_error"] = str(e)
    return result


def main():
    import argparse
    import json
    import sys

    parser = argparse.ArgumentParser(description="Run PitchPerfect audio-to-LLM pipeline.")
    parser.add_argument("audio_path", type=str, help="Path to the audio file (wav)")
    args = parser.parse_args()

    result = process_audio_pipeline(args.audio_path)
    print(json.dumps(result, indent=2, ensure_ascii=False))
    if not result.get("success", False):
        sys.exit(1)


if __name__ == "__main__":
    main()
