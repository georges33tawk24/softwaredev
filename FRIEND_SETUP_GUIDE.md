# 🏠 Rental Services Platform - Setup Guide

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

### Required Software
- **Node.js** (v16 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - [Download MongoDB](https://www.mongodb.com/try/download/community)
  - Or create a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Git** - [Download Git](https://git-scm.com/)

### Verify Installation
```bash
node --version  # Should be v16+
npm --version   # Should be 8+
mongod --version
```

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Extract & Navigate
```bash
# Extract the zip file
unzip rental-services-platform.zip
cd rental-services-platform
```

### Step 2: Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 3: Environment Setup
```bash
# Copy environment files
cp .env.example .env
cp client/.env.example client/.env
```

### Step 4: Start MongoDB
```bash
# Option A: Local MongoDB
mongod

# Option B: MongoDB Atlas (update .env with your connection string)
# No need to start local MongoDB
```

### Step 5: Run the Project
```bash
# Start both backend and frontend
npm run dev
```

**🎉 That's it! The app will be available at:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

---

## 📁 Project Structure

```
rental-services-platform/
├── 📁 client/                 # React Frontend
│   ├── 📁 src/
│   ├── 📄 package.json
│   └── 📄 .env
├── 📁 models/                 # Database Models
├── 📁 routes/                 # API Routes
├── 📁 middleware/             # Express Middleware
├── 📄 server.js              # Backend Server
├── 📄 package.json           # Backend Dependencies
└── 📄 .env                   # Backend Environment
```

---

## ⚙️ Environment Configuration

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/rental-platform
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/rental-platform

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this

# Server
PORT=5001
NODE_ENV=development

# Email (Optional - for verification emails)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend (client/.env)
```env
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_ENV=development
```

---

## 🔧 Detailed Setup Steps

### 1. Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux/macOS
# or
net start MongoDB            # Windows

# Create database (automatically done on first run)
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### 2. Backend Setup
```bash
# Install dependencies
npm install

# Create admin user (optional - auto-created on first run)
node scripts/createAdmin.js
```

### 3. Frontend Setup
```bash
cd client
npm install

# Start development server
npm start
```

---

## 🏗️ Development Commands

### Backend Commands
```bash
npm run server      # Start backend only
npm run dev         # Start backend with nodemon
npm test            # Run backend tests
```

### Frontend Commands
```bash
cd client
npm start          # Start frontend dev server
npm run build      # Build for production
npm test           # Run frontend tests
```

---

## 🌐 Access Points

### Development URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Documentation**: http://localhost:5001/api-docs

### Default Admin Account
```
Email: admin@rental.com
Password: admin123
```

---

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
sudo systemctl start mongod  # Linux/macOS
net start MongoDB            # Windows
```

### Issue 2: Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5001
lsof -ti:5001 | xargs kill -9
```

### Issue 3: Node Version Too Old
```bash
# Update Node.js using nvm
nvm install 18
nvm use 18
```

### Issue 4: Permission Denied
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

---

## 📱 Features Overview

### User Features
- ✅ User Registration & Login
- ✅ Property Browsing & Search
- ✅ Booking Management
- ✅ Profile Management
- ✅ Reviews & Ratings

### Admin Features
- ✅ Admin Dashboard
- ✅ User Management
- ✅ Property Management
- ✅ Booking Management
- ✅ Analytics & Stats

### Technical Features
- ✅ JWT Authentication
- ✅ Role-Based Access Control
- ✅ Real-time Data Updates
- ✅ Responsive Design
- ✅ RESTful API

---

## 🚀 Production Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Set production environment
export NODE_ENV=production

# Start production server
npm start
```

### Frontend Deployment
```bash
cd client
npm run build

# Deploy the /build folder to your hosting service
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-production-secret
PORT=5001
```

---

## 📞 Support & Help

### Getting Help
1. Check this README first
2. Look at the console logs for errors
3. Check the Issues section on GitHub
4. Contact the project maintainer

### Useful Commands
```bash
# Check all running processes
ps aux | grep node

# Check network connections
netstat -an | grep LISTEN

# View logs
tail -f logs/error.log
```

---

## 🎯 Next Steps

After successful setup:

1. **Explore the App**: Browse properties, create bookings
2. **Try Admin Panel**: Login as admin, manage users/properties
3. **Add Your Own Data**: Create properties, users, bookings
4. **Customize**: Modify colors, add features, etc.

---

## 📝 License

This project is licensed under the MIT License. Feel free to use it for personal or commercial purposes.

---

**Happy Coding! 🎉**

If you encounter any issues, please check the "Common Issues" section above or reach out for support.
