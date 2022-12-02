const User = require('./models/User');

// Get all users
const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({'message': 'No users found.'});
    res.json(users);
}

// Create new user
const createNewUser = async (req, res) => {
    if (!req?.body?.username || !req?.body?.email) {
        return res.status(400).json({ 'message': 'Username and email are required.'});
    }
    try {
        const result = await User.create({
            username: req.body.username,
            email: req.body.email
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateUser = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'User ID required.' });
    }
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
    }
    if (req.body?.username) user.username = req.body.username;
    if (req.body?.email) user.email = req.body.email;
    const result = await user.save();
    res.json(result);
}

const deleteUser = async(req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID required.' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
    }
    const result = await user.deleteOne({ _is: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required.' });
   const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.params.id}.` });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}