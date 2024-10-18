require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('Auth middleware started');
  const token = req.header('x-auth-token');
  console.log("Received token:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    console.log("Token verified, user ID:", req.user);
    next();
    console.log('Auth middleware completed successfully');
  } catch (error) {
    console.log("Token verification failed:", error.message);
    res.status(401).json({ error: 'Token is not valid' });
  }
};
