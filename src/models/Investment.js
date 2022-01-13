const { Schema, model } = require('mongoose');

const InvestmentSch = new Schema(
    {
        officeID: {
            type: Schema.ObjectId,
            required: true
        },
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
        availableBalance: [ // Balance (discounting debts)
            {
                amount: {
                    type: Number,
                    default: 0
                },
                symbol: {
                    type: String,
                    required: true
                }
            }
        ],
        thumbnail: {
            type: String,
            default: 'https://minermate.net/assets/img/investments/default-mining-rig-mobile.webp'
        },
        // For stats purpose
        // Sería bueno indicar el la fecha de creación y capital inicial para contrastarlo con lo minado en total
        // Y compararlo con holdear cripto en esa misma época, para ver qué inversión terminó ganando
        totalMined: [
            {
                amount: {
                    type: Number,
                    default: 0
                },
                symbol: {
                    type: String,
                    required: true
                },
                tx: { // Link to wallet, just as receipt for visitors
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true // Generate createdAt + updatedAt's dates
    }
);

module.exports = model('Investment', InvestmentSch);