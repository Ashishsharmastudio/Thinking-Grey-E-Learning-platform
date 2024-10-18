const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

console.log('User routes loaded');

router.get('/profile', auth, (req, res, next) => {
  console.log('Profile route accessed');
  getUserProfile(req, res, next);
});

module.exports = router;
