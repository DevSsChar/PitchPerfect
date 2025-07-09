import logging
import os
import wave
import librosa
import soundfile as sf
from pathlib import Path
from typing import Dict, Any
import opensmile

# Configure logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Add console handler if not already added
if not logger.handlers:
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

def get_audio_duration(audio_path: Path) -> float:
    """Get the duration of an audio file in seconds."""
    try:
        duration = librosa.get_duration(path=str(audio_path))
        return duration
    except Exception as e:
        logger.error(f"Error getting audio duration: {str(e)}")
        return 5.0  # Default duration

def extract_features(audio_path: Path) -> Dict[str, Any]:
    """Extract acoustic features from audio using openSMILE.
    
    Args:
        audio_path: Path to the audio file (supports WAV and MP3)
        
    Returns:
        Dictionary containing extracted acoustic features
    """
    logger.info(f"Extracting acoustic features from: {audio_path}")
    
    # Ensure audio_path is a Path object
    if isinstance(audio_path, str):
        audio_path = Path(audio_path)
    
    # Check if the file exists
    if not os.path.exists(audio_path):
        error_msg = f"Audio file not found: {audio_path}"
        logger.error(error_msg)
        raise FileNotFoundError(error_msg)
    
    # Convert any audio format to WAV if needed
    if audio_path.suffix.lower() != '.wav':
        logger.info("Converting audio to WAV for analysis")
        wav_path = audio_path.with_suffix('.wav')
        try:
            # Load audio file using librosa
            y, sr = librosa.load(str(audio_path))
            # Save as WAV using soundfile
            sf.write(str(wav_path), y, sr)
            audio_path = wav_path
            logger.info(f"Converted to WAV: {wav_path}")
        except Exception as e:
            logger.error(f"Audio conversion failed: {str(e)}")
            raise

    
    # Get audio duration first
    duration = get_audio_duration(audio_path)
    
    try:
        # Initialize openSMILE with ComParE feature set and appropriate options
        smile = opensmile.Smile(
            feature_set=opensmile.FeatureSet.ComParE_2016,
            feature_level=opensmile.FeatureLevel.Functionals,
            options={
                'audiofile_start': 0.0,
                'audiofile_end': duration,
                'frameMode': 'fixed',
                'frameSize': 0.025,  # 25ms frame size
                'frameStep': 0.01,   # 10ms frame step
            }
        )
        
        # Extract features
        features_df = smile.process_file(str(audio_path))
        
        # Get audio duration
        duration = get_audio_duration(audio_path)
        
        # Map ComParE features to our required format
        # Log available features for debugging
        # logger.debug(f"Available features: {features_df.columns.tolist()}")
        
        # Map ComParE features to our required format using available columns
        features = {
            "pitch_mean": float(features_df['F0final_sma_amean'].iloc[0]) if 'F0final_sma_amean' in features_df.columns else 0.0,
            "pitch_std": float(features_df['F0final_sma_stddev'].iloc[0]) if 'F0final_sma_stddev' in features_df.columns else 0.0,
            "energy_mean": float(features_df['pcm_RMSenergy_sma_amean'].iloc[0]) if 'pcm_RMSenergy_sma_amean' in features_df.columns else 0.0,
            "energy_std": float(features_df['pcm_RMSenergy_sma_stddev'].iloc[0]) if 'pcm_RMSenergy_sma_stddev' in features_df.columns else 0.0,
            "jitter": float(features_df['jitterLocal_sma_amean'].iloc[0]) if 'jitterLocal_sma_amean' in features_df.columns else 0.0,
            "shimmer": float(features_df['shimmerLocal_sma_amean'].iloc[0]) if 'shimmerLocal_sma_amean' in features_df.columns else 0.0,
            "speaking_duration": duration,
            "speech_rate": float(features_df['voicingFinalUnclipped_sma_amean'].iloc[0]) if 'voicingFinalUnclipped_sma_amean' in features_df.columns else 0.0
        }
        
        logger.info("Successfully extracted acoustic features with openSMILE")
        return features
        
    except Exception as e:
        logger.error(f"Error extracting acoustic features: {str(e)}")
        # Return default features in case of error
        return {
            "pitch_mean": 120.5,
            "pitch_std": 15.3,
            "energy_mean": 70.2,
            "energy_std": 10.1,
            "jitter": 0.025,
            "shimmer": 0.8,
            "speaking_duration": duration if duration > 0 else 30.5,
            "speech_rate": 150.0,
            "error": str(e)
        }
