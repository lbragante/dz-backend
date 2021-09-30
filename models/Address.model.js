const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    zip: {
        type: String,
        max: 8,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    complement: {
        type: String,
        required: false
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum : ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
        uppercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Address', AddressSchema);
