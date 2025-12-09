const Message = require('../models/Message');

// @desc    Send a message
// @route   POST /api/messages/:id
// @access  Private
exports.sendMessage = async (req, res) => {
    const { content } = req.body;
    const receiverId = req.params.id;

    try {
        const message = new Message({
            sender: req.user._id,
            receiver: receiverId,
            content,
        });

        const createdMessage = await message.save();
        res.status(201).json(createdMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get messages between logged in user and another user
// @route   GET /api/messages/:id
// @access  Private
exports.getMessages = async (req, res) => {
    const otherUserId = req.params.id;

    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: otherUserId },
                { sender: otherUserId, receiver: req.user._id },
            ],
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
