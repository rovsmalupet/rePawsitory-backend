const mongoose = require('mongoose');

const petAccessSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  veterinarian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Access levels and permissions
  accessLevel: {
    type: String,
    enum: ['read', 'write'],
    required: true,
    default: 'read'
  },
  permissions: {
    viewMedicalHistory: { type: Boolean, default: true },
    addMedicalRecords: { type: Boolean, default: false },
    editMedicalRecords: { type: Boolean, default: false },
    deleteMedicalRecords: { type: Boolean, default: false },
    addPrescriptions: { type: Boolean, default: false },
    scheduleAppointments: { type: Boolean, default: true }
  },
  // Access control
  grantedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  grantedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  },
  // Revocation tracking
  isRevoked: {
    type: Boolean,
    default: false
  },
  revokedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  revokedAt: {
    type: Date
  },
  revocationReason: {
    type: String
  },
  // Notes
  notes: {
    type: String
  },
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

// Compound index to prevent duplicate access
petAccessSchema.index(
  { pet: 1, veterinarian: 1 },
  { unique: true, partialFilterExpression: { isRevoked: false } }
);

// Update timestamp on save
petAccessSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to revoke access
petAccessSchema.methods.revokeAccess = function(revokedBy, reason) {
  this.isRevoked = true;
  this.revokedBy = revokedBy;
  this.revokedAt = new Date();
  this.revocationReason = reason;
  return this.save();
};

// Method to check if access is valid
petAccessSchema.methods.isAccessValid = function() {
  if (this.isRevoked) return false;
  if (this.expiresAt && this.expiresAt < new Date()) return false;
  return true;
};

const PetAccess = mongoose.model('PetAccess', petAccessSchema);
module.exports = PetAccess;