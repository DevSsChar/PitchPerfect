# PitchPerfect Backend System Documentation

## Overview
PitchPerfect is a modular backend system designed for automated speech analysis, feedback, and reporting. It processes audio files, transcribes speech, analyzes text and acoustic features, leverages LLMs for coaching feedback, and generates structured reports for frontend consumption. The system is built in Python, using FastAPI and integrates with Hugging Face for advanced language model feedback.

---

## System Flow
1. **Audio Input**: User uploads or provides an audio file (e.g., `.wav`).
2. **Transcription**: The audio is transcribed to text using Whisper.
3. **Text Analysis**: The transcript is analyzed for readability, filler words, sentence structure, and speaking rate.
4. **Acoustic Feature Extraction**: The audio is analyzed for pitch, energy, jitter, shimmer, and other voice quality metrics using OpenSMILE (or fallback if unavailable).
5. **LLM Feedback**: An LLM (via Hugging Face) generates personalized coaching feedback based on all previous outputs.
6. **Report Generation**: All results are combined into a structured JSON report, ready for frontend display or further processing.

---

## Module Descriptions

### 1. Transcription (`transcription.py`)
- **Purpose**: Converts audio files to text using the Whisper model.
- **Key Functions**:
  - `transcribe_audio(audio_path)`: Returns the transcript as a string.
  - `get_audio_duration(audio_path)`: Returns the duration of the audio in seconds.
- **Input**: Path to `.wav` file.
- **Output**: Transcript string, duration.

### 2. Text Analysis (`text_analysis.py`)
- **Purpose**: Analyzes the transcript for linguistic and readability metrics.
- **Key Functions**:
  - `analyze_text(transcript)`: Returns a dictionary with word count, sentence count, filler words, readability scores, average words per sentence, and speaking rate.
- **Input**: Transcript string.
- **Output**: Dictionary of text metrics.

### 3. Acoustic Features (`acoustic_features.py`)
- **Purpose**: Extracts voice/acoustic features from the audio file.
- **Key Functions**:
  - `extract_features(audio_path)`: Returns a dictionary with pitch, energy, jitter, shimmer, speaking duration, and speech rate.
- **Input**: Path to `.wav` file.
- **Output**: Dictionary of acoustic features.
- **Note**: Uses OpenSMILE if available, otherwise falls back to dummy values.

### 4. LLM Feedback (`llm_feedback.py`)
- **Purpose**: Generates structured, personalized feedback using a Hugging Face LLM (e.g., Mistral-7B-Instruct).
- **Key Functions**:
  - `generate_llm_feedback(transcript, text_metrics, acoustic_features)`: Returns a dictionary with summary feedback, suggestions, score, and recommendations.
- **Input**: Transcript, text analysis dict, acoustic features dict.
- **Output**: Dictionary with feedback fields.
- **Note**: Requires a Hugging Face API token in `.env`. Falls back to a dummy response if unavailable.

### 5. Report Generator (`report_generator.py`)
- **Purpose**: Combines all module outputs into a single, structured report for the frontend.
- **Key Functions**:
  - `generate_report(transcript, text_analysis, acoustic_features, llm_feedback=None, user_id=None, session_id=None)`: Returns a JSON-serializable dictionary with all results and a timestamp.
- **Input**: All previous module outputs, optional user/session IDs.
- **Output**: Final report dictionary.
- **Note**: Provides a fallback message if LLM feedback is missing.

---

## Environment & Configuration
- **.env**: Stores sensitive credentials (e.g., `HUGGINGFACE_TOKEN`).
- **Dependencies**: Install with `pip install -r requirements.txt` (see also `huggingface_hub`, `python-dotenv`).
- **OpenSMILE**: For acoustic features, ensure `SMILExtract.exe` and a config (e.g., `IS09_emotion.conf`) are available and paths are set in the code.

---

## Testing
- Each module has a corresponding test file in `backend/app/tests/`.
- Run tests with `python backend/app/tests/test_<module>.py`.
- Example: `python backend/app/tests/test_report_generator.py`.

---

## Logging & Error Handling
- All modules use Python's `logging` for major steps and errors.
- Fallbacks are provided for missing dependencies, credentials, or upstream failures.
- All outputs are validated for JSON serializability before returning.

---

## Extensibility & Handoff Notes
- The system is modular: each analysis step is a separate, testable Python module.
- The report generator is future-proof: new fields can be added as needed.
- The codebase is ready for REST API integration and frontend consumption.
- All sensitive credentials are managed via `.env` and never hardcoded.

---

## Quick Start for Reviewers
1. Install dependencies: `pip install -r requirements.txt` (or see above).
2. Ensure `.env` is present with a valid Hugging Face token.
3. Place OpenSMILE and config files as described above.
4. Run tests to verify all modules.
5. Review `backend/app/services/` for core logic and `backend/app/tests/` for usage examples.

---

## Contact & Support
For any questions or handoff clarifications, please refer to the code comments, logging output, and test files. The system is designed for easy onboarding and extension.
