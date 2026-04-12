# Rental Platform Deployment Guide

## Free Hosting Setup

This guide will help you deploy your rental platform using free hosting services.

### Services Used:
- **Frontend**: Vercel (Free custom domain: *.vercel.app)
- **Backend**: Render (Free tier: *.onrender.com)
- **Database**: MongoDB Atlas (Free tier: 512MB)

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account
3. Create a new project
4. Create a free cluster (M0 Sandbox)
5. Create a database user
6. Get your connection string
7. Update `.env.production` with your MongoDB URI

## Step 2: Deploy Backend to Render

1. Push your code to GitHub
2. Go to [Render](https://render.com/)
3. Create a free account
4. Click "New" -> "Web Service"
5. Connect your GitHub repository
6. Configure:
   - **Name**: rental-platform-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
7. Add Environment Variables:
   - `NODE_ENV`: production
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure secret
   - `JWT_EXPIRE`: 7d
   - `PORT`: 5000
8. Click "Create Web Service"
9. Wait for deployment (2-3 minutes)
10. Copy your backend URL: `https://your-app-name.onrender.com`

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Create a free account
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: ./client
   - **Build Command**: `npm run build`
   - **Output Directory**: build
6. Add Environment Variables:
   - `REACT_APP_API_URL`: Your Render backend URL + `/api`
7. Click "Deploy"
8. Wait for deployment (1-2 minutes)
9. Copy your frontend URL: `https://your-app-name.vercel.app`

## Step 4: Update Production URLs

Update these files with your actual deployed URLs:

### client/.env.production
```
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

### .env.production
```
FRONTEND_URL=https://your-app-name.vercel.app
```

## Step 5: Test the Deployment

1. Visit your frontend URL
2. Test all functionalities:
   - User registration/login
   - Property browsing and search
   - Booking management
   - Admin dashboard
   - All filters and features

## Quick Deploy Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd client
vercel --prod

# For backend, use Render dashboard (no CLI needed for free tier)
```

## Important Notes

- **Free tier limitations**: 
  - Render: Sleeps after 15 minutes inactivity (cold starts ~30s)
  - MongoDB Atlas: 512MB storage limit
  - Vercel: Unlimited deployments, 100GB bandwidth/month

- **Performance**: First load may be slow due to cold starts
- **Scaling**: Upgrade to paid plans for production use

## Your Live URLs (After Deployment)

- **Frontend**: https://your-app-name.vercel.app
- **Backend API**: https://your-backend-name.onrender.com/api
- **Database**: MongoDB Atlas (managed)

## Troubleshooting

1. **CORS Errors**: Ensure FRONTEND_URL matches your Vercel domain
2. **Database Connection**: Check MongoDB Atlas network access (allow all IPs for free tier)
3. **Build Failures**: Check logs in Vercel/Render dashboards
4. **Slow Loading**: Normal for free tier due to cold starts
