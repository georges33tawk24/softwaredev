const mongoose = require('mongoose');
require('dotenv').config();

// Import User model
const User = require('./models/User');

const checkAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rental_platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if admin user exists
    const adminUser = await User.findOne({ email: 'admin@rental.com' });
    
    if (adminUser) {
      console.log('✅ Admin user found!');
      console.log('Email:', adminUser.email);
      console.log('Role:', adminUser.role);
      console.log('Verified:', adminUser.isVerified);
      console.log('Created:', adminUser.createdAt);
      console.log('User ID:', adminUser._id);
    } else {
      console.log('❌ Admin user not found!');
      
      // List all users
      const allUsers = await User.find({});
      console.log('\nAll users in database:');
      allUsers.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}, Role: ${user.role}, Verified: ${user.isVerified}`);
      });
    }

    // Close connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error checking admin user:', error);
    process.exit(1);
  }
};

checkAdminUser();
