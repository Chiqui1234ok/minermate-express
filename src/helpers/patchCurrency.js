const   helpers = {},
        Currency = require('../models/Currency');

helpers.patchCurrency = async function(symbol, data) {
    try {
        let currency = null;
        currency = await Currency.findOneAndUpdate({'symbol': symbol}, data, {new: true});
        return currency && currency._id ? currency : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;