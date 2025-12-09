const express = require('express');
const router = express.Router();
const { signup, login, updateProfile, getTrainers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.put('/profile', protect, updateProfile);
router.get('/trainers', getTrainers);

module.exports = router;
