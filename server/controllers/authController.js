const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/emailService');
const { generateOTP } = require('../utils/otpGenerator');

exports.login = async (req, res) => {
  const { email, language } = req.body;
  try {
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // Set expiry time to 5 minutes from now
    console.log('Generated OTP:', otp);

    // Use findOneAndUpdate to find the user and set the OTP, language, and otpExpiry
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { otp, language, otpExpiry } },
      { new: true, upsert: true }
    );

    console.log('Updated user:', user);

    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Check if the OTP is expired
    if (user.otpExpiry && user.otpExpiry < Date.now()) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Set OTP to null after successful verification
    // user.otp = null;
    // user.otpExpiry = null;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

