const { Schema, model } = require('mongoose');

const InvestorSch = new Schema(
    {
        userID: {
            type: Schema.ObjectId,
            required: true
        },
        suscribedProject: [{
            projectID: {
                type: Schema.ObjectId,
                required: true
            },
            investment: // Is an array because I want at least one conversion from <ORIGINAL INVESTMENT'S SYMBOL> (ex: ETH) to another currency, like U$D or BTC
            [{ 
                amount: {
                    type: Number,
                    required: true
                },
                symbol: {
                    type: String,
                    required: true
                }
            }],
            stocks: {
                type: Number,
                required: true
            }
        }]
    }
);

module.exports = model('Investor', InvestorSch, 'investor');