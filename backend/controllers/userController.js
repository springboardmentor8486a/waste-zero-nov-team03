const User = require("../models/User");

// GET /api/users/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// PUT /api/users/me
const updateMe = async (req, res) => {
  try {
    const allowedFields = ["name", "skills", "bio", "location"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error during profile update" });
  }
};

// PUT /api/users/change-password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to change password" });
  }
};

module.exports = {
  getMe,
  updateMe,
  changePassword,
};
