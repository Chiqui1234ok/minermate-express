const   router = require('express').Router(),
        { getCurrency } = require('../helpers/getCurrency');


router.route('/currency/:symbol')
.get(async (req, res) => {
    let msg = '', currency = null;

    // Check imput
    msg += req.params.symbol && req.params.symbol.length >= 3 ? '' : 'Indicá una criptomoneda válida. ';

    if(msg == '') {

        currency = await getCurrency(req.params.symbol);
    }

    res.send({
        success: true,
        data: currency,
        msg: msg 
    })
});

module.exports = router;