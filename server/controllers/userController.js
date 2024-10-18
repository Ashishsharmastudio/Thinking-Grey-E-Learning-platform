const User = require('../models/User');



exports.getUserProfile = async (req, res) => {
    console.log("getUserProfile",res)
    try {
      const user = await User.findById(req.user).select('-otp -otpExpiry');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  