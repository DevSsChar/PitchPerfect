# PitchPerfect Backend

A FastAPI backend for speech analysis and feedback.

## Project Overview

PitchPerfect is a speech analysis tool that:

1. Accepts uploaded audio files (.wav or .mp3)
2. Transcribes speech to text using OpenAI Whisper
3. Analyzes text for clarity, fluency, filler words, and readability
4. Extracts acoustic features from the audio
5. Generates personalized improvement feedback using LLM
6. Returns a comprehensive JSON response with all analyses

## Setup

### Prerequisites

- Python 3.9+
- [openSMILE](https://github.com/audeering/opensmile) for acoustic feature extraction
- An OpenAI API key (or other LLM provider)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/PitchPerfect.git
   cd PitchPerfect/backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows
   venv\\Scripts\\activate
   # On Unix or MacOS
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Download the spaCy English model:
   ```bash
   python -m spacy download en_core_web_sm
   ```

5. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file to add your API keys and configure paths.

### Running the Server

```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Usage

### Upload Audio for Analysis

**Endpoint:** `POST /api/upload-audio`

**Request:**
```bash
# Using curl
curl -X POST "http://localhost:8000/api/upload-audio" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "audio_file=@your_speech.wav"
```

**Using Axios (JavaScript):**
```javascript
import axios from 'axios';

const formData = new FormData();
formData.append('audio_file', file); // file is a File object from input or drag-and-drop

const response = await axios.post('http://localhost:8000/api/upload-audio', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const result = response.data;
console.log(result);
```

**Response:**
```json
{
  "transcript": "This is the transcribed text of the speech...",
  "text_analysis": {
    "word_count": 150,
    "sentence_count": 12,
    "filler_words": {
      "um": 5,
      "like": 3
    },
    "readability_scores": {
      "flesch_reading_ease": 65.2,
      "flesch_kincaid_grade": 8.5,
      "gunning_fog": 10.3,
      "smog_index": 9.2
    },
    "average_words_per_sentence": 12.5,
    "speaking_rate": 145.6
  },
  "audio_features": {
    "pitch_mean": 125.4,
    "pitch_std": 15.2,
    "energy_mean": 65.3,
    "energy_std": 12.1,
    "jitter": 0.025,
    "shimmer": 0.082,
    "speaking_duration": 62.5,
    "speech_rate": 2.4
  },
  "llm_feedback": {
    "summary": "Overall good presentation with clear articulation...",
    "strengths": [
      "Consistent pace throughout",
      "Good vocal variety"
    ],
    "areas_for_improvement": [
      "Reduce filler words",
      "Vary sentence structure more"
    ],
    "specific_suggestions": [
      "Practice pausing instead of using filler words",
      "Try adding more emphasis on key points"
    ],
    "overall_score": 7.5
  }
}
```

## Running Tests

```bash
pytest
```

## Development

### Project Structure

```
PitchPerfect/
├── backend/
│   ├── app/
│   │   ├── main.py                # FastAPI app & CORS setup
│   │   ├── config.py              # env var loader, paths
│   │   ├── routers/
│   │   │   └── audio.py           # /api/upload-audio endpoint
│   │   ├── services/
│   │   │   ├── transcription.py   # def transcribe_audio(path)->str
│   │   │   ├── text_analysis.py   # def analyze_text(text)->dict
│   │   │   ├── acoustic_features.py # def extract_features(path)->dict
│   │   │   └── llm_feedback.py    # def get_coaching_feedback(data)->dict
│   ├── models/                    # Pydantic models for request/response
│   ├── utils/                     # helpers: file I/O, subprocess wrapper, logging
│   ├── static/                    # temp & static files
│   ├── tests/                     # pytest tests for each service
│   ├── .env.example               # env var template
│   ├── requirements.txt
│   ├── .gitignore
│   └── README.md
```

## License

[MIT](LICENSE)
