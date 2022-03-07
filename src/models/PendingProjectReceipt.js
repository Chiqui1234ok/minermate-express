const { Schema, model } = require('mongoose');

const PendingProjectReceiptSch = new Schema(
    {
        UserID: {
            type: Schema.ObjectId,
            required: true
        },
        receipt: { // Image of receipt
            type: String,
            required: true
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

module.exports = model('PendingProject', PendingProjectReceiptSch);