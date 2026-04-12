const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('./models/User');

const createAdminUser = async () => {
  try {
    // Connect to MongoDB with retry logic
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rental_platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 10000, // 10 second timeout
    });

    console.log('Connected to MongoDB successfully');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@rental.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@rental.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@rental.com',
      password: 'admin123', // This will be hashed by the pre-save hook
      phone: '+1234567890',
      role: 'admin',
      isVerified: true // Auto-verify admin user
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@rental.com');
    console.log('Password: admin123');
    console.log('Role: admin');

    // Close connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdminUser();
