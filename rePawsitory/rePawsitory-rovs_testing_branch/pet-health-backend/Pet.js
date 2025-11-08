const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    default: '',
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    min: 0
  },
  // Stores either an emoji/text or a base64 data URL for uploaded images
  photo: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);
