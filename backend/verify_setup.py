#!/usr/bin/env python3
"""
Verification script for PitchPerfect project setup.

This script checks:
1. VSCode settings for Python extra paths
2. Editable install of PitchPerfect package
3. Import functionality of key modules

Returns exit code 0 if all checks pass, 1 if any fail.
"""

import json
import os
import sys
import subprocess
import importlib.util
from pathlib import Path
from typing import Tuple, Dict, Any


def check_vscode_settings() -> Tuple[bool, str]:
    """
    Check if .vscode/settings.json exists and contains the correct extraPaths.
    
    Returns:
        Tuple of (success: bool, message: str)
    """
    settings_path = Path(".vscode/settings.json")
    
    if not settings_path.exists():
        return False, "❌ .vscode/settings.json not found"
    
    try:
        with open(settings_path, 'r', encoding='utf-8') as f:
            settings = json.load(f)
        
        extra_paths = settings.get("python.analysis.extraPaths", [])
        
        if "./backend" in extra_paths or "backend" in extra_paths:
            return True, "✅ VSCode settings.json contains backend in extraPaths"
        else:
            return False, f"❌ VSCode settings.json missing './backend' in extraPaths. Current extraPaths: {extra_paths}"
    
    except json.JSONDecodeError as e:
        return False, f"❌ Invalid JSON in .vscode/settings.json: {e}"
    except Exception as e:
        return False, f"❌ Error reading .vscode/settings.json: {e}"


def check_editable_install() -> Tuple[bool, str]:
    """
    Check if PitchPerfect package is installed in editable mode.
    
    Returns:
        Tuple of (success: bool, message: str)
    """
    try:
        # Method 1: Try using pip show
        result = subprocess.run(
            [sys.executable, "-m", "pip", "show", "PitchPerfect"],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0:
            output = result.stdout
            lines = output.split('\n')
            
            # Parse pip show output
            package_info = {}
            for line in lines:
                if ':' in line:
                    key, value = line.split(':', 1)
                    package_info[key.strip()] = value.strip()
            
            name = package_info.get('Name', '')
            location = package_info.get('Location', '')
            editable_project_location = package_info.get('Editable project location', '')
            
            if name.lower() == 'pitchperfect':
                if editable_project_location:
                    # Editable install detected via 'Editable project location' field
                    return True, f"✅ PitchPerfect installed in editable mode at: {editable_project_location}"
                elif location and os.path.abspath('.') in os.path.abspath(location):
                    # Fallback: check if location points to current project
                    return True, f"✅ PitchPerfect installed in editable mode at: {location}"
                else:
                    return False, f"❌ PitchPerfect found but not in editable mode. Location: {location}"
            else:
                return False, f"❌ Package name mismatch. Expected 'PitchPerfect', got '{name}'"
        
        # Method 2: Try using importlib.metadata (Python 3.8+)
        try:
            import importlib.metadata as metadata
            
            # Try to get distribution info
            dist = metadata.distribution("PitchPerfect")
            
            # Check if it's an editable install
            if dist.files:
                for file in dist.files:
                    if str(file).endswith('.egg-link') or 'site-packages' not in str(file):
                        return True, "✅ PitchPerfect installed in editable mode (detected via metadata)"
            
            return False, "❌ PitchPerfect found but appears to be a regular install, not editable"
            
        except metadata.PackageNotFoundError:
            return False, "❌ PitchPerfect package not found. Run 'pip install -e .' to install in editable mode"
        except ImportError:
            # Fallback for older Python versions
            pass
        
        return False, "❌ PitchPerfect package not found or not accessible"
        
    except subprocess.TimeoutExpired:
        return False, "❌ Timeout while checking pip packages"
    except Exception as e:
        return False, f"❌ Error checking editable install: {e}"


def check_imports() -> Tuple[bool, str]:
    """
    Check if key modules can be imported successfully.
    
    Returns:
        Tuple of (success: bool, message: str)
    """
    modules_to_test = [
        "app.services.transcription",
        "app.services.text_analysis", 
        "app.services.acoustic_features"
    ]
    
    failed_imports = []
    success_messages = []
    
    # Add backend directory to Python path temporarily
    backend_path = Path("backend").resolve()
    if str(backend_path) not in sys.path:
        sys.path.insert(0, str(backend_path))
    
    for module_name in modules_to_test:
        try:
            # Try to import the module
            spec = importlib.util.find_spec(module_name)
            if spec is None:
                failed_imports.append(f"Module {module_name} not found")
                continue
            
            if spec.loader is None:
                failed_imports.append(f"Module {module_name} found but no loader available")
                continue
            
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            success_messages.append(f"✅ Successfully imported {module_name}")
            
        except ImportError as e:
            failed_imports.append(f"ImportError for {module_name}: {e}")
        except Exception as e:
            failed_imports.append(f"Error importing {module_name}: {e}")
    
    # Remove backend path from sys.path
    if str(backend_path) in sys.path:
        sys.path.remove(str(backend_path))
    
    if failed_imports:
        error_msg = "❌ Import failures:\n" + "\n".join(f"  - {err}" for err in failed_imports)
        if success_messages:
            error_msg += "\n\nSuccessful imports:\n" + "\n".join(f"  {msg}" for msg in success_messages)
        return False, error_msg
    else:
        success_msg = "✅ All imports successful:\n" + "\n".join(f"  {msg}" for msg in success_messages)
        return True, success_msg


def main():
    """Main verification function."""
    print("🔍 PitchPerfect Setup Verification")
    print("=" * 50)
    
    # Track overall success
    all_passed = True
    
    # Check 1: VSCode Settings
    print("\n1. Checking VSCode Settings...")
    vscode_success, vscode_msg = check_vscode_settings()
    print(f"   {vscode_msg}")
    if not vscode_success:
        all_passed = False
    
    # Check 2: Editable Install
    print("\n2. Checking Editable Install...")
    install_success, install_msg = check_editable_install()
    print(f"   {install_msg}")
    if not install_success:
        all_passed = False
    
    # Check 3: Import Tests
    print("\n3. Checking Module Imports...")
    import_success, import_msg = check_imports()
    print(f"   {import_msg}")
    if not import_success:
        all_passed = False
    
    # Final Report
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 ALL CHECKS PASSED! Setup is correct.")
        print("\nRecommendations:")
        print("  - Your development environment is properly configured")
        print("  - You can now run tests and develop with confidence")
        sys.exit(0)
    else:
        print("⚠️  SOME CHECKS FAILED! Please address the issues above.")
        print("\nRecommendations:")
        if not vscode_success:
            print("  - Create .vscode/settings.json with:")
            print('    {"python.analysis.extraPaths": ["./backend"]}')
        if not install_success:
            print("  - Install the package in editable mode:")
            print("    pip install -e .")
        if not import_success:
            print("  - Check your Python path and package structure")
            print("  - Ensure all required dependencies are installed")
        sys.exit(1)


if __name__ == "__main__":
    main()
