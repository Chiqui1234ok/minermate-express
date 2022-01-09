const   router = require('express').Router(),
        OfficeCost = require('../models/OfficeCost'),
        { officeExists } = require('../helpers/officeExists'),
        { registerOffice } = require('../helpers/registerOffice'),
        { registerOfficeCost } = require('../helpers/registerOfficeCost');

router.route('/office')
.get(async (req, res) => {
    let msg = '', office = null;
    const offices = await officeExists();
    msg += offices & offices.length > 0 ? '' : 'No se encontraron oficinas registradas. ';
    res.send({
        success: msg.length == '' ? true : false,
        data: offices,
        msg: msg
    });
})
.put(async (req, res) => {
    let msg = '', office = null;
    msg += req.body.name ? '' : 'La oficina necesita un nombre. ';
    msg += await officeExists(req.body.name) ? 'Esta oficina ya existe. ' : '';
    if(msg == '') {
        office = await registerOffice(req.body.name);
        msg += 'Oficina registrada correctamente. ';
    }
    res.send({
        success: office && office._id ? true : false,
        data: office,
        msg: msg
    });
})
.delete(async (req, res) => {
    let msg = '', office = null;

});

router.route('/office/cost') // Gets costs of one office
.get(async (req, res) => {
    let msg = '', office = null, officeCosts = null;
    office = await officeExists(req.body.name);
    msg += office && office._id ? '' : 'La oficina no existe. ';
    if(msg == '') {
        officeCosts = await OfficeCost.find({officeID: office._id});
        msg += officeCosts && officeCosts._id ? '' : 'Esta oficina no tiene ningún gasto operativo. ';
    }
    res.send({
        success: msg == '' ? true : false,
        data: {
            office: office,
            cost: officeCosts
        },
        msg: msg
    });
})
.put(async (req, res) => { // Add a cost to one office
    let msg = '', office = null, cost = null;
    msg += req.body.name ? '' : 'Indica el nombre de la oficina. ';
    if(msg == '')
        office = await officeExists(req.body.name);
    msg += office && office._id ? '' : 'La oficina no existe. ';
    msg += req.body.type ? '' : 'Indica el tipo de gasto. ';
    msg += req.body.amount || req.body.symbol ? '' : 'Se precisa el monto del gasto, además de su símbolo (ejemplo: 1,5 ETH, 300 USD). ';
    msg += req.body.receipt ? '' : 'Es necesario un link a la factura. ';
    if(msg == '') {
        cost = await registerOfficeCost(office._id, {
            type: req.body.type,
            amount: req.body.amount,
            symbol: req.body.symbol,
            receipt: req.body.receipt
        });
    }
    res.send({
        success: office && office._id && cost && cost._id ? true : false,
        data: {
            office: office,
            cost: cost
        },
        msg: msg
    })
})
.patch(async (req, res) => { // Add a payment to one cost's office
    let msg = '', officeCost = null;
    let officeCostCounter = await OfficeCost.findById(req.body.officeCostID);
    officeCostCounter = officeCostCounter.payments.length;
    // ID of OfficeCost passed from front-end
    officeCost = await registerInvestmentCost(req.body.officeCostID, {
        investmentID: req.body.investmentID,
        amount: req.body.amount,
        symbol: req.body.symbol,
        tx: req.body.tx
    });
    res.send({
        success: officeCost.payments.length > officeCostCounter ? true : false,
        data: officeCost,
        msg: msg 
    });
});

module.exports = router;