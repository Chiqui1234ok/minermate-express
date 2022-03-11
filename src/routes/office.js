const { patchAvailableBalance } = require('../helpers/patchAvailableBalance');

const   router = require('express').Router(),
        OfficeCost = require('../models/OfficeCost'),
        { deleteOffice } = require('../helpers/deleteOffice'),
        { officeExists } = require('../helpers/officeExists'),
        { patchOffice } = require('../helpers/patchOffice'),
        { registerInvestmentCost } = require('../helpers/registerInvestmentCost'),
        { registerOffice } = require('../helpers/registerOffice'),
        { registerOfficeCost } = require('../helpers/registerOfficeCost');

router.route('/office')
.get(async (req, res) => {
    let msg = '', office = null;
    const offices = await officeExists();
    // Just a conditional for give better info to front-end user 👇
    const officeMsg = offices && offices.length > 1 ? `Se encontraron ${offices.length} oficinas. ` : `Se encontró 1 oficina. `;
    //
    msg += offices && offices.length > 0 ? officeMsg : 'No se encontraron oficinas registradas. ';
    res.send({
        success: msg.length == '' ? true : false,
        data: offices,
        msg: msg
    });
})
.put(async (req, res) => {
    let msg = '', office = null;

    // Check input 👇
    msg += req.body.name ? '' : 'La oficina necesita un nombre. ';
    msg += await officeExists(req.body.name) ? 'Esta oficina ya existe. ' : '';

    if(msg == '') {
        office = await registerOffice(req.body.name);
        if(office && office._id)
            msg += 'Oficina registrada correctamente. ';
    }
    res.send({
        success: office && office._id ? true : false,
        data: office,
        msg: msg
    });
})
.patch(async (req, res) => {
    let msg = '', office = null;
    msg += req.body.officeID ? '' : 'Indicá qué oficina editar. ';
    msg += req.body.newName ? '' : 'Indicá el nombre de la oficina. ';
    if(msg == '') {
        office = await patchOffice(req.body.officeID, {
            name: req.body.newName
        });
        if(office && office._id)
            msg += 'Oficina editada correctamente. ';
    }
    res.send({
        success: office && office._id ? true : false,
        data: office,
        msg: msg
    });
})
.delete(async (req, res) => {
    let msg = '', office = null;
    msg += req.body.officeName ? '' : 'Indicá qué oficina eliminar. ';
    if(msg == '') {
        office = await deleteOffice(req.body.officeName);
    }
    res.send({
        success: true,
        data: office,
        msg: msg
    });
});

// Office's cost

router.route('/office/cost') // Gets costs of one office
.get(async (req, res) => {
    let msg = '', office = null, officeCosts = null;
    office = await officeExists(req.body.officeName);
    msg += office && office._id ? '' : 'La oficina no existe. ';
    if(msg == '') {
        officeCosts = await OfficeCost.find({officeID: office._id});
        if(officeCosts && officeCosts.length > 0)
            msg += 'Se encontraron los gastos operativos de esta oficina. ';
        else
            msg += 'Esta oficina no tiene ningún gasto operativo. ';
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
    msg += req.body.officeName ? '' : 'Indica el nombre de la oficina. ';
    if(msg == '')
        office = await officeExists(req.body.officeName);
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
        if(cost && cost._id)
            msg += 'Gasto operativo registrado correctamente. ';
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
.patch(async (req, res) => { // Add a payment to one office's cost and link to investment
    let msg = '', officeCost = null, officeCostCounter = null, patchedBalance = null;
    // Check user's input 👇
    msg += req.body.investmentID ? '' : 'Indicá un proyecto válido. ';
    msg += req.body.amount && !isNaN(req.body.amount) ? '' : 'Indicá un monto válido. ';
    msg += req.body.symbol && req.body.symbol.length > 0 && req.body.symbol.length <= 5 ? '' : 'Indicá un símbolo de dinero válido (ej: USD, ETH, RVN, etc). ';
    
    // Count existent costs registered in this office, just to check if a new cost is submitted at end of this code.
    officeCostCounter = await OfficeCost.findById(req.body.officeCostID);
    officeCostCounter = officeCostCounter.payments.length;
    // Create new cost payed by investment/project 👇
    officeCost = await registerInvestmentCost(req.body.officeCostID, { // ID of OfficeCost passed from front-end
        investmentID: req.body.investmentID,
        amount: req.body.amount,
        symbol: req.body.symbol,
        tx: req.body.tx
    });
    // Update balance of that investment 👇
    patchedBalance = await patchAvailableBalance(req.body.investmentID, {
        amount: req.body.amount,
        symbol: req.body.symbol
    });
    res.send({
        success: officeCost.payments && officeCost.payments.length > officeCostCounter && patchedBalance ? true : false,
        data: officeCost,
        msg: msg 
    });
});

module.exports = router;