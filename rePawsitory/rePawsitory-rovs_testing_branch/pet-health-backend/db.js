const mongoose = require('mongoose');

// Use environment variable for MongoDB URI (for security)
// Falls back to the original URI for local development
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://rovickdompor_db_user:A559PoD0zfz6N2rr@cluster0.mizhw2z.mongodb.net/?appName=Cluster0'

function connectToDatabase() {
  return mongoose
    .connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log(`✅ Connected to MongoDB successfully`);
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });
}

module.exports = { connectToDatabase };


