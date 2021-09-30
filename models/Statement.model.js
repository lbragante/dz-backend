const mongoose = require('mongoose');

const StatementSchema = mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    pointsUsed: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Statement', StatementSchema);
