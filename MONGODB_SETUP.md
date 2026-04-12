# MongoDB Atlas Setup Instructions

## Step 1: Create MongoDB Atlas Account
1. Go to https://cloud.mongodb.com/
2. Click "Try Free" → Sign up with email
3. Verify your email address

## Step 2: Create Free Cluster
1. After login, click "Build a Database"
2. Select "M0 Sandbox" (FREE)
3. Choose cloud provider and region (closest to you)
4. Cluster name: "rental-platform-cluster"
5. Click "Create Cluster"

## Step 3: Create Database User
1. Go to "Database Access" in left menu
2. Click "Add New Database User"
3. Username: `rental-admin`
4. Password: Generate secure password (save it!)
5. Click "Add User"

## Step 4: Configure Network Access
1. Go to "Network Access" in left menu
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" → "Clusters"
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Copy the connection string
5. Replace `<password>` with your actual password

## Your Connection String Format:
```
mongodb+srv://rental-admin:YOUR_PASSWORD@rental-platform-cluster.xxxxx.mongodb.net/rental_platform?retryWrites=true&w=majority
```

## Step 6: Update .env.production
Replace the MONGODB_URI line with your actual connection string.
