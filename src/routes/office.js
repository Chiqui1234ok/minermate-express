const   router = require('express').Router(),
        { registerOffice } = require('../helpers/registerOffice');

router.put('/office', async (req, res) => {
    let msg = '', office = null;
    msg += req.body.name ? '' : 'La oficina necesita un nombre. ';
    if(msg == '') {
        office = await registerOffice(req.body.name);
        msg += 'Oficina registrada correctamente. ';
    }
    res.send({
        success: office && office._id ? true : false,
        data: office,
        msg: msg
    });
});

module.exports = router;