#!/bin/bash

echo "🚀 Rental Platform Quick Deployment"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Rental platform ready for deployment"
    echo ""
    echo "⚠️  IMPORTANT: Follow these steps:"
    echo "1. Create GitHub repository at https://github.com/new"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/rental-platform.git"
    echo "3. Run: git push -u origin main"
    echo ""
    echo "Then continue with deployment steps below..."
    exit 1
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deployment ready: $(date)"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "🎯 NEXT STEPS:"
echo ""
echo "1️⃣  MongoDB Atlas Setup:"
echo "   • Go to: https://cloud.mongodb.com/"
echo "   • Create free M0 cluster named 'rental-platform-cluster'"
echo "   • Create user: rental-admin"
echo "   • Allow access from anywhere (0.0.0.0/0)"
echo "   • Get connection string and update .env.production"
echo ""
echo "2️⃣  Backend Deployment (Render):"
echo "   • Go to: https://render.com/"
echo "   • Connect GitHub repository"
echo "   • Use these settings:"
echo "     - Name: rental-platform-backend"
echo "     - Runtime: Node"
echo "     - Build Command: npm install"
echo "     - Start Command: npm start"
echo "     - Plan: Free"
echo "   • Add environment variables from .env.production"
echo "   • Deploy and get URL: https://rental-platform-backend.onrender.com"
echo ""
echo "3️⃣  Frontend Deployment (Vercel):"
echo "   • Go to: https://vercel.com/"
echo "   • Connect GitHub repository"
echo "   • Settings:"
echo "     - Root Directory: ./client"
echo "     - Framework: Create React App"
echo "     - Build Command: npm run build"
echo "   • Add environment variable: REACT_APP_API_URL"
echo "   • Deploy and get URL: https://rental-platform.vercel.app"
echo ""
echo "🎉 YOUR LIVE SITE WILL BE:"
echo "   Frontend: https://rental-platform.vercel.app"
echo "   Backend:  https://rental-platform-backend.onrender.com/api"
echo ""
echo "📋 Check DEPLOYMENT_GUIDE.md for detailed instructions!"
