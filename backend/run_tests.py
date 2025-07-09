#!/usr/bin/env python
"""
Run all PitchPerfect tests and verify API functionality.
"""

import os
import sys
import time
import subprocess
import requests
import json
from pathlib import Path

def check_ffmpeg():
    """Check if FFmpeg is installed and accessible."""
    try:
        result = subprocess.run(['ffmpeg', '-version'], 
                              capture_output=True, 
                              text=True)
        if result.returncode == 0:
            print("✅ FFmpeg is installed and accessible")
            return True
    except FileNotFoundError:
        print("❌ FFmpeg not found. Please install FFmpeg first.")
        print("Follow instructions in FFmpeg_Installation_Guide.md")
        return False

def verify_python_environment():
    """Verify Python environment and dependencies."""
    required_packages = [
        'fastapi',
        'uvicorn',
        'python-multipart',
        'whisper',
        'spacy',
        'textstat',
        'pandas',
        'numpy',
        'requests',
        'pytest'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print("❌ Missing required packages:")
        for package in missing_packages:
            print(f"  - {package}")
        print("\nInstall missing packages with:")
        print(f"pip install {' '.join(missing_packages)}")
        return False
    
    print("✅ All required Python packages are installed")
    return True

def verify_spacy_model():
    """Verify spaCy model is installed."""
    try:
        import spacy
        nlp = spacy.load("en_core_web_sm")
        print("✅ spaCy model (en_core_web_sm) is installed")
        return True
    except Exception as e:
        print("❌ spaCy model not found.")
        print("Install it with: python -m spacy download en_core_web_sm")
        return False

def run_module_tests():
    """Run the comprehensive module tests."""
    print("\n🧪 Running module tests...")
    
    result = subprocess.run(['pytest', 'tests/test_modules.py', '-v'],
                          capture_output=True,
                          text=True)
    
    print("\nTest Results:")
    print(result.stdout)
    
    if result.returncode == 0:
        print("✅ All module tests passed")
        return True
    else:
        print("❌ Some tests failed")
        return False

def test_api_endpoint():
    """Test the API endpoint with sample audio."""
    print("\n🌐 Testing API endpoint...")
    
    # Start the server in the background
    server = subprocess.Popen(
        ['uvicorn', 'app.main:app', '--reload'],
        cwd='backend',
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Wait for server to start
    time.sleep(5)
    
    try:
        # Run the API test script
        result = subprocess.run(['python', 'test_api_upload.py'],
                              capture_output=True,
                              text=True)
        
        print(result.stdout)
        
        if result.returncode == 0:
            print("✅ API endpoint test passed")
            return True
        else:
            print("❌ API endpoint test failed")
            return False
            
    finally:
        # Stop the server
        server.terminate()
        server.wait()

def main():
    """Run all verification and tests."""
    print("🚀 Starting PitchPerfect verification suite...")
    
    # Track test results
    results = {
        "ffmpeg": False,
        "python_env": False,
        "spacy_model": False,
        "module_tests": False,
        "api_test": False
    }
    
    # Step 1: Check FFmpeg
    print("\n1️⃣ Checking FFmpeg installation...")
    results["ffmpeg"] = check_ffmpeg()
    
    # Step 2: Verify Python environment
    print("\n2️⃣ Verifying Python environment...")
    results["python_env"] = verify_python_environment()
    
    # Step 3: Verify spaCy model
    print("\n3️⃣ Verifying spaCy model...")
    results["spacy_model"] = verify_spacy_model()
    
    # Only continue if prerequisites are met
    if all([results["ffmpeg"], results["python_env"], results["spacy_model"]]):
        # Step 4: Run module tests
        print("\n4️⃣ Running module tests...")
        results["module_tests"] = run_module_tests()
        
        # Step 5: Test API endpoint
        print("\n5️⃣ Testing API endpoint...")
        results["api_test"] = test_api_endpoint()
    
    # Print summary
    print("\n📋 Test Summary:")
    print("=" * 50)
    for test, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test.replace('_', ' ').title()}: {status}")
    print("=" * 50)
    
    # Final verdict
    if all(results.values()):
        print("\n🎉 All tests passed! PitchPerfect is ready to use.")
        return 0
    else:
        print("\n❌ Some tests failed. Please fix the issues and try again.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
