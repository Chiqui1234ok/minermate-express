const { Schema, model } = require('mongoose');

const CurrencySch = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        symbol: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true // Generate createdAt + updatedAt's dates
    }
);

module.exports = model('Currency', CurrencySch);