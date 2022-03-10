const   helpers = {},
        Currency = require('../models/Currency'),
        axios = require('axios');

helpers.getCurrency = async function(symbol) {
    try {
        axios.get('https://data.messari.io/api/v1/assets/btc/metrics')
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        })
    }
    catch(err) {
        console.warm(err);
        return false;
    }
}
//''

module.exports = helpers;