const express = require('express');
const router = express.Router();
const { orderValidation } = require('../config/validations.config');
const Order = require('../models/Order.model');

router.post('/create', async (req, res) => {

    const { error } = orderValidation(req.body);

    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const orderSave = new Order(req.body);

    try {
        const order = await orderSave.save();
        res.send(order);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while creating the Order'
        });
    }

});

router.get('/all', async (req, res) => {
    try {
        const order = await Order.find().sort({ createdAt: -1 });
        res.send(order);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while retrieving orders'
        });
    }
});

router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId, req.body);
        res.send(order);
    } catch (error) {
        res.status(500).send({
            message: 'Some error occurred while retrieving order with id ' + req.params.orderId
        });
    }
});

router.put('/:orderId', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true, runValidators: true });
        res.send(order);
    } catch (error) {
        return res.status(500).send({
            message: error.message ||  'Error updating order with id ' + req.params.orderId
        });
    }
});

router.delete('/:orderId', async (req, res) => {
    try {
        await Order.findByIdAndRemove(req.params.orderId, req.body);
        res.send({
            message: 'Order deleted successfully'
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Could not delete note with id ' + req.params.orderId
        });
    }
});

module.exports = router;