// Thought API routes
const router = require('express').Router();

const {
    getAllThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// GET all thoughts and POST new thought /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

//GET one thought, PUT update a thought, DELETE a thought by id /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

// POST new reaction 
router.route('/reactions')
    .post(addReaction);

// DELETE a reaction by id /api/thoughts/:thoughtId/reactions
router.route('/:reactionId')
    .delete(deleteThought);
    
module.exports = router;