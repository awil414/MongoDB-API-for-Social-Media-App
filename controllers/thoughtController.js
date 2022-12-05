// const thoughtController = require('../../controllers/userController');
const { Thought, User } = require("../models");
const { thoughtObj } = require("mongoose").Types; // Why grayed out? see line 16 & 20

// const reactionCount = async () =>
//   Thought.aggregate() // Should this be Thought.aggregate ????
//     .count("reactionCount")
//     .then((numberOfReactions) => numberOfReactions);

module.exports = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .populate({ path: "reactions", select: "-__v" }) // should i not populate reactions for GET ALL users?
      .then(async (thoughts) => {
        // WHY is users grayed out????
        const thoughtObj = {
          thoughts,
        //   reactionCount: await reactionCount(), // Is this right?
        };
        return res.json(thoughtObj); // Being called here, but grayed out above
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET one thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: "reactions", select: "-__v" }) // Do i need to populate reactions?
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : res.json(
            thought,
            // reactionCount: await reactionCount(req.params.thoughtId), // Does this go here?
          )
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        res.json(thought);
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thoughtId } }, //why isnt this working???
            { new: true }
            );
        })
    .then((user) => 
        ! user 
            ? res.status(404).json({ message: 'Thought created, but no user with this ID.' })
            : res.json(user)
            )
        
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    })
},

    //   .then((thought) => res.json(thought))
    //   console.log("You are adding a new thought.");
    //   console.log(req.body);
    // //       User.findOneAndUpdate(
    //           // Does : mean return?
    //           { _id: req.body.userId },
    //           { $addToSet: { thoughts: { thought: thought.thoughtText } } },
    //           { runValidators: true, new: true }
    //         )
    //   )
    //   .then((user) =>
    //     !user
    //       ? res.status(404).json({ message: "User not found." })
    //       : res.json({ thought: "Thought succesfully recorded!" })
    //   )
      
  // DELETE a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : User.deleteOne({ _id: { $in: User.thoughts } })
      )
      .then(() => res.json({ message: "Thought deleted." }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText, username: req.body.username },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a reaction to a thought by ID
  addReaction(req, res) {
    console.log("You are adding a reaction.");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought by thoughtID
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
        .then((thought) => res.json(thought))
    //     .then((thought) =>
    //     !thought
    //       ? res
    //           .status(404)
    //           .json({ message: "No thought found with that ID :(" })
    //       : res.json(thought)
    //   )
      .catch((err) => res.status(500).json(err));
  },
};
