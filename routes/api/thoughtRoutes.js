// Thought API routes
const router = require('express').Router();

const {
    getAllThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;