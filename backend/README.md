# PitchPerfect - Speech Analysis and Feedback API

PitchPerfect is an AI-powered speech analysis platform that provides comprehensive feedback on vocal presentations.

## Features

- 🎙️ **Audio Transcription**: Converts speech to text using Whisper
- 📊 **Text Analysis**: Analyzes linguistic features like filler words, readability, and speaking rate
- 🔊 **Acoustic Analysis**: Extracts audio features including pitch, energy, jitter, and shimmer
- 💡 **AI Feedback**: Provides personalized coaching with strengths and areas for improvement

## Setup Instructions

### Prerequisites

- Python 3.9+ 
- FFmpeg (for audio processing)

### Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/pitch-perfect.git
   cd pitch-perfect
   ```

2. **Install dependencies**:
   ```
   pip install -e .
   cd backend
   pip install -r requirements.txt
   ```

3. **Install FFmpeg** (required for Whisper):
   - Windows: Run `python install_ffmpeg.py`
   - Or follow the manual installation guide in `FFmpeg_Installation_Guide.md`

4. **Install spaCy model**:
   ```
   python -m spacy download en_core_web_sm
   ```

### Configuration

Create a `.env` file in the `backend` directory with the following variables (optional):

```
WHISPER_MODEL=base
DEBUG=true
LLM_API_KEY=your_llm_api_key
LLM_API_URL=https://api.openai.com/v1/completions
LLM_MODEL=gpt-3.5-turbo
```

## Running the Application

1. **Start the server**:
   ```
   python start_server.py
   ```
   Or manually:
   ```
   cd backend
   uvicorn app.main:app --reload
   ```

2. **Access the API**:
   - API documentation: http://localhost:8000/docs
   - API root: http://localhost:8000/
   - Main analysis endpoint: http://localhost:8000/api/v1/analyze

## Testing

1. **Run the API test script**:
   ```
   python test_api_upload.py
   ```
   This will upload a sample audio file and display the analysis results.

2. **Run individual tests**:
   ```
   cd backend
   pytest tests/
   ```

## API Endpoints

- `POST /api/v1/analyze`: Main endpoint for comprehensive audio analysis
  - Accepts audio file via multipart/form-data
  - Returns transcript, text analysis, acoustic features, and AI feedback

## Output Format

The API returns a JSON response with the following structure:

```json
{
  "transcript": "Full transcript text...",
  "text_analysis": {
    "word_count": 150,
    "sentence_count": 10,
    "filler_words": {"um": 5, "like": 3},
    "readability_scores": {"flesch_reading_ease": 65.0},
    "average_words_per_sentence": 15.0,
    "speaking_rate": 150.0
  },
  "audio_features": {
    "pitch_mean": 120.5,
    "pitch_std": 15.2,
    "energy_mean": 75.3,
    "energy_std": 8.4,
    "jitter": 0.0235,
    "shimmer": 0.0843,
    "speaking_duration": 60.5,
    "speech_rate": 2.5
  },
  "llm_feedback": {
    "summary": "Overall assessment summary...",
    "strengths": ["Clear articulation", "Good pacing"],
    "areas_for_improvement": ["Reduce filler words", "Vary tone more"],
    "specific_suggestions": ["Practice pausing instead of using fillers", "Record yourself to analyze pitch variation"],
    "overall_score": 7.5
  }
}
```

## Project Structure

```
PitchPerfect/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   └── audio.py       # API endpoints
│   │   ├── services/
│   │   │   ├── transcription.py      # Audio to text
│   │   │   ├── text_analysis.py      # Text metrics
│   │   │   ├── acoustic_features.py  # Audio features
│   │   │   └── llm_feedback.py       # AI coaching
│   │   ├── config.py          # Application settings
│   │   └── main.py            # FastAPI application
│   ├── models/
│   │   └── response.py        # Response data models
│   ├── static/                # Static files and uploads
│   ├── tests/                 # Test cases
│   │   └── data/
│   │       └── sample.wav     # Test audio file
│   ├── utils/                 # Utility functions
│   └── requirements.txt       # Dependencies
├── test_api_upload.py         # API test script
├── start_server.py            # Server startup script
└── pyproject.toml             # Project metadata
```
