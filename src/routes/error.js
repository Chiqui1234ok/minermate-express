const router = require('express').Router();

router.get('/error', (req, res) => {
    res.render('error/index');
});

module.exports = router;