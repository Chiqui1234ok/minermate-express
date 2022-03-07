const { Schema, model } = require('mongoose');

const PendingProjectSch = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
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
        thumbnail: {
            type: String,
            default: 'https://minermate.net/assets/img/investments/default-mining-rig-mobile.webp'
        }
    },
    {
        timestamps: true // Generate createdAt + updatedAt's dates
    }
);

module.exports = model('PendingProject', PendingProjectSch);