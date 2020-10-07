var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexController');
var membershipController = require('../controllers/membershipController');

router.get('/', indexController.index_get);

router.get('/login', indexController.login_get);
router.post('/login', indexController.login_post);
router.get('/logout', indexController.logout_get);

router.get('/signup', indexController.signup_get);
router.post('/signup', indexController.signup_post);

router.get('/membership', membershipController.membership_get);
router.post('/membership', membershipController.membership_post);

module.exports = router;
