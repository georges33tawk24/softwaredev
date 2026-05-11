const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const clientBuildPath = path.join(__dirname, 'client', 'build');
const serveClient =
  process.env.NODE_ENV === 'production' &&
  fs.existsSync(path.join(clientBuildPath, 'index.html'));

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const propertyRoutes = require('./routes/properties');
const bookingRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');
const paymentRoutes = require('./routes/payments');

const app = express();

// Security middleware (CRA static bundle conflicts with default CSP)
app.use(serveClient ? helmet({ contentSecurityPolicy: false }) : helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  process.env.RENDER_EXTERNAL_URL,
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
  'http://localhost:3010',
  'http://127.0.0.1:3010',
  'https://deft-souffle-fdbcfe.netlify.app',
  'https://stellular-toffee-56e553.netlify.app'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from non-browser clients (curl/postman/server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    const isAllowed =
      allowedOrigins.includes(origin) ||
      /^https:\/\/[a-z0-9-]+\.netlify\.app$/i.test(origin);

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection (retry if Mongo starts after the API — common in local dev)
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rental_platform';
const mongoOptions = { serverSelectionTimeoutMS: 5000 };

function connectMongo() {
  mongoose
    .connect(mongoUri, mongoOptions)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      console.error('Retrying MongoDB connection in 3s…');
      setTimeout(connectMongo, 3000);
    });
}

connectMongo();

// Fail fast when DB is unavailable instead of waiting for model timeouts
app.use('/api', (req, res, next) => {
  if (req.path === '/health') {
    return next();
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database is unavailable. Please try again shortly.'
    });
  }

  return next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

if (serveClient) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Rental Platform API',
      version: '1.0.0',
      status: 'Server is running',
      endpoints: {
        auth: '/api/auth',
        users: '/api/users',
        properties: '/api/properties',
        bookings: '/api/bookings',
        admin: '/api/admin',
        health: '/api/health'
      }
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
