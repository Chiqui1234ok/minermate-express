const   helpers = {},
        Currency = require('../models/Currency'),
        axios = require('axios');

helpers.getCurrency = async function(symbol) {
    try {
        let result = await axios.get('https://data.messari.io/api/v1/assets/btc/metrics')
        .then(function (res) {
            //console.log(res);
            return res;
        })
        .catch(function (err) {
            console.log(err);
            return false;
        });
        console.log(result);
    }
    catch(err) {
        console.warm(err);
        return false;
    }
}
//''

module.exports = helpers;