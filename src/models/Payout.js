const { Schema, model } = require('mongoose');

const PayoutSch = new Schema(
    {
        userId: {
            type: Schema.ObjectId,
            required: true
        },
        investmentId: {
            type: Schema.ObjectId,
            required: true
        },
        walletId: {
            type: Schema.ObjectId,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        symbol: {
            type: String,
            required: true
        },
        tx: {
            type: String,
            default: '#'
        }
    },
    {
        timestamps: true // Generate createdAt + updatedAt's dates
    }
);

module.exports = model('Payout', PayoutSch, 'payout');