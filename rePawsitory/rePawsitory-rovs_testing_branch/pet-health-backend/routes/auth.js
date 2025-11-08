const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Secret key for JWT - in production, use an environment variable
const JWT_SECRET = 'your-secret-key';

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, clinic, license, specialization, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Validate vet-specific fields if role is veterinarian
    if (role === 'veterinarian') {
      if (!clinic || !license || !specialization) {
        return res.status(400).json({ 
          error: 'Veterinarians must provide clinic, license, and specialization' 
        });
      }
    }

    // Create new user with role-specific fields
    const userData = {
      name,
      email,
      password, // Will be hashed by the pre-save middleware
      role: role || 'pet_owner'
    };

    // Add optional phone field
    if (phone) {
      userData.phone = phone;
    }

    // Add optional address field
    if (address) {
      userData.address = address;
    }

    // Add vet-specific fields if role is veterinarian
    if (role === 'veterinarian') {
      userData.clinic = clinic;
      userData.license = license;
      userData.specialization = specialization;
    }

    const user = new User(userData);

    // Save user
    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: user.role 
      }, 
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Map backend roles to frontend roles
    const frontendRole = user.role === 'pet_owner' ? 'owner' : 
                        user.role === 'veterinarian' ? 'vet' : user.role;

    // Return user info and token
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: frontendRole
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;