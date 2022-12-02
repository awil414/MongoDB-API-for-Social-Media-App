const router = require('express').Router();
const {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createNewUser);

// /api/users/:userId
router.route('/:userId').get(getUser);

router.route('/:userID').get(updateUser);

router.route('/:userID').get(deleteUser);

module.exports = router;
