const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

router.get('/all', async (req, res) => {
    try {
        const user = await User.find({ active: true }).sort({ createdAt: -1 });
        res.send(user);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving users'
        });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId, req.body);
        res.send(user);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving user with id ' + req.params.userId
        });
    }
});

router.put('/:userId', async (req, res) => {

    // Verify e-mail
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send({
            message: 'E-mail already registered'
        });
    }

    try {
        // runValidators é para ativar a validação no Update (Mongoose 4)
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
        res.send(user);
    } catch (error) {
        return res.status(500).send({
            message: error.message || 'Error updating user with id ' + req.params.userId
        });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.userId, req.body);
        res.send({
            message: 'User deleted successfully'
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Could not delete note with id ' + req.params.userId
        });
    }
});

module.exports = router;