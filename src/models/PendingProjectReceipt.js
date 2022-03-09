const { Schema, model } = require('mongoose');

const PendingProjectReceiptSch = new Schema(
    {
        userID: {
            type: Schema.ObjectId,
            required: true
        },
        pendingProjectID: {
            type: Schema.ObjectId,
            required: true
        },
        receipt: { // Image of receipt
            type: String,
            required: false // TEMPORAL
        },
        amount: {
            type: Number,
            required: true
        },
        symbol: {
            type: String,
            default: 'USD'
        }
    },
    {
        timestamps: true // Generate createdAt + updatedAt's dates
    }
);

module.exports = model('PendingProjectReceipt', PendingProjectReceiptSch);