const { Schema, model } = require('mongoose');

const OfficeSch = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
);

module.exports = model('Office', OfficeSch);