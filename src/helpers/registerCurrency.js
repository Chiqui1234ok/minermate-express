const   helpers = {},
        Currency = require('../models/Currency');

helpers.registerCurrency = async function(data) {
    try {
        const currency = new Currency({
            name: data.name,
            price: data.price,
            symbol: data.symbol
        });
        await currency.save();
        return currency;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
};

module.exports = helpers;