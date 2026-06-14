#!/usr/bin/env python3
"""
SovereignAqua Asset Downloader & Uploader
Automatically downloads and uploads images and videos to GitHub
"""

import os
import requests
import base64
from pathlib import Path

# GitHub Configuration
GITHUB_TOKEN = "YOUR_GITHUB_TOKEN_HERE"  # You'll need to add this
GITHUB_OWNER = "emenoghaebube21-eng"
GITHUB_REPO = "sovereignaqua-research-and-development-foundation.website"
GITHUB_API = "https://api.github.com/repos"

# Direct download links to best royalty-free assets (Unsplash, Pexels, Pixabay)
ASSETS = {
    "images": {
        "water.jpg": "https://images.unsplash.com/photo-1533496617326-56a1fbd85b17?w=1920&q=80",
        "environment.jpg": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80",
        "humanitarian.jpg": "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=1920&q=80",
        "asset-management-4k.jpg": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
    },
    "videos": {
        "sovereignaqua-bg.mp4": "https://download.blender.org/demo/movies/BBB/bbb_sunflower_1080p_h264.mov"  # Placeholder - use Pexels video
    }
}

def download_asset(url, filepath):
    """Download an asset from URL"""
    print(f"📥 Downloading: {filepath}")
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        Path(filepath).parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"✅ Downloaded: {filepath}")
        return True
    except Exception as e:
        print(f"❌ Error downloading {filepath}: {e}")
        return False

def upload_to_github(filepath, github_path):
    """Upload a file to GitHub"""
    print(f"📤 Uploading to GitHub: {github_path}")
    
    try:
        with open(filepath, 'rb') as f:
            file_content = f.read()
        
        # Encode to base64
        encoded_content = base64.b64encode(file_content).decode('utf-8')
        
        # GitHub API URL
        url = f"{GITHUB_API}/{GITHUB_OWNER}/{GITHUB_REPO}/contents/{github_path}"
        
        # Prepare payload
        payload = {
            "message": f"Add {github_path}",
            "content": encoded_content,
            "branch": "main"
        }
        
        # Headers with authentication
        headers = {
            "Authorization": f"token {GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3+json"
        }
        
        # Upload
        response = requests.put(url, json=payload, headers=headers, timeout=60)
        
        if response.status_code in [201, 200]:
            print(f"✅ Uploaded: {github_path}")
            return True
        else:
            print(f"❌ Upload failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error uploading {filepath}: {e}")
        return False

def main():
    """Main execution"""
    print("🚀 SovereignAqua Asset Manager\n")
    
    # Check for GitHub token
    if GITHUB_TOKEN == "YOUR_GITHUB_TOKEN_HERE":
        print("⚠️  GITHUB_TOKEN not set!")
        print("To use this script:")
        print("1. Generate a GitHub Personal Access Token: https://github.com/settings/tokens")
        print("2. Replace GITHUB_TOKEN in this script")
        print("3. Run: python3 upload_assets.py")
        return
    
    # Create temporary directory
    temp_dir = Path("./temp_assets")
    temp_dir.mkdir(exist_ok=True)
    
    # Download images
    print("📦 Downloading Images...")
    for filename, url in ASSETS["images"].items():
        filepath = temp_dir / filename
        download_asset(url, str(filepath))
    
    # Upload images to GitHub
    print("\n📤 Uploading Images to GitHub...")
    for filename in ASSETS["images"]:
        filepath = temp_dir / filename
        github_path = f"assets/images/{filename}"
        if filepath.exists():
            upload_to_github(str(filepath), github_path)
    
    print("\n✨ Asset upload complete!")

if __name__ == "__main__":
    main()
