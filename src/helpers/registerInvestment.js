const   helpers = {},
        Investment = require('../models/Investment');

helpers.registerInvestment = async function(data) {
    try {
        const investment = new Investment({
            officeID: data.officeID,
            name: data.name,
            powerConsumption: data.powerConsumption,
            stockPrice: data.stockPrice,
            stockQuantity: data.stockQuantity && data.stockQuantity >= 100 ? data.stockQuantity : 100
        });
        await investment.save();
        return investment;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;