import os
import subprocess
import sys
import zipfile
import shutil
from pathlib import Path
import requests
from tqdm import tqdm
import ctypes

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def check_ffmpeg_installed():
    """Check if ffmpeg is available in PATH"""
    try:
        result = subprocess.run(["ffmpeg", "-version"], 
                               stdout=subprocess.PIPE, 
                               stderr=subprocess.PIPE, 
                               text=True, 
                               check=False)
        return result.returncode == 0
    except FileNotFoundError:
        return False

def download_ffmpeg():
    """Download FFmpeg for Windows"""
    print("Downloading FFmpeg for Windows...")
    url = "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip"
    download_path = Path(os.path.expanduser("~")) / "Downloads" / "ffmpeg.zip"
    
    # Check if file already exists
    if download_path.exists():
        print(f"FFmpeg already downloaded at: {download_path}")
        return download_path
    
    # Download with progress bar
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))
    
    with open(download_path, 'wb') as file, tqdm(
            desc="Downloading FFmpeg",
            total=total_size,
            unit='B',
            unit_scale=True,
            unit_divisor=1024,
        ) as bar:
        for data in response.iter_content(chunk_size=1024):
            size = file.write(data)
            bar.update(size)
    
    return download_path

def extract_ffmpeg(zip_path):
    """Extract FFmpeg zip file"""
    print("Extracting FFmpeg...")
    extract_dir = Path(os.path.expanduser("~")) / "Downloads" / "ffmpeg_extract"
    ffmpeg_dir = Path("C:/ffmpeg")
    
    # Create extract directory if it doesn't exist
    if not extract_dir.exists():
        extract_dir.mkdir(parents=True)
    else:
        # Clean up existing directory
        for item in extract_dir.iterdir():
            if item.is_dir():
                shutil.rmtree(item)
            else:
                item.unlink()
    
    # Extract the zip file
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_dir)
    
    print("Extracted FFmpeg to:", extract_dir)
    
    # Find the bin directory in the extracted content
    bin_dirs = list(extract_dir.glob("*/bin"))
    if not bin_dirs:
        raise Exception("Could not find bin directory in extracted FFmpeg")
    
    bin_dir = bin_dirs[0]
    print("Found bin directory:", bin_dir)
    
    # Create C:/ffmpeg/bin directory
    if ffmpeg_dir.exists():
        shutil.rmtree(ffmpeg_dir)
    
    ffmpeg_bin_dir = ffmpeg_dir / "bin"
    ffmpeg_bin_dir.mkdir(parents=True)
    
    # Copy exe files to C:/ffmpeg/bin
    exe_files = list(bin_dir.glob("*.exe"))
    print(f"Found {len(exe_files)} executable files")
    
    for exe in exe_files:
        dest_path = ffmpeg_bin_dir / exe.name
        print(f"Copying {exe.name} to {dest_path}")
        shutil.copy2(exe, dest_path)
    
    print(f"\nFFmpeg files have been copied to: {ffmpeg_bin_dir}")
    return ffmpeg_bin_dir

def add_to_path(bin_dir):
    """Add FFmpeg to PATH environment variable"""
    bin_path = str(bin_dir)
    
    # Get current PATH
    current_path = os.environ.get("PATH", "")
    
    if bin_path not in current_path:
        if is_admin():
            # Set system-wide PATH (requires admin)
            print("Adding FFmpeg to system PATH...")
            subprocess.run(
                ["setx", "/M", "PATH", f"{current_path};{bin_path}"],
                check=True
            )
        else:
            # Set user PATH
            print("Adding FFmpeg to user PATH...")
            subprocess.run(
                ["setx", "PATH", f"{current_path};{bin_path}"],
                check=True
            )
        
        print(f"FFmpeg added to PATH: {bin_path}")
        print("Please restart your terminal or IDE for the PATH changes to take effect.")
    else:
        print("FFmpeg is already in PATH")

def install_ffmpeg():
    """Download and install FFmpeg"""
    if check_ffmpeg_installed():
        print("FFmpeg is already installed and in PATH")
        return True
    
    try:
        zip_path = download_ffmpeg()
        bin_dir = extract_ffmpeg(zip_path)
        add_to_path(bin_dir)
        
        # Copy executables to current directory for immediate use
        for exe in bin_dir.glob("*.exe"):
            dest_path = Path.cwd() / exe.name
            shutil.copy(exe, dest_path)
            print(f"Copied {exe.name} to current directory for immediate use")
        
        return True
    except Exception as e:
        print(f"Error installing FFmpeg: {e}")
        return False

def test_whisper_transcription():
    """Test Whisper transcription with FFmpeg"""
    try:
        import whisper
        from backend.app.services.transcription import transcribe_audio
        
        sample_path = Path("backend/tests/data/sample.wav")
        if not sample_path.exists():
            print(f"Error: Sample audio file not found at {sample_path}")
            return False
        
        print("Testing Whisper transcription...")
        result = transcribe_audio(sample_path)
        print(f"Transcription result: {result}")
        
        if "FALLBACK" in result:
            print("Warning: Transcription used fallback mode. FFmpeg might not be working correctly.")
            return False
        
        print("Whisper transcription test successful!")
        return True
    except Exception as e:
        print(f"Error testing Whisper transcription: {e}")
        return False

def main():
    print("FFmpeg Setup for Whisper")
    print("=====================================")
    
    if check_ffmpeg_installed():
        print("✅ FFmpeg is already installed and in PATH")
        print("\nYou can verify with:")
        print("  ffmpeg -version")
        print("\nYou can now run the transcription test:")
        print("  python test_sample_wav.py")
        return True
    
    print("❌ FFmpeg is not installed or not in PATH")
    print("\nDownloading and setting up FFmpeg...")
    
    try:
        # Download FFmpeg
        zip_path = download_ffmpeg()
        
        # Extract FFmpeg and copy to C:/ffmpeg/bin
        ffmpeg_bin_dir = extract_ffmpeg(zip_path)
        
        print("\n" + "=" * 50)
        print("✅ FFmpeg files have been set up successfully!")
        print("\nNow you need to add FFmpeg to your PATH environment variable:")
        print("\n1. Right-click on 'This PC' or 'My Computer' and select 'Properties'")
        print("2. Click on 'Advanced system settings'")
        print("3. Click on 'Environment Variables'")
        print("4. Under 'System variables', find the 'Path' variable and click 'Edit'")
        print("5. Click 'New' and add this path:")
        print(f"   {ffmpeg_bin_dir}")
        print("6. Click 'OK' on all dialog boxes to save changes")
        print("7. Restart your terminal or IDE for the changes to take effect")
        
        print("\nAfter adding to PATH and restarting your terminal, verify with:")
        print("  ffmpeg -version")
        print("\nThen you can run Whisper transcription with:")
        print("  python test_sample_wav.py")
        
        return True
    except Exception as e:
        print(f"\n❌ Error setting up FFmpeg: {e}")
        print("\nManual installation instructions:")
        print("1. Download FFmpeg from https://ffmpeg.org/download.html#build-windows")
        print("2. Extract the zip file")
        print("3. Add the bin directory to your PATH environment variable")
        return False
        print("3. Check if the sample.wav file exists in backend/tests/data/")

if __name__ == "__main__":
    main()
