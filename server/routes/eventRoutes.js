const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventController');
const { protect, trainer } = require('../middleware/authMiddleware');

router.get('/', getEvents);
router.post('/', protect, trainer, createEvent);

module.exports = router;
