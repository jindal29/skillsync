const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private/Student
exports.createBooking = async (req, res) => {
    const { trainerId, skillId, date, message } = req.body;

    try {
        const booking = new Booking({
            student: req.user._id,
            trainer: trainerId,
            skill: skillId,
            date,
            message,
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
    try {
        const pageSize = 5;
        const page = Number(req.query.pageNumber) || 1;

        let query;
        if (req.query.role === 'trainer') {
            query = { trainer: req.user._id };
        } else {
            query = { student: req.user._id };
        }

        const count = await Booking.countDocuments(query);
        const bookings = await Booking.find(query)
            .populate('student', 'name email')
            .populate('trainer', 'name email')
            .populate('skill', 'title')
            .sort({ date: -1 }) // Sort by newest first
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ bookings, page, pages: Math.ceil(count / pageSize) });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Trainer
exports.updateBookingStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const booking = await Booking.findById(req.params.id);

        if (booking) {
            if (booking.trainer.toString() !== req.user._id.toString()) {
                return res.status(401).json({ msg: 'User not authorized' });
            }

            booking.status = status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ msg: 'Booking not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
