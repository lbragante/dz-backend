const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    deliveryStatus: {
        type: String,
        required: true,
        enum : ['separacao','trajeto', 'entregue'],
        default: 'separacao'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
