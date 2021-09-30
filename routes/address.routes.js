const express = require('express');
const router = express.Router();
const { addressValidation } = require('../config/validations.config');
const Address = require('../models/Address.model');

router.post('/create', async (req, res) => {

    const { error } = addressValidation(req.body);

    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const addressSave = new Address(req.body);

    try {
        const address = await addressSave.save();
        res.send(address);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while creating the Address'
        });
    }

});

router.get('/all', async (req, res) => {
    try {
        const address = await Address.find().sort({ createdAt: -1 });
        res.send(address);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while retrieving addresss'
        });
    }
});

router.get('/:addressId', async (req, res) => {
    try {
        const address = await Address.findById(req.params.addressId, req.body);
        res.send(address);
    } catch (error) {
        res.status(500).send({
            message: 'Some error occurred while retrieving address with id ' + req.params.addressId
        });
    }
});

router.put('/:addressId', async (req, res) => {
    try {
        const address = await Address.findByIdAndUpdate(req.params.addressId, req.body, { new: true, runValidators: true });
        res.send(address);
    } catch (error) {
        return res.status(500).send({
            message: error.message ||  'Error updating address with id ' + req.params.addressId
        });
    }
});

router.delete('/:addressId', async (req, res) => {
    try {
        await Address.findByIdAndRemove(req.params.addressId, req.body);
        res.send({
            message: 'Address deleted successfully'
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Could not delete note with id ' + req.params.addressId
        });
    }
});

module.exports = router;