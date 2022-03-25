const { Schema, model } = require('mongoose');

const PendingProjectReceiptSch = new Schema(
    {
        userID: {
            type: Schema.ObjectId,
            required: true
        },
        projectID: { // Pending project ID / Project ID
            type: Schema.ObjectId,
            required: true
        },
        receipt: { // Image of receipt
            type: String,
            default: '#'
        },
        stocksBought: { // Can be decimal in case the user won't buy all stocks in one payment
            type: Number,
            default: 0
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

module.exports = model('PendingProjectReceipt', PendingProjectReceiptSch, 'pendingProjectReceipt');