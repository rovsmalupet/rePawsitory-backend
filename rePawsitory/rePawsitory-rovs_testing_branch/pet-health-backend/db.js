const mongoose = require('mongoose');


const MONGO_URI = 'mongodb+srv://rovickdompor_db_user:A559PoD0zfz6N2rr@cluster0.mizhw2z.mongodb.net/?appName=Cluster0'
function connectToDatabase() {
  return mongoose
    .connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log(`✅ Connected to MongoDB at ${MONGO_URI}`);
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });
}

module.exports = { connectToDatabase };


