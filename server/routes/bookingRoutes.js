const express = require('express');
const router = express.Router();
const {
    createBooking,
    getBookings,
    updateBookingStatus,
} = require('../controllers/bookingController');
const { protect, trainer } = require('../middleware/authMiddleware');

router.route('/').post(protect, createBooking).get(protect, getBookings);
router.route('/:id').put(protect, trainer, updateBookingStatus);

module.exports = router;
