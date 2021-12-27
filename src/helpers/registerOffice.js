const   helpers = {},
        Office = require('../models/Office');

helpers.registerOffice = async function(name) {
    try {
        const office = new Office({
            name: name
        });
        await office.save();
        return office;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;