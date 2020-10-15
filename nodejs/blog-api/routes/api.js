var express = require('express');
var router = express.Router();

const { user_list } = require('../controllers/userController');
const userRouter = require('../routes/users');

router.get('/', function(req, res, next) {
    res.json({ message: 'Default API response' });
});

router.get('/users', user_list);
router.use('/user', userRouter);

module.exports = router;
