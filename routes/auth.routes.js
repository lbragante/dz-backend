const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { registerValidation, loginValidation } = require('../config/validations.config');
const User = require('../models/User.model');

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send({
            message: 'E-mail já cadastrado'
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const userSave = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const user = await userSave.save();
        user.password = undefined;
        res.send(user);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while creating the User'
        });
    }

});

router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const user = await User.findOne({ email: req.body.email }).select('+password');

    if (!user) {
        return res.status(400).send({
            message: 'Usuário ou senha inválidos'
        });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(400).send({
            message: 'Usuário ou senha inválidos'
        });
    }

    user.password = undefined;

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: 86400 // 24 hours
    });

    res.header(token).send({
        user: user,
        token: token
    });
});


// Logout
router.get('/logout', async (req, res) => {
    res.status(200).send({
        token: null
    });
    console.log('Logout');
});


module.exports = router;