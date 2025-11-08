const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = 'your-secret-key';

// Middleware to verify JWT token
const auth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.header('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const token = authHeader.replace('Bearer ', '');

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Find user
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Add user to request object
        req.user = user;
        req.token = token;
        
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

// Middleware to check role
const checkRole = (roles) => {
    return (req, res, next) => {
        console.log('Checking role. User role:', req.user.role, 'Required roles:', roles);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied', userRole: req.user.role, requiredRoles: roles });
        }
        next();
    };
};

module.exports = { auth, checkRole };module.exports = { auth, checkRole };