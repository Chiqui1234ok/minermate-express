const { Schema, model } = require('mongoose');

const OfficeCostSch = new Schema(
    {
        officeID: {
            type: Schema.ObjectId,
            required: true
        },
        type: { // Accept values like 'electricity', 'rental'
            type: String,
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
        pending: { // This value contains pending payment: amount - payments[]
            type: Number,
            default: this.amount
        },
        receipt: { // Ex: Photo of electricity's receipt
            type: String,
            default: '#'
        },
        payments: [{ // All payments submitted by each miner goes here
            investmentID: {
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
            tx: { // Payment's receipt
                type: String,
                default: '#'
            }
        }]
    }
)

module.exports = model('OfficeCost', OfficeCostSch, 'officeCost');