const Review = require('../models/Review');
const Skill = require('../models/Skill');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
    const { targetId, skillId, rating, comment } = req.body;

    try {
        const review = new Review({
            author: req.user._id,
            target: targetId,
            skill: skillId,
            rating,
            comment,
        });

        await review.save();

        // Update Skill rating if skillId is provided
        if (skillId) {
            const reviews = await Review.find({ skill: skillId });
            const numReviews = reviews.length;
            const avgRating =
                reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;

            const skill = await Skill.findById(skillId);
            if (skill) {
                skill.rating = avgRating;
                skill.numReviews = numReviews;
                await skill.save();
            }
        }

        res.status(201).json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get reviews for a trainer (or skill)
// @route   GET /api/reviews/:id
// @access  Public
exports.getReviews = async (req, res) => {
    // :id can be trainerId or skillId. Let's assume trainerId primarily.
    // Or use query params ?skill=ID or ?trainer=ID
    // Let's make this endpoint generic: /api/reviews?trainer=ID or /api/reviews?skill=ID

    try {
        const { trainer, skill } = req.query;
        let query = {};
        if (trainer) query.target = trainer;
        if (skill) query.skill = skill;

        const reviews = await Review.find(query).populate('author', 'name profilePic');
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
