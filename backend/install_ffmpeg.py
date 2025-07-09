import os
import sys
import platform
import subprocess
import zipfile
import shutil
from pathlib import Path
import urllib.request

def is_windows():
    return platform.system() == "Windows"

def is_macos():
    return platform.system() == "Darwin"

def is_linux():
    return platform.system() == "Linux"

def download_file(url, destination):
    """Download a file with progress indicator"""
    print(f"Downloading from {url}...")
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(destination), exist_ok=True)
    
    # Download with progress
    def report_progress(block_num, block_size, total_size):
        read_so_far = block_num * block_size
        if total_size > 0:
            percent = read_so_far * 100 / total_size
            percent = min(percent, 100)  # Ensure it doesn't exceed 100%
            sys.stdout.write(f"\rDownloaded: {percent:.1f}% ({read_so_far / 1024 / 1024:.1f} MB)")
            sys.stdout.flush()
    
    urllib.request.urlretrieve(url, destination, reporthook=report_progress)
    print("\nDownload complete!")

def install_ffmpeg_windows():
    """Install FFmpeg on Windows"""
    # Download FFmpeg
    ffmpeg_url = "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64.zip"
    download_dir = Path(os.path.expanduser("~")) / "Downloads"
    zip_path = download_dir / "ffmpeg.zip"
    
    # Create extract directory
    extract_dir = download_dir / "ffmpeg_extract"
    ffmpeg_dir = Path("C:/ffmpeg")
    
    try:
        # Download FFmpeg
        if not zip_path.exists():
            download_file(ffmpeg_url, str(zip_path))
        else:
            print(f"Using existing download at {zip_path}")
        
        # Extract FFmpeg
        print("Extracting FFmpeg...")
        os.makedirs(extract_dir, exist_ok=True)
        with zipfile.ZipFile(str(zip_path), 'r') as zip_ref:
            zip_ref.extractall(str(extract_dir))
        
        # Find the bin directory
        bin_dirs = list(extract_dir.glob("*/bin"))
        if not bin_dirs:
            print("Error: Could not find bin directory in extracted files")
            return False
        
        bin_dir = bin_dirs[0]
        
        # Copy to C:/ffmpeg
        print(f"Installing FFmpeg to {ffmpeg_dir}...")
        os.makedirs(ffmpeg_dir, exist_ok=True)
        os.makedirs(ffmpeg_dir / "bin", exist_ok=True)
        
        # Copy executables
        for exe in bin_dir.glob("*.exe"):
            print(f"Copying {exe.name}...")
            shutil.copy(exe, ffmpeg_dir / "bin" / exe.name)
        
        # Add to PATH
        print("Adding FFmpeg to PATH...")
        ffmpeg_bin_path = str(ffmpeg_dir / "bin")
        
        # Set PATH for current process
        if ffmpeg_bin_path not in os.environ["PATH"]:
            os.environ["PATH"] = ffmpeg_bin_path + os.pathsep + os.environ["PATH"]
        
        # Set PATH permanently
        try:
            subprocess.run(
                ["setx", "PATH", f"{os.environ['PATH']}"],
                check=True,
                capture_output=True,
                text=True
            )
            print("Added FFmpeg to PATH successfully")
        except subprocess.CalledProcessError as e:
            print(f"Warning: Could not set PATH permanently: {e}")
            print(f"Please add {ffmpeg_bin_path} to your PATH manually")
        
        # Verify installation
        print("Verifying FFmpeg installation...")
        try:
            result = subprocess.run(
                ["ffmpeg", "-version"],
                check=True,
                capture_output=True,
                text=True
            )
            print(f"FFmpeg installed successfully:")
            print(result.stdout.splitlines()[0])
            return True
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            print(f"Error verifying FFmpeg: {e}")
            print("FFmpeg may not be properly installed.")
            return False
    
    except Exception as e:
        print(f"Error installing FFmpeg: {e}")
        return False

