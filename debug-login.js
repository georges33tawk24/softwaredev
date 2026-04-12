const mongoose = require('mongoose');
require('dotenv').config();

// Import User model
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const debugLogin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rental_platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@rental.com' }).select('+password');
    
    if (adminUser) {
      console.log('✅ Admin user found!');
      console.log('Email:', adminUser.email);
      console.log('Stored password hash:', adminUser.password);
      console.log('Role:', adminUser.role);
      console.log('Verified:', adminUser.isVerified);
      
      // Test password comparison
      const testPassword = 'admin123';
      const isMatch = await bcrypt.compare(testPassword, adminUser.password);
      console.log('\n🔐 Password Test:');
      console.log('Test password:', testPassword);
      console.log('Password matches:', isMatch);
      
      if (!isMatch) {
        console.log('❌ Password does not match! Creating new hash...');
        const newHash = await bcrypt.hash(testPassword, 12);
        console.log('New hash:', newHash);
        
        // Update the password
        await User.findByIdAndUpdate(adminUser._id, { password: newHash });
        console.log('✅ Password updated in database');
      }
      
    } else {
      console.log('❌ Admin user not found!');
    }

    // Close connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error debugging login:', error);
    process.exit(1);
  }
};

debugLogin();
