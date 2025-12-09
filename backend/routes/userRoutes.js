const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getMe, updateMe } = require('../controllers/userController');

// All routes below are protected
router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateMe);

module.exports = router;
