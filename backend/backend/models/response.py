from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field


class TextAnalysis(BaseModel):
    """Model for text analysis results."""
    word_count: int = Field(..., description="Total number of words in the transcript")
    sentence_count: int = Field(..., description="Number of sentences in the transcript")
    filler_words: Dict[str, int] = Field(..., description="Count of filler words (e.g., 'um', 'uh')")
    readability_scores: Dict[str, float] = Field(..., description="Various readability metrics")
    average_words_per_sentence: float = Field(..., description="Average words per sentence")
    speaking_rate: float = Field(..., description="Words per minute")


class AudioFeatures(BaseModel):
    """Model for acoustic features extracted from audio."""
    pitch_mean: float = Field(..., description="Mean pitch value")
    pitch_std: float = Field(..., description="Standard deviation of pitch")
    energy_mean: float = Field(..., description="Mean energy value")
    energy_std: float = Field(..., description="Standard deviation of energy")
    jitter: float = Field(..., description="Jitter measurement")
    shimmer: float = Field(..., description="Shimmer measurement")
    speaking_duration: float = Field(..., description="Total speaking duration in seconds")
    speech_rate: float = Field(..., description="Rate of speech")
    articulation_rate: Optional[float] = Field(None, description="Rate of articulation")
    pause_count: Optional[int] = Field(None, description="Number of pauses")


class LLMFeedback(BaseModel):
    """Model for LLM-generated feedback."""
    summary: str = Field(..., description="Summary of overall performance")
    strengths: List[str] = Field(..., description="Strengths identified in the speech")
    areas_for_improvement: List[str] = Field(..., description="Areas that need improvement")
    specific_suggestions: List[str] = Field(..., description="Specific actionable suggestions")
    overall_score: Optional[float] = Field(None, description="Overall score if applicable")


class UploadAudioResponse(BaseModel):
    """Complete response model for audio upload endpoint."""
    transcript: str = Field(..., description="Full transcript of the speech")
    text_analysis: TextAnalysis = Field(..., description="Text analysis results")
    audio_features: AudioFeatures = Field(..., description="Acoustic features extracted from audio")
    llm_feedback: LLMFeedback = Field(..., description="LLM-generated feedback")
