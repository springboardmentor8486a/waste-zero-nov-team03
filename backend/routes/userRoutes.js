const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getMe,
  updateMe,
  changePassword,
} = require("../controllers/userController");

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.put("/change-password", protect, changePassword);

module.exports = router;
