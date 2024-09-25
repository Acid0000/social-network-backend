const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,        // Add the new controller function for adding a reaction
  removeReaction,     // Add the new controller function for removing a reaction
} = require('../../controllers/thoughtController');

// Routes for thoughts
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Route for posting and deleting reactions
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);    // POST to add a reaction

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);  // DELETE to remove a reaction

module.exports = router;
