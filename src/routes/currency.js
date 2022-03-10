const   router = require('express').Router(),
        { getCurrency } = require('../helpers/getCurrency');


router.route('/currency/:symbol')
.get(async (req, res) => {
    let msg = '', currency = null,
        now = new Date();

    // Check input
    msg += req.params.symbol && req.params.symbol.length >= 3 ? '' : 'Indicá una criptomoneda válida. ';

    if(msg == '') {
        currency = await currencyExists(req.params.symbol);
        if(currency) {
            const dateDifference = now - currency.updatedAt;
            if(dateDifference >= 3600000) {
                // 3600000 = 1 hora
                currency = await patchCurrency(req.params.symbol);
            }            
        } else {
            currency = await getCurrency(req.params.symbol);
        }
    
    }
    

    res.send({
        success: true,
        data: currency,
        msg: msg 
    })
});

module.exports = router;