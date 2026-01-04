const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

// Middleware to check if user owns resource or is admin
exports.isOwnerOrAdmin = (req, res, next) => {
  const resourceUserId = req.body.userId || req.params.userId;
  
  if (req.user.isAdmin || req.user.userId === parseInt(resourceUserId)) {
    return next();
  }
  
  res.status(403).json({
    success: false,
    message: 'Access denied. You can only modify your own resources.'
  });
};

