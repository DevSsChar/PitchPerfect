import os
import json
import logging
from typing import Dict, Any
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from the correct path (Windows compatible)
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), '.env')
load_dotenv(env_path)

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def generate_llm_feedback(
    transcript: str,
    text_analysis: Dict[str, Any],
    acoustic_features: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Generate structured feedback using Groq's Llama API based on speech analysis.

    Args:
        transcript (str): The speech transcript text
        text_analysis (Dict[str, Any]): Dictionary containing text analysis metrics
        acoustic_features (Dict[str, Any]): Dictionary containing acoustic feature measurements

    Returns:
        Dict[str, Any]: Structured feedback containing:
            - summary_feedback: Overall analysis of the speech
            - text_suggestions: Specific suggestions for content improvement
            - voice_suggestions: Specific suggestions for voice improvement
            - overall_score: Numerical score out of 100
            - recommendations: List of actionable recommendations
    """
    try:
        groq_api_key = os.getenv('GROQ_API_KEY')
        if not groq_api_key:
            logger.error("GROQ_API_KEY not found in environment variables")
            raise ValueError("GROQ_API_KEY not found in environment variables")

        # logger.info(f"API Key found: {groq_api_key[:8]}...")
        # logger.info("Initializing Groq client...")
        client = Groq(api_key=groq_api_key)

        # Prepare the prompt
        system_prompt = (
            "You are an expert speech analysis AI that provides detailed feedback on presentations. "
            "Generate structured feedback in JSON format with these fields: "
            "summary_feedback (overall analysis), text_suggestions (content improvements), "
            "voice_suggestions (delivery improvements), overall_score (0-100), and "
            "recommendations (actionable steps). Focus on both content and delivery aspects."
        )

        user_prompt = f"""
        Please analyze this speech data and provide detailed feedback:

        Transcript:
        {transcript}

        Text Analysis Metrics:
        {json.dumps(text_analysis, indent=2)}

        Acoustic Features:
        {json.dumps(acoustic_features, indent=2)}

        Provide feedback in this exact JSON format:
        {{
            "summary_feedback": "A detailed paragraph analyzing overall speech quality, addressing both content and delivery",
            "text_suggestions": [
                "Specific suggestions about word count and content structure",
                "Analysis of filler word usage and its impact",
                "Recommendations for content organization and clarity"
            ],
            "voice_suggestions": [
                "Analysis of speaking rate and its effectiveness",
                "Feedback on pitch variation and expressiveness",
                "Comments on energy/volume control and consistency"
            ],
            "overall_score": 75,
            "recommendations": [
                "Specific exercises to reduce filler words",
                "Techniques for improving vocal variety",
                "Methods for enhancing content structure",
                "Practical steps for maintaining good pace",
                "Strategies for increasing audience engagement"
            ]
        }}
"""

        # logger.info("Sending request to Groq API...")
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=1000
            )
        except Exception as api_exc:
            logger.error(f"Groq API call failed: {api_exc}")
            raise

        # logger.info("Received response from Groq API")
        feedback_text = getattr(response.choices[0].message, 'content', None)
        logger.debug(f"Raw feedback: {feedback_text}")

        if feedback_text is None:
            logger.error("Groq API returned no content in the response.")
            raise ValueError("Groq API returned no content in the response.")

        # Clean up markdown code block markers if present
        feedback_text_clean = feedback_text.strip()
        if feedback_text_clean.startswith('```') and feedback_text_clean.endswith('```'):
            feedback_text_clean = feedback_text_clean[3:-3].strip()
        # Also handle single-line code block
        elif feedback_text_clean.startswith('```json') and feedback_text_clean.endswith('```'):
            feedback_text_clean = feedback_text_clean[7:-3].strip()

        try:
            feedback = json.loads(feedback_text_clean)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse JSON response: {e}\nRaw response: {feedback_text}")
            raise

        # Ensure the feedback has all required fields
        required_fields = ["summary_feedback", "text_suggestions", "voice_suggestions", 
                         "overall_score", "recommendations"]
        for field in required_fields:
            if field not in feedback:
                logger.error(f"Missing required field in response: {field}")
                raise ValueError(f"Missing required field: {field}")

        # logger.info("Successfully generated feedback")
        return feedback

    except Exception as e:
        logger.error(f"Error generating feedback: {str(e)}", exc_info=True)
        return {
            "summary_feedback": f"Unable to generate detailed feedback due to an error: {str(e)}",
            "text_suggestions": ["Error in processing text analysis."],
            "voice_suggestions": ["Error in processing voice analysis."],
            "overall_score": 0,
            "recommendations": ["Please try again or contact support if the issue persists."]
        }

if __name__ == "__main__":
    # Test block to check if GROQ_API_KEY is loaded
    print(f"Loaded env path: {env_path}")
    key = os.getenv('GROQ_API_KEY')
    if key:
        print(f"GROQ_API_KEY loaded: {key[:8]}... (length: {len(key)})")
    else:
        print("GROQ_API_KEY not found in environment variables!")
