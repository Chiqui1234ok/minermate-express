const   helpers = {},
        Office = require('../models/Office');

helpers.officeExists = async function(name) {
    try {
        const office = await Office.findOne({name: name});
        return office && office._id ? office : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;