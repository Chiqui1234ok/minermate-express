const   router = require('express').Router(),
        bcryptjs = require('bcryptjs'),
        { checkEmail } = require('../helpers/checkEmail'),
        { checkPassword } = require('../helpers/checkPassword'),
        { deleteUser } = require('../helpers/deleteUser'),
        { registerUser } = require('../helpers/registerUser'),
        { userExists } = require('../helpers/userExists');

router.route('/user')
.put(async function(req, res) {
    let msg = '', newUser = null;
    //
    // Check if user already exists 👇
    msg = await userExists(req.body.email) ? 'Este email ya fue registrado. ' : '';
    //
    // Check input 👇
    msg += checkEmail(req.body.email) ? '' : 'Tu email no es válido. ';
    msg += checkPassword(req.body.password) ? '' : 'Tu contraseña debe tener al menos 8 caracteres. ';
    //
    // If all valid, create user 👇
    if(msg == '') {
        const salt = bcryptjs.genSaltSync(10);
        newUser = await registerUser({
            email: req.body.email,
            password: req.body.password
            // password: bcryptjs.hashSync(req.body.password, salt)
        });
        msg += 'Usuario registrado correctamente. ';
    }
    res.send({
        success: newUser && newUser._id ? true : false,
        data: newUser,
        msg: msg
    });
})
.delete(async function (req, res) {
    let msg = '', user = null;
    // Check if user exists
    user = await userExists(req.body.email);
    msg = user && user._id ? '' : 'Este usuario no existe. ';
    if(msg == '') {
        user = await deleteUser(user._id);
        msg += user && user._id ? 'El usuario se eliminó correctamente. ' : 'El usuario no pudo eliminarse. ';
    }
    res.send({
        success: user && user._id ? true : false,
        data: user,
        msg: msg
    });
});

router.route('/user/login')
.post(async function (req, res) {
    let msg = '', data = {};
    let user = await userExists(req.body.email);
    if(user && user._id) {
        data.password = bcryptjs.compareSync(req.body.password, user.password);
        msg += user && data.password ? '' : 'La contraseña es incorrecta. '; // (user's input, password hashed in DB)
        if(msg == '') {
            data.email = req.session.email = user.email;
            data.password = req.session.password = user.password;
            await user.save();
            msg += 'Iniciaste sesión correctamente. ';
        }
    } else {
        msg += 'Este e-mail no está registrado. ';
    }
    res.send({
        success: user && user._id && data.password ? true : false,
        data: data,
        msg: msg
    })
});

router.route('/user/logout')
.post(async function (req, res) {
    let msg = '';
    const sessionBackup = req.session;
    req.session.destroy(err => {
        console.warn(err);
        msg += err;
    })
    res.send({
        success: msg == '' ? true : false,
        data: sessionBackup,
        msg: msg
    });
})

module.exports = router;