const { Schema, model } = require('mongoose');

const WalletSch = new Schema(
    {
        userId: {
            type: Schema.ObjectId,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        network: {
            type: String,
            required: true
        },
        symbol: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true // Generate createdAt + updatedAt's dates
    }
)

module.exports = model('Wallet', WalletSch);