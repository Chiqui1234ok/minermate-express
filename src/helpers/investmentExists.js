const   helpers = {},
        Investment = require('../models/Investment');

helpers.investmentExists = async function(name) {
    // If no investment finded, the fx() returns 'null'
    // That's because I created the condition below
    const investment = await Investment.findOne({name: name});
    console.log(investment);
    return investment && investment._id ? true : false;
}

module.exports = helpers;