var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexController');

router.get('/', indexController.index_get);

router.get('/login', indexController.login_get);
router.post('/login', indexController.login_post);
router.get('/logout', indexController.logout_get);

router.get('/signup', indexController.signup_get);
router.post('/signup', indexController.signup_post);

module.exports = router;
