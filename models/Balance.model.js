const mongoose = require('mongoose');

const BalanceSchema = mongoose.Schema({
    points: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Balance', BalanceSchema);
