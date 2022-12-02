const router = require('express').Router();
const {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
} = require('../../controllers/userController');

// GET all users and POST new user /api/users
router.route('/')
    .get(getAllUsers)
    .post(createNewUser);

// GET one user, PUT update a user by id, DELETE a user by id /api/users/:userId
router.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
