from datetime import datetime
from typing import Dict, Any, Optional
from pydantic import BaseModel

class SpeechAnalysisResult(BaseModel):
    """
    Supabase Table Structure:
    
    Table Name: speech_analysis_results
    
    CREATE TABLE speech_analysis_results (
        process_id UUID PRIMARY KEY,
        user_id UUID REFERENCES public.users(id),
        filename VARCHAR NOT NULL,
        transcript TEXT NOT NULL,
        text_analysis JSONB NOT NULL,
        acoustic_features JSONB NOT NULL,
        llm_feedback JSONB NOT NULL,
        full_report JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create index on user_id for faster lookups
    CREATE INDEX idx_speech_analysis_user_id ON speech_analysis_results(user_id);
    
    -- Create index on created_at for time-based queries
    CREATE INDEX idx_speech_analysis_created_at ON speech_analysis_results(created_at);
    """
    process_id: str
    user_id: str
    filename: str
    transcript: str
    text_analysis: Dict[str, Any]
    acoustic_features: Dict[str, Any]
    llm_feedback: Dict[str, Any]
    full_report: Dict[str, Any]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None