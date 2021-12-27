const { Schema, model } = require('mongoose');

const InvestmentSch = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        powerConsumption: {
            type: Number,
            required: true
        },
        stockPrice: {
            type: Number,
            required: true
        },
        stockQuantity: {
            type: Number,
            default: 100
        },
        totalBalance: { // Total balance
            type: Number,
            default: 0
        },
        availableBalance: { // Balance (discounting debts)
            type: Number,
            default: 0
        },
        thumbnail: {
            type: String,
            default: 'https://minermate.net/assets/img/investments/default-mining-rig-mobile.webp'
        }
    },
    {
        timestamps: true // Generate createdAt + updatedAt's dates
    }
);

module.exports = model('Investment', InvestmentSch);