const express = require('express');
const router = express.Router();
const { statementValidation } = require('../config/validations.config');
const Statement = require('../models/Statement.model');

router.post('/create', async (req, res) => {

    const { error } = statementValidation(req.body);

    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const statementSave = new Statement(req.body);

    try {
        const statement = await statementSave.save();
        res.send(statement);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while creating the Statement'
        });
    }

});

router.get('/all', async (req, res) => {
    try {
        const statement = await Statement.find().sort({ createdAt: -1 });
        res.send(statement);
    } catch (error) {
        res.status(500).send({
            message: error.message ||  'Some error occurred while retrieving statements'
        });
    }
});

router.get('/:statementId', async (req, res) => {
    try {
        const statement = await Statement.findById(req.params.statementId, req.body);
        res.send(statement);
    } catch (error) {
        res.status(500).send({
            message: 'Some error occurred while retrieving statement with id ' + req.params.statementId
        });
    }
});

router.put('/:statementId', async (req, res) => {
    try {
        const statement = await Statement.findByIdAndUpdate(req.params.statementId, req.body, { new: true, runValidators: true });
        res.send(statement);
    } catch (error) {
        return res.status(500).send({
            message: error.message ||  'Error updating statement with id ' + req.params.statementId
        });
    }
});

router.delete('/:statementId', async (req, res) => {
    try {
        await Statement.findByIdAndRemove(req.params.statementId, req.body);
        res.send({
            message: 'Statement deleted successfully'
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Could not delete note with id ' + req.params.statementId
        });
    }
});

module.exports = router;