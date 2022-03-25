const   router = require('express').Router(),
        { pendingProjectExists } = require('../helpers/pendingProjectExists'),
        { registerPendingProject } = require('../helpers/registerPendingProject'),
        { registerReceipt } = require('../helpers/registerReceipt'),
        { upload } = require('../helpers/upload.js');

router.route('/investment/receipt')
.get(async (req, res) => {
    let msg = '', placeholder = null;
    console.log(req.headers);
    res.send({
        success: true,
        data: placeholder,
        msg: msg
    });
})
.put(async (req, res) => {
    let msg = '', receipt = null;
    // Not necesary to check if receipt's duplicate

    // Check input
    msg += req.body.userID && req.body.userID.length == 24 ? '' : 'Es necesario vincular este comprobante con un usuario válido. ';
    msg += req.body.pendingProjectID && req.body.pendingProjectID.length == 24 ? '' : 'Favor de vincular este comprobante con un proyecto pendiente válido. ';
    msg += req.files.receipt ? '' : 'Falta adjuntar el comprobante. ';
    msg += req.body.amount && req.body.amount > 0 ? '' : 'Indica el monto pagado de este comprobante. ';
    msg += req.body.symbol && req.body.symbol.length >= 3 ? '' : 'Indicá el símbolo de tu moneda, ej: "USD", "BTC", "ETH", etc. ';

    if(msg == '') {
        receipt = await registerReceipt({
            userID: req.body.userID,
            pendingProjectID: req.body.pendingProjectID,
            // receipt: req.body.receipt,
            amount: req.body.amount,
            symbol: 'USD' // hard-coded
        });
        if(receipt) {
            msg += 'Comprobante registrado exitosamente. ';
            // upload helper :)
            msg += upload(uploadPath, req.files.receipt) ? 'La imágen del comprobante se registró correctamente. ' : 'La imágen no pudo subirse al servidor, por favor enviala por e-mail o WhatsApp. ';
        }
    }

    res.send({
        success: receipt ? true : false,
        data: receipt,
        msg: msg
    });
});

router.route('/investment/pending')
.get(async (req, res) => {
    let msg = '', investment = null;
    console.log(req.headers);
    res.send({
        success: true,
        data: investment,
        msg: msg
    });
})
.put(async (req, res) => {
    let msg = '', pendingProject = null;

    // Check if Pending project already exists 👇
    msg += await pendingProjectExists(req.body.name) ? 'Este proyecto pendiente ya fue creado. ' : '';

    // Check input 👇
    msg += (req.body.name && req.body.name.length > 5) ? '' : 'El nombre debe tener más de 5 caracteres. ';
    msg += (req.body.description && req.body.description.length >= 40) ? '' : 'La descripción debe contar con al menos 40 caracteres. ';
    msg += (req.body.stockPrice && req.body.stockPrice > 0) ? '' : 'El precio de acción debe ser un numérico positivo. ';
    
    if(msg == '') {
        pendingProject = await registerPendingProject({
            name: req.body.name,
            description: req.body.description,
            stockPrice: req.body.stockPrice,
            stockQuantity: req.body.stockQuantity,
            thumbnail: req.body.thumbnail
        });
        if(pendingProject)
            msg += 'Proyecto pendiente de financiación creado exitosamente. ';
    }

    res.send({
        success: pendingProject ? true : false,
        data: pendingProject,
        msg: msg
    });
});

router.route('/investment/pending/suscribe')
.put(async (req, res) => {
    
});

module.exports = router;