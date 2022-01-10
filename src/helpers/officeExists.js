const   helpers = {},
        Office = require('../models/Office');

helpers.officeExists = async function(name) {
    try {
        let office = null;
        if(name)
            office = await Office.findOne({name: req.body.name});
        else
            office = await Office.find();
        return office;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}