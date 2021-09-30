const express = require('express');
const router = express.Router();
const { productValidation } = require('../config/validations.config');
const Product = require('../models/Product.model');

router.post('/create', async (req, res) => {

    const { error } = productValidation(req.body);

    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const productSave = new Product(req.body);

    try {
        const product = await productSave.save();
        res.send(product);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while creating the Product'
        });
    }

});

router.get('/all', async (req, res) => {
    try {
        const product = await Product.find({ active: true }).sort({ createdAt: -1 });
        res.send(product);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while retrieving products'
        });
    }
});

router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId, req.body);
        res.send(product);
    } catch (error) {
        res.status(500).send({
            message: 'Some error occurred while retrieving product with id ' + req.params.productId
        });
    }
});

router.put('/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true });
        res.send(product);
    } catch (error) {
        return res.status(500).send({
            message: error.message ||  'Error updating product with id ' + req.params.productId
        });
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.productId, req.body);
        res.send({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Could not delete note with id ' + req.params.productId
        });
    }
});

module.exports = router;