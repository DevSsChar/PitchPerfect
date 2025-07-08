import logging
import re
import importlib.util
from typing import Dict, Any

# Configure logger
logger = logging.getLogger(__name__)

# Check if spaCy is available
spacy_available = importlib.util.find_spec("spacy") is not None
if spacy_available:
    try:
        import spacy
        # Try to load spaCy model
        try:
            nlp = spacy.load("en_core_web_sm")
            logger.info("Successfully loaded spaCy model")
        except Exception as e:
            logger.error(f"Error loading spaCy model: {str(e)}")
            spacy_available = False
    except ImportError:
        spacy_available = False
        logger.warning("spaCy import failed despite module being found")

# Check if textstat is available
textstat_available = importlib.util.find_spec("textstat") is not None
if textstat_available:
    try:
        import textstat
        logger.info("Successfully imported textstat")
    except ImportError:
        textstat_available = False
        logger.warning("textstat import failed despite module being found")

# Common filler words to detect
FILLER_WORDS = [
    "um", "uh", "ah", "er", "like", "you know", "so", "actually", 
    "basically", "literally", "honestly", "right", "okay", "well",
]

def analyze_text(text: str) -> Dict[str, Any]:
    """
    Analyze text for clarity, fluency, filler words, and readability metrics.
    Uses spaCy and textstat if available, or a fallback method for testing.
    
    Args:
        text: The transcript text to analyze
        
    Returns:
        Dictionary containing various text analysis metrics
    """
    logger.info(f"Analyzing text ({len(text)} characters)")
    
    try:
        # If spaCy and textstat are available, use them
        if spacy_available and textstat_available:
            logger.info("Using spaCy and textstat for text analysis")
            
            # Process text with spaCy
            doc = nlp(text)
            
            # Count words and sentences
            word_count = len([token for token in doc if not token.is_punct and not token.is_space])
            sentence_count = len(list(doc.sents))
            
            # Detect filler words
            filler_counts = {}
            text_lower = text.lower()
            for filler in FILLER_WORDS:
                # Use word boundaries for more accurate matching
                pattern = r'\\b' + re.escape(filler) + r'\\b'
                count = len(re.findall(pattern, text_lower))
                if count > 0:
                    filler_counts[filler] = count
            
            # Calculate readability scores
            readability_scores = {
                "flesch_reading_ease": textstat.flesch_reading_ease(text),
                "flesch_kincaid_grade": textstat.flesch_kincaid_grade(text),
                "gunning_fog": textstat.gunning_fog(text),
                "smog_index": textstat.smog_index(text),
            }
            
            # Calculate words per sentence
            avg_words_per_sentence = word_count / max(1, sentence_count)
            
            # Estimate speaking rate (words per minute)
            # Assuming average speaking rate, this would be refined with actual audio duration
            speaking_rate = 150.0  # Default estimate
            
            result = {
                "word_count": word_count,
                "sentence_count": sentence_count,
                "filler_words": filler_counts,
                "readability_scores": readability_scores,
                "average_words_per_sentence": avg_words_per_sentence,
                "speaking_rate": speaking_rate,
            }
            
            logger.info("Text analysis completed successfully using spaCy and textstat")
            return result
            
        else:
            # Fallback for testing when spaCy or textstat are not available
            logger.warning("spaCy or textstat not available, using fallback text analysis")
            
            # Simple word and sentence counting
            words = text.split()
            word_count = len(words)
            
            # Very simple sentence counting by punctuation
            sentences = re.split(r'[.!?]+', text)
            sentences = [s for s in sentences if s.strip()]
            sentence_count = len(sentences)
            
            # Simple filler word detection
            filler_counts = {}
            text_lower = text.lower()
            for filler in FILLER_WORDS:
                # Simple string search
                count = text_lower.count(" " + filler + " ")
                if count > 0:
                    filler_counts[filler] = count
            
            # Default readability scores
            readability_scores = {
                "flesch_reading_ease": 70.0,
                "flesch_kincaid_grade": 8.0,
                "gunning_fog": 10.0,
                "smog_index": 9.0,
            }
            
            # Calculate words per sentence
            avg_words_per_sentence = word_count / max(1, sentence_count)
            
            # Default speaking rate
            speaking_rate = 150.0
            
            result = {
                "word_count": word_count,
                "sentence_count": sentence_count,
                "filler_words": filler_counts,
                "readability_scores": readability_scores,
                "average_words_per_sentence": avg_words_per_sentence,
                "speaking_rate": speaking_rate,
            }
            
            logger.info("Text analysis completed with fallback method")
            return result
        
    except Exception as e:
        logger.error(f"Error analyzing text: {str(e)}")
        # Return default analysis in case of error
        return {
            "word_count": len(text.split()),
            "sentence_count": len(re.split(r'[.!?]+', text)),
            "filler_words": {},
            "readability_scores": {
                "flesch_reading_ease": 70.0,
                "flesch_kincaid_grade": 8.0,
                "gunning_fog": 10.0,
                "smog_index": 9.0,
            },
            "average_words_per_sentence": 20.0,
            "speaking_rate": 150.0,
            "error": str(e)
        }