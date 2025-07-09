import logging
import os
import subprocess
from pathlib import Path
from typing import List, Optional, Tuple, Union

# Configure logger
logger = logging.getLogger(__name__)

def safe_remove_file(file_path: Union[str, Path]) -> bool:
    """
    Safely remove a file if it exists.
    
    Args:
        file_path: Path to the file to remove
        
    Returns:
        True if file was removed, False if file didn't exist
    """
    path = Path(file_path)
    if path.exists() and path.is_file():
        try:
            os.remove(path)
            logger.info(f"Successfully removed file: {path}")
            return True
        except Exception as e:
            logger.error(f"Error removing file {path}: {str(e)}")
            return False
    return False

def run_subprocess(cmd: List[str], cwd: Optional[Path] = None) -> Tuple[bool, str, str]:
    """
    Run a subprocess command and return the result.
    
    Args:
        cmd: Command to run as a list of strings
        cwd: Working directory for the command
        
    Returns:
        Tuple of (success, stdout, stderr)
    """
    logger.info(f"Running subprocess: {' '.join(cmd)}")
    try:
        result = subprocess.run(
            cmd,
            cwd=cwd,
            capture_output=True,
            text=True,
            check=False
        )
        success = result.returncode == 0
        if not success:
            logger.error(f"Subprocess failed with code {result.returncode}: {result.stderr}")
        return success, result.stdout, result.stderr
    except Exception as e:
        logger.error(f"Error running subprocess: {str(e)}")
        return False, "", str(e)

def setup_logging(log_level: str = "INFO") -> None:
    """
    Set up logging configuration.
    
    Args:
        log_level: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    """
    numeric_level = getattr(logging, log_level.upper(), None)
    if not isinstance(numeric_level, int):
        numeric_level = logging.INFO
    
    logging.basicConfig(
        level=numeric_level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    
    # Reduce verbosity of some loggers
    logging.getLogger("httpx").setLevel(logging.WARNING)
    logging.getLogger("httpcore").setLevel(logging.WARNING)
    logging.getLogger("urllib3").setLevel(logging.WARNING)
