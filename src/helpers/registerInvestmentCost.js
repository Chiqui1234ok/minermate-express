const   helpers = {},
        OfficeCost = require('../models/OfficeCost');

helpers.registerInvestmentCost = async function(officeCostID, data) {
    try {
        let cost = await OfficeCost.findById(officeCostID);
        cost.payments.push({
            investmentID: data.investmentID,
            amount: data.amount,
            symbol: data.symbol,
            tx: data.tx
        });
        await cost.save();
        return cost;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
};

module.exports = helpers;