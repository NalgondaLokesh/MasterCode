
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Create user
    const user = await User.create({
      username,
      email,
      password,
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    if (err.code === 11000) { // Duplicate key error
      return res.status(400).json({ success: false, message: 'User with that email or username already exists' });
    }
    res.status(400).json({ success: false, message: 'Registration failed' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide an email and password' });
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  sendTokenResponse(user, 200, res);
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Remove password from output
  const userResponse = {
    _id: user._id,
    username: user.username,
    email: user.email
  };

  res.status(statusCode).json({
    success: true,
    token,
    user: userResponse
  });
};
