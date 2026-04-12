#!/bin/bash

echo "=== Rental Platform Deployment Script ==="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Rental platform ready for deployment"
fi

# Check if remote exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "Please add your GitHub repository as remote:"
    echo "git remote add origin https://github.com/yourusername/rental-platform.git"
    echo "Then run: git push -u origin main"
    exit 1
fi

echo "Pushing latest changes to GitHub..."
git add .
git commit -m "Deployment ready: $(date)"
git push origin main

echo ""
echo "=== Next Steps ==="
echo "1. Go to https://render.com and deploy your backend"
echo "2. Go to https://vercel.com and deploy your frontend"
echo "3. Update environment variables with deployed URLs"
echo "4. Test your live application!"
echo ""
echo "Check DEPLOYMENT_GUIDE.md for detailed instructions"
