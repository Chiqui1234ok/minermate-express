const   helpers = {},
        axios = require('axios');

helpers.getCurrency = async function(symbol) {
    try {
        let result = await axios.get(`https://data.messari.io/api/v1/assets/${symbol}/metrics`)
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            console.warn(err);
            return false;
        });
        return result;
    }
    catch(err) {
        console.warm(err);
        return false;
    }

}

//''

module.exports = helpers;