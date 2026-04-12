#!/bin/bash

# 📦 Create Distribution Package Script
# This script creates a zip file ready to send to friends

echo "📦 Creating Rental Services Platform distribution package..."

# Get current directory name
PROJECT_NAME=$(basename "$(pwd)")
ZIP_NAME="${PROJECT_NAME}-$(date +%Y%m%d).zip"

# Create temporary directory for clean package
TEMP_DIR="temp-package"
rm -rf $TEMP_DIR
mkdir $TEMP_DIR

# Copy essential files
echo "📋 Copying project files..."
cp -r client $TEMP_DIR/
cp -r models $TEMP_DIR/
cp -r routes $TEMP_DIR/
cp -r middleware $TEMP_DIR/
cp server.js $TEMP_DIR/
cp package.json $TEMP_DIR/
cp package-lock.json $TEMP_DIR/ 2>/dev/null || true
cp .env.example $TEMP_DIR/ 2>/dev/null || true
cp client/.env.example $TEMP_DIR/client/ 2>/dev/null || true

# Copy documentation
cp FRIEND_SETUP_GUIDE.md $TEMP_DIR/
cp setup.sh $TEMP_DIR/

# Remove unnecessary files
echo "🧹 Cleaning up package..."
find $TEMP_DIR -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
find $TEMP_DIR -name ".git" -type d -exec rm -rf {} + 2>/dev/null || true
find $TEMP_DIR -name "build" -type d -exec rm -rf {} + 2>/dev/null || true
find $TEMP_DIR -name "*.log" -type f -delete 2>/dev/null || true
find $TEMP_DIR -name ".DS_Store" -type f -delete 2>/dev/null || true

# Create zip file
echo "🗜️  Creating zip file..."
cd $TEMP_DIR
zip -r "../$ZIP_NAME" .
cd ..
rm -rf $TEMP_DIR

echo ""
echo "✅ Package created successfully!"
echo "📁 File: $ZIP_NAME"
echo "📏 Size: $(du -h $ZIP_NAME | cut -f1)"
echo ""
echo "📋 What to send to your friend:"
echo "   1. The zip file: $ZIP_NAME"
echo "   2. Tell them to run: unzip $ZIP_NAME && cd ${PROJECT_NAME} && ./setup.sh"
echo ""
echo "🎉 Your friend can now run the project with just 3 commands!"
