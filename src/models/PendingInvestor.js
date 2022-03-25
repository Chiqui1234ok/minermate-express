// Auspiciado por Emmanuel Sebastian Duarte VIDELA
const { Schema, model } = require('mongoose');

const PendingInvestorSch = new Schema(
    {
        userID: {
            type: Schema.ObjectId,
            required: true
        },
        intentionToPay: [{
            pendingProjectID: { // PendingProjectID, later on will be converted to project ID (when pending goes finale <3)
                type: Schema.ObjectId,
                required: true
            },
            stocks: {
                type: Number,
                required: true
            },
            paymentMethod: {
                type: String,
                required: true
            },
            // What cost has their stocks?
            amount: {
                type: Number,
                required: true
            },
            symbol: {
                type: String,
                default: 'USD'
            },
            //
            success: { // The user has been uploaded a receipt? YES|NO
                type: Boolean,
                default: false
            }
        }]
    }
);

module.exports = model('PendingInvestor', PendingInvestorSch, 'pendingInvestor');