def install_ffmpeg_macos():
    """Install FFmpeg on macOS using Homebrew"""
    try:
        # Check if Homebrew is installed
        try:
            subprocess.run(["brew", "--version"], check=True, capture_output=True)
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("Homebrew not found. Installing Homebrew...")
            homebrew_install = '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
            subprocess.run(homebrew_install, shell=True, check=True)
        
        # Install FFmpeg
        print("Installing FFmpeg with Homebrew...")
        subprocess.run(["brew", "install", "ffmpeg"], check=True)
        
        # Verify installation
        result = subprocess.run(["ffmpeg", "-version"], check=True, capture_output=True, text=True)
        print(f"FFmpeg installed successfully:")
        print(result.stdout.splitlines()[0])
        return True
    
    except Exception as e:
        print(f"Error installing FFmpeg: {e}")
        return False

def install_ffmpeg_linux():
    """Install FFmpeg on Linux using apt or similar"""
    try:
        # Detect package manager
        if os.path.exists("/usr/bin/apt"):
            # Debian/Ubuntu
            print("Installing FFmpeg with apt...")
            subprocess.run(["sudo", "apt", "update"], check=True)
            subprocess.run(["sudo", "apt", "install", "-y", "ffmpeg"], check=True)
        elif os.path.exists("/usr/bin/dnf"):
            # Fedora
            print("Installing FFmpeg with dnf...")
            subprocess.run(["sudo", "dnf", "install", "-y", "ffmpeg"], check=True)
        elif os.path.exists("/usr/bin/yum"):
            # CentOS/RHEL
            print("Installing FFmpeg with yum...")
            subprocess.run(["sudo", "yum", "install", "-y", "epel-release"], check=True)
            subprocess.run(["sudo", "yum", "install", "-y", "ffmpeg"], check=True)
        elif os.path.exists("/usr/bin/pacman"):
            # Arch Linux
            print("Installing FFmpeg with pacman...")
            subprocess.run(["sudo", "pacman", "-S", "--noconfirm", "ffmpeg"], check=True)
        else:
            print("Unsupported Linux distribution. Please install FFmpeg manually.")
            return False
        
        # Verify installation
        result = subprocess.run(["ffmpeg", "-version"], check=True, capture_output=True, text=True)
        print(f"FFmpeg installed successfully:")
        print(result.stdout.splitlines()[0])
        return True
    
    except Exception as e:
        print(f"Error installing FFmpeg: {e}")
        return False

def main():
    """Main function to install FFmpeg"""
    print("FFmpeg Installer for Whisper")
    print("=" * 50)
    
    # Check if FFmpeg is already installed
    try:
        result = subprocess.run(
            ["ffmpeg", "-version"],
            check=True,
            capture_output=True,
            text=True
        )
        print("FFmpeg is already installed:")
        print(result.stdout.splitlines()[0])
        print("\nIf you want to reinstall FFmpeg, please remove it first.")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("FFmpeg is not installed or not in PATH. Installing now...")
    
    # Install FFmpeg based on platform
    if is_windows():
        print("Detected Windows operating system")
        success = install_ffmpeg_windows()
    elif is_macos():
        print("Detected macOS operating system")
        success = install_ffmpeg_macos()
    elif is_linux():
        print("Detected Linux operating system")
        success = install_ffmpeg_linux()
    else:
        print(f"Unsupported operating system: {platform.system()}")
        print("Please install FFmpeg manually.")
        success = False
    
    if success:
        print("\n" + "=" * 50)
        print("FFmpeg installation successful!")
        print("\nPlease restart your terminal or IDE to use FFmpeg.")
        print("You can verify the installation by running:")
        print("  ffmpeg -version")
        print("\nNow you can run Whisper transcription with:")
        print("  python test_sample_wav.py")
    else:
        print("\n" + "=" * 50)
        print("FFmpeg installation failed.")
        print("Please install FFmpeg manually following the instructions in FFmpeg_Installation_Guide.md")
    
    return success

if __name__ == "__main__":
    main()
