const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
    trim: true,
    default: ''
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unknown'],
    required: true
  },
  // Physical information
  weight: {
    value: Number,
    unit: { type: String, enum: ['kg', 'lbs'], default: 'kg' },
    date: { type: Date, default: Date.now }
  },
  color: {
    type: String,
    trim: true
  },
  photoUrl: {
    type: String,
    trim: true
  },
  // Health information
  allergies: [{
    type: String,
    trim: true
  }],
  chronicConditions: [{
    condition: String,
    diagnosedDate: Date,
    notes: String
  }],
  // Emergency contact
  emergencyContact: {
    name: String,
    phone: String,
    email: String,
    relationship: String
  },
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

// Virtual field for age calculation
petSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  
  const today = new Date();
  const birthDate = this.dateOfBirth;
  const ageInYears = (today.getFullYear() - birthDate.getFullYear());
  const ageInMonths = today.getMonth() - birthDate.getMonth();
  
  if (ageInYears > 0) {
    return `${ageInYears} year${ageInYears > 1 ? 's' : ''}`;
  } else {
    return `${ageInMonths} month${ageInMonths > 1 ? 's' : ''}`;
  }
});

// Update timestamp on save
petSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Configure virtuals to be included in JSON representation
petSchema.set('toJSON', { virtuals: true });
petSchema.set('toObject', { virtuals: true });

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;