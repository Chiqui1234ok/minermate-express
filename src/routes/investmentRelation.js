const router = require('express').Router();

router.get('/investmentRelation', (req, res) => {
    res.send('investmentRelation/index');
});

module.exports = router;