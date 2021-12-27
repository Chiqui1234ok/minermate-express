const { Schema, model } = require('mongoose');

const WalletSch = new Schema(
    {
        userId: {
            type: Schema.ObjectId,
            required: true
        },
        direction: {
            type: String,
            required: true
        },
        network: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true // Generate createdAt + updatedAt's dates
    }
)

module.exports = model('Wallet', WalletSch);