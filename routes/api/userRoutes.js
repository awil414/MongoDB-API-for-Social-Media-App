// User API routes
const router = require('express').Router();

// User controllers
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// GET all users and POST new user /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// GET one user, PUT update a user by id, DELETE a user by id /api/users/:userId
router.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

// GET one user, POST update add new friend and DELETE friend by /api/users/:userId/friends/:friendsId
router.route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(removeFriend);
    
module.exports = router;
