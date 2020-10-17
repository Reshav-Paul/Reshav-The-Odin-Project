var express = require('express');
var router = express.Router();

const userRouter = require('../routes/users');

router.get('/', function(req, res, next) {
    res.json({ message: 'Default API response' });
});

router.use('/users', userRouter);

module.exports = router;
