const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const category = req.query.category
            ? {
                category: req.query.category,
            }
            : {};

        const count = await Skill.countDocuments({ ...keyword, ...category });
        const skills = await Skill.find({ ...keyword, ...category })
            .populate('trainer', 'name rating')
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ skills, page, pages: Math.ceil(count / pageSize) });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get skill by ID
// @route   GET /api/skills/:id
// @access  Public
exports.getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id).populate(
            'trainer',
            'name email headline bio profilePic'
        );

        if (skill) {
            res.json(skill);
        } else {
            res.status(404).json({ msg: 'Skill not found' });
        }
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            res.status(404).json({ msg: 'Skill not found' });
        } else {
            res.status(500).send('Server Error');
        }
    }
};

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Trainer
exports.createSkill = async (req, res) => {
    const { title, category, description, price } = req.body;

    try {
        const skill = new Skill({
            trainer: req.user._id,
            title,
            category,
            description,
            price,
        });

        const createdSkill = await skill.save();
        res.status(201).json(createdSkill);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Trainer
exports.updateSkill = async (req, res) => {
    const { title, category, description, price } = req.body;

    try {
        const skill = await Skill.findById(req.params.id);

        if (skill) {
            if (skill.trainer.toString() !== req.user._id.toString()) {
                return res.status(401).json({ msg: 'User not authorized' });
            }

            skill.title = title || skill.title;
            skill.category = category || skill.category;
            skill.description = description || skill.description;
            skill.price = price || skill.price;

            const updatedSkill = await skill.save();
            res.json(updatedSkill);
        } else {
            res.status(404).json({ msg: 'Skill not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Trainer
exports.deleteSkill = async (req, res) => {
    try {
        // findByIdAndDelete is cleaner than finding then removing
        const skill = await Skill.findOneAndDelete({
            _id: req.params.id,
            trainer: req.user._id
        });

        if (skill) {
            res.json({ msg: 'Skill removed' });
        } else {
            // If no skill found or not owner, check if it exists at all to give better error
            const exists = await Skill.findById(req.params.id);
            if (!exists) {
                return res.status(404).json({ msg: 'Skill not found' });
            } else {
                return res.status(401).json({ msg: 'User not authorized' });
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
