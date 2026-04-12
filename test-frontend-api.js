// Test the exact same way the frontend does
const axios = require('axios');

const testFrontendAPI = async () => {
  try {
    console.log('Testing frontend API call...');
    
    // Create the same axios instance as the frontend
    const api = axios.create({
      baseURL: 'http://localhost:5001/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await api.post('/auth/login', {
      email: 'admin@rental.com',
      password: 'admin123'
    });
    
    console.log('✅ Frontend API call successful!');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    
  } catch (error) {
    console.log('❌ Frontend API call failed!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error:', error.message);
    }
  }
};

testFrontendAPI();
