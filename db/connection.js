// db/connection.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected Successfully!');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Encerra o processo em caso de falha
  }
};

module.exports = connectDB;