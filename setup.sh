#!/bin/bash

# 🚀 Rental Services Platform - Quick Setup Script
# Run this script after extracting the zip file

echo "🏠 Welcome to Rental Services Platform Setup!"
echo "============================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version is too old. Please upgrade to v16+"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed locally."
    echo "   You have two options:"
    echo "   1. Install MongoDB locally: https://www.mongodb.com/try/download/community"
    echo "   2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    echo ""
    read -p "Do you want to continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ MongoDB is installed"
fi

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd client
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Setup environment files
echo ""
echo "⚙️  Setting up environment files..."

# Backend .env
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file from template"
    else
        cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/rental-platform
JWT_SECRET=your-super-secret-jwt-key-change-this-$(date +%s)
PORT=5001
NODE_ENV=development
EOF
        echo "✅ Created default .env file"
    fi
else
    echo "✅ .env file already exists"
fi

# Frontend .env
if [ ! -f client/.env ]; then
    if [ -f client/.env.example ]; then
        cp client/.env.example client/.env
        echo "✅ Created client/.env file from template"
    else
        cat > client/.env << EOF
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_ENV=development
EOF
        echo "✅ Created default client/.env file"
    fi
else
    echo "✅ client/.env file already exists"
fi

# Start MongoDB (if available)
echo ""
if command -v mongod &> /dev/null; then
    echo "🗄️  Starting MongoDB..."
    if pgrep mongod > /dev/null; then
        echo "✅ MongoDB is already running"
    else
        mongod --fork --logpath /var/log/mongodb.log --dbpath /var/lib/mongodb
        echo "✅ MongoDB started"
    fi
fi

# Final instructions
echo ""
echo "🎉 Setup completed successfully!"
echo "================================"
echo ""
echo "📋 Next Steps:"
echo "1. Review the .env files if needed"
echo "2. Run 'npm run dev' to start the application"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Login with admin@rental.com / admin123"
echo ""
echo "📚 For detailed instructions, see FRIEND_SETUP_GUIDE.md"
echo ""
echo "🚀 Starting the application now..."
echo "   (Press Ctrl+C to stop)"
echo ""

# Start the application
npm run dev
