const User = require('../models/User');

// GET /users/me
const getMe = async (req, res) => {
  // req.user is set in authMiddleware
  res.json({
    user: req.user
  });
};

// PUT /users/me
const updateMe = async (req, res) => {
  try {
    const allowedFields = ['name', 'skills', 'bio', 'location', 'role'];

    const updates = {};
    allowedFields.forEach((field) => {
      if (typeof req.body[field] !== 'undefined') {
        updates[field] = req.body[field];
      }
    });

    // optional: restrict role editing, uncomment if needed:
    // if (updates.role) delete updates.role;

    // never allow email or password changes here
    delete updates.email;
    delete updates.password;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true
    }).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error during profile update' });
  }
};

module.exports = {
  getMe,
  updateMe
};
