// const thoughtController = require('../../controllers/userController');
const { Thought, User } = require("../models");

module.exports = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // GET one thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .slect("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : res.json(thought)
      )
      .cathc((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought was not recorded! " })
          : User.findOneAndUpdate(
              { userId: req.body.userId },
              { $push: { thoughts: { thought: thought.thoughtText } } },
              { runValidators: true, new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found." })
          : res.json({ thought: "Thought succesfully recorded!" })
      )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // DELETE a thought
  deleteThought(req, res) {
    thought
      .findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : User.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted." }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
