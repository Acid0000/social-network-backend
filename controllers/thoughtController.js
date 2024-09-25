const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    console.log('Fetching all thoughts...');
    Thought.find()
      .then((thoughts) => {
        console.log(`Retrieved ${thoughts.length} thoughts.`);
        res.json(thoughts);
      })
      .catch((err) => {
        console.error('Error fetching thoughts:', err);
        res.status(500).json(err);
      });
  },

  getSingleThought(req, res) {
    console.log(`Fetching thought with ID: ${req.params.thoughtId}`);
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.error(`Error fetching thought with ID ${req.params.thoughtId}:`, err);
        res.status(500).json(err);
      });
  },

  createThought(req, res) {
    console.log('Creating new thought for user:', req.body.userId);
    Thought.create(req.body)
      .then((thought) => {
        console.log(`Thought created with ID: ${thought._id}. Updating user's thought list.`);
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.error('Error creating thought:', err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    console.log(`Updating thought with ID: ${req.params.thoughtId}`);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.error(`Error updating thought with ID ${req.params.thoughtId}:`, err);
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    console.log(`Deleting thought with ID: ${req.params.thoughtId}`);
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({ message: 'Thought deleted!' })
      )
      .catch((err) => {
        console.error(`Error deleting thought with ID ${req.params.thoughtId}:`, err);
        res.status(500).json(err);
      });
  },
};
