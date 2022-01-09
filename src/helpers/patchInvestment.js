const   helpers = {},
        Investment = require('../models/Investment');

helpers.patchInvestment = async function(investmentName, data) {
    try {
        let investment = null;
        investment = await Investment.findOneAndUpdate({name: investmentName}, data, {new: true});
        return investment && investment._id ? investment : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
};

module.exports = helpers;