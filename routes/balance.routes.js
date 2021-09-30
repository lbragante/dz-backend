const express = require('express');
const router = express.Router();
const { balanceValidation } = require('../config/validations.config');
const Balance = require('../models/Balance.model');

router.post('/create', async (req, res) => {

    const { error } = balanceValidation(req.body);

    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const balanceSave = new Balance(req.body);

    try {
        const balance = await balanceSave.save();
        res.send(balance);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while creating the Balance'
        });
    }

});

router.get('/all', async (req, res) => {
    try {
        const balance = await Balance.find().sort({ createdAt: -1 });
        res.send(balance);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while retrieving balances'
        });
    }
});

router.get('/:balanceId', async (req, res) => {
    try {
        const balance = await Balance.findById(req.params.balanceId, req.body);
        res.send(balance);
    } catch (error) {
        res.status(500).send({
            message: 'Some error occurred while retrieving balance with id ' + req.params.balanceId
        });
    }
});

router.put('/:balanceId', async (req, res) => {
    try {
        const balance = await Balance.findByIdAndUpdate(req.params.balanceId, req.body, { new: true, runValidators: true });
        res.send(balance);
    } catch (error) {
        return res.status(500).send({
            message: error.message ||  'Error updating balance with id ' + req.params.balanceId
        });
    }
});

router.delete('/:balanceId', async (req, res) => {
    try {
        await Balance.findByIdAndRemove(req.params.balanceId, req.body);
        res.send({
            message: 'Balance deleted successfully'
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Could not delete note with id ' + req.params.balanceId
        });
    }
});

module.exports = router;