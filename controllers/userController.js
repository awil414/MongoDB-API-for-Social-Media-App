const { User, Thought } = require('./models'); // SHOULD THIS BE JUST USER?? (./models/users)???
const { userObj } = require('mongoose').Types;

const friendCount = async () =>
    User.aggregate()
    .count('friendCount')
    .then((numberOfFriends) => numberOfFriends);


module.exports = {
  // GET all users
  getAllUsers(req, res) {
    User.find()
        .populate('thoughts')
        .then(async (users) => {
        const userObj = {
          users,
            friendCount: await friendCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET a single user
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID." })
          : res.json({
                user,
                // friends: await friends(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
        });
    },
    // Create a new user
    createUser(req ,res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Update user by ID
    updateUser(req, res) {
        console.log('You are updating user.');
        console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Delete a user 
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((friends) =>
        !friends
          ? res.status(404).json({
              message: 'User deleted, but no friends found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// // Get all users
// const getAllUsers = async (req, res) => {
//     const users = await User.find({})
//         .populate({ path: 'thoughts', select: '-__v' })
//             if (!users)
//             ? return res.status(204).json({'message': 'No users found.'});
//             return res.json(users);

//         }),
// },
// //     const users = await User.find();
// //     if (!users) return res.status(204).json({'message': 'No users found.'});
// //     res.json(users);
// // }

// // Create new user
// const createNewUser = async (req, res) => {
//     if (!req?.body?.username || !req?.body?.email) {
//         return res.status(400).json({ 'message': 'Username and email are required.'});
//     }
//     try {
//         const result = await User.create({
//             username: req.body.username,
//             email: req.body.email
//         });
//         res.status(201).json(result);
//     } catch (err) {
//         console.error(err);
//     }
// }

// const updateUser = async (req, res) => {
//     if (!req?.body?.id) {
//         return res.status(400).json({ 'message': 'User ID required.' });
//     }
//     const user = await User.findOne({ _id: req.body.id }).exec();
//     if (!user) {
//         return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
//     }
//     if (req.body?.username) user.username = req.body.username;
//     if (req.body?.email) user.email = req.body.email;
//     const result = await user.save();
//     res.json(result);
// }

// const deleteUser = async(req, res) => {
//     if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID required.' });
//     const user = await User.findOne({ _id: req.body.id }).exec();
//     if (!user) {
//         return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
//     }
//     const result = await user.deleteOne({ _is: req.body.id });
//     res.json(result);
// }

// const getUser = async (req, res) => {
//     if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required.' });
//    const user = await User.findOne({ _id: req.params.id }).exec();
//     if (!user) {
//         return res.status(204).json({ "message": `No user matches ID ${req.params.id}.` });
//     }
//     res.json(user);
// }

// module.exports = {
//     getAllUsers,
//     createNewUser,
//     updateUser,
//     deleteUser,
//     getUser
// }
