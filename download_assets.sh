#!/bin/bash

# SovereignAqua Asset Quick Uploader
# Simple bash script for manual asset downloads and uploads

echo "🚀 SovereignAqua Asset Uploader"
echo "================================\n"

# Create temp directory
mkdir -p temp_assets

# Download best matching images from Unsplash (optimized URLs)
echo "📥 Downloading Images..."

# Water Infrastructure
curl -L "https://images.unsplash.com/photo-1533496617326-56a1fbd85b17?w=1920&q=80" -o temp_assets/water.jpg
echo "✅ Downloaded water.jpg"

# Environmental Sustainability
curl -L "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80" -o temp_assets/environment.jpg
echo "✅ Downloaded environment.jpg"

# Humanitarian Aid
curl -L "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=1920&q=80" -o temp_assets/humanitarian.jpg
echo "✅ Downloaded humanitarian.jpg"

# Asset Management
curl -L "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80" -o temp_assets/asset-management-4k.jpg
echo "✅ Downloaded asset-management-4k.jpg"

echo "\n📤 Assets ready for upload!"
echo "Next steps:"
echo "1. Go to: https://github.com/emenoghaebube21-eng/sovereignaqua-research-and-development-foundation.website"
echo "2. Navigate to assets/images/"
echo "3. Click 'Add file' → 'Upload files'"
echo "4. Drag files from temp_assets/ folder"
echo "5. Commit changes"
