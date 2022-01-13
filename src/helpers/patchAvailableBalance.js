const   helpers = {},
        Investment = require('../models/Investment');

helpers.patchAvailableBalance = async function(investmentID, data) {
    try {
        // Get investment 👇
        let investment = await Investment.findById(investmentID);
        // Get desired balance 👇
        let availableBalance = investment.availableBalance.map(function(e) { return e.symbol; }).indexOf(data.symbol);
        // Update and save balance 👇
        availableBalance.amount += data.amount;
        investment.availableBalance = availableBalance;
        await investment.save();
        return investment;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
};

module.exports = helpers;