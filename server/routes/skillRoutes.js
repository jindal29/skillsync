const express = require('express');
const router = express.Router();
const {
    getSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
} = require('../controllers/skillController');
const { protect, trainer } = require('../middleware/authMiddleware');

router.route('/').get(getSkills).post(protect, trainer, createSkill);
router
    .route('/:id')
    .get(getSkillById)
    .put(protect, trainer, updateSkill)
    .delete(protect, trainer, deleteSkill);

module.exports = router;
