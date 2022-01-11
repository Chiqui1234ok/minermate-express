const   helpers = {},
        OfficeCost = require('../models/OfficeCost');
    
helpers.registerOfficeCost = async function(officeID, data) {
    try {
        const officeCost = new OfficeCost({
            officeID: officeID,
            type: data.type,
            amount: data.amount,
            symbol: data.symbol,
            receipt: data.receipt
        });
        await officeCost.save();
        return officeCost && officeCost._id ? officeCost : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
};

module.exports = helpers;