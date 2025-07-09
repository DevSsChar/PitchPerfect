# FFmpeg Installation Guide for Windows

This guide will help you install FFmpeg on Windows, which is required for Whisper transcription to work properly.

## Download FFmpeg

1. Visit one of these websites to download FFmpeg:
   - Official FFmpeg builds: https://ffmpeg.org/download.html#build-windows
   - FFmpeg builds by BtbN: https://github.com/BtbN/FFmpeg-Builds/releases/latest
   - gyan.dev builds: https://www.gyan.dev/ffmpeg/builds/ (recommended - download "ffmpeg-git-full.7z")

2. Download the appropriate version for your system (typically the "full" or "essentials" build for Windows 64-bit)

## Install FFmpeg

### Method 1: Using the Windows Package Manager (winget)
If you have winget installed, you can install FFmpeg with this command:
```powershell
winget install FFmpeg
```

### Method 2: Manual Installation
1. Extract the downloaded zip/7z file to a location on your computer
   - Recommended: Extract to `C:\ffmpeg`
   - You can use 7-Zip or WinRAR to extract the archive

2. Add FFmpeg to your PATH:
   - Right-click "This PC" or "My Computer" and select "Properties"
   - Click on "Advanced system settings"
   - Click on "Environment Variables"
   - Under "System variables" (for all users) or "User variables" (for current user only), find the "Path" variable and click "Edit"
   - Click "New" and add the full path to the FFmpeg bin directory (e.g., `C:\ffmpeg\bin`)
   - Click "OK" on all dialogs to save changes

3. Restart your terminal, IDE, or computer for the changes to take effect

## Verify Installation

To verify that FFmpeg is installed correctly:

1. Open a new PowerShell or Command Prompt window
2. Run the following command:
```powershell
ffmpeg -version
```

You should see the FFmpeg version information displayed, indicating that FFmpeg is correctly installed and available in your PATH.

## Testing with PitchPerfect

After installing FFmpeg:

1. Run the following command to test Whisper transcription:
```powershell
cd "c:/Users/shrey/Downloads/AI Analysis/PitchPerfect"
python test_sample_wav.py
```

2. If the transcription works correctly, you should see the transcribed text without a "FALLBACK" prefix.

## Troubleshooting

If you're still having issues:

1. Make sure you've restarted your terminal or IDE after adding FFmpeg to PATH
2. Try running PowerShell or Command Prompt as Administrator when verifying the installation
3. Check that the bin directory contains ffmpeg.exe, ffprobe.exe, and ffplay.exe
4. Ensure there are no spaces in the path to FFmpeg
5. If using VS Code, try restarting VS Code after installing FFmpeg
