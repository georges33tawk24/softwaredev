const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    }
    res.status(500).json({ message: 'Server error during authentication.' });
  }
};

// Role-based access control
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied. Insufficient permissions.' 
      });
    }
    next();
  };
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

// Check if user owns the resource or is admin
const authorizeOwnerOrAdmin = (resourceField = 'user') => {
  return async (req, res, next) => {
    try {
      // Admin can access everything
      if (req.user.role === 'admin' || req.user.role === 'super_admin') {
        return next();
      }

      // Get the resource and check ownership
      const resourceId = req.params.id || req.body[resourceField];
      const Model = require('../models/' + resourceField.charAt(0).toUpperCase() + resourceField.slice(1));
      const resource = await Model.findById(resourceId);

      if (!resource) {
        return res.status(404).json({ message: 'Resource not found.' });
      }

      // Check if user owns the resource
      if (resource[resourceField].toString() !== req.user._id.toString()) {
        return res.status(403).json({ 
          message: 'Access denied. You can only access your own resources.' 
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error during authorization.' });
    }
  };
};

module.exports = {
  protect,
  authorize,
  optionalAuth,
  authorizeOwnerOrAdmin
};
