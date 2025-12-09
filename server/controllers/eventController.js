const Event = require('../models/Event');

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer', 'name').sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create an event (Trainer only - checked in route)
const createEvent = async (req, res) => {
    try {
        const { title, description, date, type, link } = req.body;
        const event = new Event({
            title,
            description,
            date,
            type,
            link,
            organizer: req.user._id,
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getEvents, createEvent };
