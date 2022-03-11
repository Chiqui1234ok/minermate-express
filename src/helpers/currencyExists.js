const   helpers = {},
        Currency = require('../models/Currency');

helpers.currencyExists = async function(symbol) {
    try {
        // const currency = await Currency.findOne({"symbol": symbol});
        const currency = await Currency.find();
        return currency && currency._id ? currency : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;