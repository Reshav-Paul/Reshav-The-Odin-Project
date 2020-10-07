var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/:id', userController.user_detail);

module.exports = router;
