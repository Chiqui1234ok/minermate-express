const { Schema, model } = require('mongoose');

const InvestmentCostSch = new Schema(
    {
        investmentId: {
            type: Schema.ObjectId,
            required: true
        },
        type: { // accept values like 'electricity', 'rental'
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        symbol: {
            type: Number,
            required: true
        },
        tx: { // If 'tx' value is '#', the payment is pending
            type: String,
            default: '#'
        }
    },
    {
        timestamps: true // Generate createdAt + updatedAt's dates
    }
);

module.exports = model('InvestmentCost', InvestmentCostSch);