const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSch = new Schema(
    {
        name: String,
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            default: 'http://minermate.net/assets/img/icon/user-default.webp'
        },
        rol: { // 1 Admin, 2 Mod, 3 Investor, 4 Guest
            type: Number,
            required: true
        },
        tyc: { // '#' is false, an URL is true
            type: String,
            default: '#'
        },
        balance: [{
            amount: {
                type: Number,
                default: 0
            },
            symbol: {
                type: String,
                required: true
            }
        }]
    },
    {
        timestamps: true // Generate createdAt + updatedAt's dates
    }
);

UserSch.methods.encryptPassword = async (password) => {
    // '20' is salt's value passes
    return bcryptjs.hash(password, 10);
};

UserSch.methods.checkPassword = async function (password) {
    // 'this.password' is hashed password on DB 
    return bcryptjs.compare(password, this.password);
};

module.exports = model('User', UserSch);