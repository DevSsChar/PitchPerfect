#!/usr/bin/env python3
"""
Milestone verification script for PitchPerfect modules.
Checks each module's functionality and progress towards goals.
"""

import os
import sys
import json
from pathlib import Path
from datetime import datetime

# Add project paths
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))
sys.path.insert(0, str(project_root / "backend"))

def check_transcription_milestones():
    """Check transcription service milestones."""
    try:
        from app.services.transcription import transcribe_audio, get_audio_duration
        
        milestones = {
            "Basic Audio Loading": False,
            "Duration Detection": False,
            "Text Transcription": False,
            "Error Handling": False
        }
        
        # Test with sample audio
        sample_path = project_root / "backend" / "tests" / "data" / "sample.wav"
        
        if not sample_path.exists():
            return milestones, "❌ Sample audio file not found"
            
        # Check duration detection
        try:
            duration = get_audio_duration(sample_path)
            milestones["Basic Audio Loading"] = True
            if duration > 0:
                milestones["Duration Detection"] = True
        except Exception as e:
            return milestones, f"❌ Duration detection failed: {e}"
            
        # Check transcription
        try:
            transcript = transcribe_audio(sample_path)
            if transcript and len(transcript) > 0:
                milestones["Text Transcription"] = True
                
            # Test error handling with invalid file
            try:
                transcribe_audio("nonexistent.wav")
            except FileNotFoundError:
                milestones["Error Handling"] = True
        except Exception as e:
            return milestones, f"❌ Transcription failed: {e}"
            
        return milestones, "✅ Transcription checks completed"
        
    except ImportError as e:
        return milestones, f"❌ Import failed: {e}"

def check_text_analysis_milestones():
    """Check text analysis service milestones."""
    try:
        from app.services.text_analysis import analyze_text
        
        milestones = {
            "Basic Text Processing": False,
            "Filler Word Detection": False,
            "Readability Scores": False,
            "Speech Rate Analysis": False
        }
        
        # Test text
        sample_text = """Um, this is a test speech. You know, it contains 
        multiple sentences and like, some filler words. The readability 
        should be measurable."""
        
        try:
            analysis = analyze_text(sample_text)
            
            if "word_count" in analysis and "sentence_count" in analysis:
                milestones["Basic Text Processing"] = True
                
            if "filler_words" in analysis and len(analysis["filler_words"]) > 0:
                milestones["Filler Word Detection"] = True
                
            if "readability_scores" in analysis and analysis["readability_scores"]:
                milestones["Readability Scores"] = True
                
            if "speaking_rate" in analysis and analysis["speaking_rate"] > 0:
                milestones["Speech Rate Analysis"] = True
                
        except Exception as e:
            return milestones, f"❌ Text analysis failed: {e}"
            
        return milestones, "✅ Text analysis checks completed"
        
    except ImportError as e:
        return milestones, f"❌ Import failed: {e}"

def check_acoustic_features_milestones():
    """Check acoustic features service milestones."""
    try:
        from app.services.acoustic_features import extract_features
        
        milestones = {
            "Basic Audio Processing": False,
            "Pitch Analysis": False,
            "Energy Analysis": False,
            "Voice Quality Metrics": False
        }
        
        # Test with sample audio
        sample_path = project_root / "backend" / "tests" / "data" / "sample.wav"
        
        if not sample_path.exists():
            return milestones, "❌ Sample audio file not found"
            
        try:
            features = extract_features(sample_path)
            
            if features and isinstance(features, dict):
                milestones["Basic Audio Processing"] = True
                
            if "pitch_mean" in features and "pitch_std" in features:
                milestones["Pitch Analysis"] = True
                
            if "energy_mean" in features and "energy_std" in features:
                milestones["Energy Analysis"] = True
                
            if "jitter" in features and "shimmer" in features:
                milestones["Voice Quality Metrics"] = True
                
        except Exception as e:
            return milestones, f"❌ Feature extraction failed: {e}"
            
        return milestones, "✅ Acoustic features checks completed"
        
    except ImportError as e:
        return milestones, f"❌ Import failed: {e}"

def save_milestone_report(results):
    """Save milestone results to a JSON report."""
    report = {
        "timestamp": datetime.now().isoformat(),
        "results": results
    }
    
    report_path = project_root / "milestone_report.json"
    with open(report_path, 'w') as f:
        json.dump(report, f, indent=2)
    
    return report_path

def main():
    """Run milestone checks for all modules."""
    print("🎯 PitchPerfect Module Milestone Check")
    print("=" * 50)
    
    results = {}
    
    # Check each module
    print("\n1️⃣ Checking Transcription Service...")
    results["transcription"], msg_trans = check_transcription_milestones()
    print(f"   {msg_trans}")
    print("\n--- Transcription Service Results ---")
    for milestone, achieved in results["transcription"].items():
        status = "✅" if achieved else "❌"
        print(f"{status} {milestone}")
    print("-------------------------------------\n")

    print("\n2️⃣ Checking Text Analysis Service...")
    results["text_analysis"], msg_text = check_text_analysis_milestones()
    print(f"   {msg_text}")
    print("\n--- Text Analysis Service Results ---")
    for milestone, achieved in results["text_analysis"].items():
        status = "✅" if achieved else "❌"
        print(f"{status} {milestone}")
    print("-------------------------------------\n")

    print("\n3️⃣ Checking Acoustic Features Service...")
    results["acoustic"], msg_acoustic = check_acoustic_features_milestones()
    print(f"   {msg_acoustic}")
    print("\n--- Acoustic Features Service Results ---")
    for milestone, achieved in results["acoustic"].items():
        status = "✅" if achieved else "❌"
        print(f"{status} {milestone}")
    print("-------------------------------------\n")

    # Calculate completion percentages
    print("\n📊 Milestone Completion Summary:")
    print("=" * 50)
    
    for module, milestones in results.items():
        completed = sum(1 for v in milestones.values() if v)
        total = len(milestones)
        percentage = (completed / total) * 100
        
        print(f"\n{module.title()}:")
        print(f"Progress: {completed}/{total} ({percentage:.1f}%)")
        print("-" * 30)
        
        for milestone, achieved in milestones.items():
            status = "✅" if achieved else "❌"
            print(f"{status} {milestone}")
    
    # Save report
    report_path = save_milestone_report(results)
    print(f"\n📝 Detailed report saved to: {report_path}")

if __name__ == "__main__":
    main()
