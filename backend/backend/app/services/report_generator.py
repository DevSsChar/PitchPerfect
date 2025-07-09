import json
import logging
from datetime import datetime
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)

FALLBACK_LLM_FEEDBACK = {
    "summary_feedback": "LLM feedback not available, please check later.",
    "text_suggestions": [],
    "voice_suggestions": [],
    "overall_score": None,
    "recommendations": []
}

def generate_report(
    transcript: str,
    text_analysis: Dict[str, Any],
    acoustic_features: Dict[str, Any],
    llm_feedback: Optional[Dict[str, Any]] = None,
    user_id: Optional[str] = None,
    session_id: Optional[str] = None
) -> Dict[str, Any]:
    """
    Generate a structured report from all analysis modules.
    """
    logger.info("Generating final report for PitchPerfect analysis.")
    report = {
        "transcript": transcript,
        "text_analysis": text_analysis,
        "acoustic_features": acoustic_features,
        "llm_feedback": llm_feedback if llm_feedback is not None else FALLBACK_LLM_FEEDBACK,
        "generated_on": datetime.utcnow().isoformat() + 'Z'
    }
    if user_id:
        report["user_id"] = user_id
    if session_id:
        report["session_id"] = session_id
    try:
        # Ensure serializability
        json.dumps(report)
    except Exception as e:
        logger.error(f"Report is not serializable: {e}")
        raise
    logger.info("Report generated successfully.")
    return report
