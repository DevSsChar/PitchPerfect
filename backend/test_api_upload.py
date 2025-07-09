#!/usr/bin/env python
"""
Test script for PitchPerfect API upload functionality.

This script uploads a sample audio file to the PitchPerfect API's analyze endpoint
and displays the detailed analysis results.
"""

import os
import sys
import json
import requests
from pathlib import Path
import time

# Define API endpoint
API_URL = "http://localhost:8000/api/v1/analyze"
SAMPLE_WAV_PATH = Path("backend/tests/data/sample.wav")

def test_api_upload():
    """
    Test the API by uploading a sample audio file and displaying the results.
    """
    # Check if sample file exists
    if not SAMPLE_WAV_PATH.exists():
        print(f"❌ Error: Sample file not found at {SAMPLE_WAV_PATH}")
        print("Please ensure the sample.wav file exists in backend/tests/data/")
        sys.exit(1)
    
    print(f"🎯 Testing API endpoint: {API_URL}")
    print(f"📁 Using sample file: {SAMPLE_WAV_PATH}")
    
    try:
        # Prepare the file for upload
        file_data = {"audio_file": (SAMPLE_WAV_PATH.name, open(SAMPLE_WAV_PATH, "rb"), "audio/wav")}
        
        # Record start time
        start_time = time.time()
        
        # Send POST request to API
        print("\n🔄 Sending request to API...")
        response = requests.post(API_URL, files=file_data)
        
        # Calculate elapsed time
        elapsed_time = time.time() - start_time
        
        if response.status_code == 200:
            # Request successful
            result = response.json()
            
            print(f"\n✅ API request successful! (Status code: {response.status_code})")
            print(f"⏱️  Processing time: {elapsed_time:.2f} seconds\n")
            
            # Print transcript
            print("=" * 80)
            print("📝 TRANSCRIPT:")
            print("=" * 80)
            print(result["transcript"])
            print("=" * 80)
            
            # Print text analysis highlights
            print("\n📊 TEXT ANALYSIS HIGHLIGHTS:")
            print(f"  • Word count: {result['text_analysis']['word_count']}")
            print(f"  • Sentence count: {result['text_analysis']['sentence_count']}")
            print(f"  • Words per sentence: {result['text_analysis']['average_words_per_sentence']:.2f}")
            print(f"  • Speaking rate: {result['text_analysis']['speaking_rate']:.2f} words per minute")
            
            # Print filler words
            if result['text_analysis']['filler_words']:
                print("\n🔍 FILLER WORDS:")
                for word, count in result['text_analysis']['filler_words'].items():
                    if count > 0:
                        print(f"  • '{word}': {count} occurrences")
            
            # Print readability scores
            print("\n📈 READABILITY SCORES:")
            for metric, score in result['text_analysis']['readability_scores'].items():
                print(f"  • {metric}: {score:.2f}")
            
            # Print audio features
            print("\n🔊 AUDIO FEATURES:")
            print(f"  • Speaking duration: {result['audio_features']['speaking_duration']:.2f} seconds")
            print(f"  • Pitch (mean): {result['audio_features']['pitch_mean']:.2f}")
            print(f"  • Energy (mean): {result['audio_features']['energy_mean']:.2f}")
            print(f"  • Jitter: {result['audio_features']['jitter']:.4f}")
            print(f"  • Shimmer: {result['audio_features']['shimmer']:.4f}")
            
            # Print LLM feedback
            print("\n💡 LLM FEEDBACK:")
            print(f"  SUMMARY: {result['llm_feedback']['summary']}")
            
            print("\n  STRENGTHS:")
            for item in result['llm_feedback']['strengths']:
                print(f"  • {item}")
            
            print("\n  AREAS FOR IMPROVEMENT:")
            for item in result['llm_feedback']['areas_for_improvement']:
                print(f"  • {item}")
            
            print("\n  SPECIFIC SUGGESTIONS:")
            for item in result['llm_feedback']['specific_suggestions']:
                print(f"  • {item}")
            
            if result['llm_feedback'].get('overall_score'):
                print(f"\n  OVERALL SCORE: {result['llm_feedback']['overall_score']:.1f}/10")
            
            # Save complete results to JSON file
            results_file = "api_results.json"
            with open(results_file, "w") as f:
                json.dump(result, f, indent=2)
            
            print(f"\n📄 Complete results saved to: {results_file}")
            
        else:
            # Request failed
            print(f"❌ API request failed with status code: {response.status_code}")
            print(f"Error message: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection error: Could not connect to the API server.")
        print("   Make sure the API server is running on http://localhost:8000")
        print("   You can start it with: uvicorn app.main:app --reload")
        
    except Exception as e:
        print(f"❌ Error: {type(e).__name__}: {str(e)}")
        
    finally:
        # Ensure file is closed
        if 'file_data' in locals() and hasattr(file_data['audio_file'][1], 'close'):
            file_data['audio_file'][1].close()

if __name__ == "__main__":
    test_api_upload()
