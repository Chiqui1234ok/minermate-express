const   router = require('express').Router(),
        { currencyExists } = require('../helpers/currencyExists'),
        { getCurrency } = require('../helpers/getCurrency'),
        { patchCurrency } = require('../helpers/patchCurrency'),
        { registerCurrency } = require('../helpers/registerCurrency');


router.route('/currency/:symbol')
.get(async (req, res) => {
    let msg = '', currency = null, now = new Date();

    // Check input
    msg += req.params.symbol && req.params.symbol.length >= 3 ? '' : 'Indicá una criptomoneda válida. ';

    if(msg == '') {
        // Get currency from DB (if exists) 👇
        currency = await currencyExists(req.params.symbol); 
        if(currency) {
            console.log('La criptomoneda está cacheada en la BD.');
            const dateDifference = now - currency.updatedAt;
            // If the difference between NOW and last update to DB is 1 hour or more
            if(dateDifference >= 3600000) {
                console.log('La criptomoneda tiene información vieja, se procede a actualizar.');
                // Update cryptocurrency data 👇
                currency = await patchCurrency({
                    name: currency.data.name,
                    price: currency.data.market_data.price_usd,
                    symbol: currency.data.symbol
                }, req.params.symbol); 
            }
        } else {
            console.log('La criptomoneda no existe, se incorpora a la BD gracias a la API.');
            // If the currency doesn't exists, fetch the API 👇
            currency = await getCurrency(req.params.symbol);
            // Then, register this currency into DB 👇
            currency = await registerCurrency({
                name: currency.data.name,
                price: currency.data.market_data.price_usd,
                symbol: currency.data.symbol
            });
        }
        // Check one more time for 'currency' var, just to print a nice msg
        if(currency) {
            msg += 'Criptomoneda actualizada correctamente. ';
        } else {
            msg += 'Hubo un error al consultar el precio de esta criptomoneda. ';
        }
    }
    

    res.send({
        success: currency ? true : false,
        data: currency,
        msg: msg 
    })
});

module.exports = router;