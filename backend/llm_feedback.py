import os
import json
import logging
from typing import Dict, Any
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

# Load environment variables from .env in the project root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env'))

# Logging setup
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Environment variables
HUGGINGFACE_TOKEN = os.getenv("HUGGINGFACE_TOKEN")
HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.2"

# Dummy fallback response
DUMMY_RESPONSE = {
    "summary_feedback": "Great clarity overall, but work on vocal variety and filler word reduction.",
    "text_suggestions": ["Reduce filler words like 'uh', 'um'", "Use shorter sentences for clarity"],
    "voice_suggestions": ["Increase energy modulation in conclusions", "Vary your pitch more"],
    "overall_score": 6,
    "recommendations": ["Practice using pitch variation in intro", "Record and review your delivery"]
}

def generate_llm_feedback(transcript: str, text_metrics: Dict[str, Any], acoustic_features: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generate structured feedback using a Hugging Face conversational LLM.
    """
    if not HUGGINGFACE_TOKEN:
        logger.warning("HUGGINGFACE_TOKEN not found. Returning dummy response.")
        return DUMMY_RESPONSE

    # Prepare prompts
    system_prompt = (
        "You are an expert public speaking coach. Analyze the transcript, text analysis, "
        "and acoustic features to provide structured, constructive, and actionable feedback in JSON format."
    )
    
    user_prompt = f"""
Transcript:
{transcript}

Text Analysis:
{json.dumps(text_metrics, indent=2)}

Acoustic Features:
{json.dumps(acoustic_features, indent=2)}

Please provide feedback in the following JSON format:
{{
  "summary_feedback": "Brief summary of overall performance",
  "text_suggestions": ["Tip 1", "Tip 2", ...],
  "voice_suggestions": ["Voice Tip 1", "Voice Tip 2", ...],
  "overall_score": 1–10,
  "recommendations": ["Next step 1", "Next step 2", ...]
}}
"""

    try:
        logger.info("Sending request to Hugging Face text_generation API...")
        client = InferenceClient(token=HUGGINGFACE_TOKEN)
        prompt = f"System: {system_prompt}\nUser: {user_prompt}"
        response = client.text_generation(
            model=HF_MODEL,
            prompt=prompt,
            max_new_tokens=512,
            temperature=0.7,
            do_sample=True,
            return_full_text=False
        )
        response_text = response
        logger.info("Received response from Hugging Face model.")
        try:
            feedback = json.loads(response_text)
            return feedback
        except json.JSONDecodeError:
            logger.warning("Response is not valid JSON. Wrapping in fallback format.")
            return {
                "summary_feedback": response_text.strip(),
                "text_suggestions": [],
                "voice_suggestions": [],
                "overall_score": 5,
                "recommendations": []
            }
    except Exception as e:
        logger.error(f"LLM feedback generation failed: {e}")
        return DUMMY_RESPONSE