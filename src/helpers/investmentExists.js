const   helpers = {},
        Investment = require('../models/Investment');

helpers.investmentExists = async function(name) {
    // If no investment finded, the fx() returns 'null'
    // That's because I created the condition below
    try {
        const investment = await Investment.findOne({name: name});
        console.log(investment);
        return investment && investment._id ? true : false;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = helpers;