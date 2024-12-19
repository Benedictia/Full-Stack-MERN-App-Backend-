const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const dbURI = process.env.MONGODB_URI;

  if (!dbURI) {
    console.error('MongoDB URI is not defined in .env file');
    process.exit(1);  
  }

  try {
    
    await mongoose.connect(dbURI); 
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);  
  }
};

module.exports = connectDB;

