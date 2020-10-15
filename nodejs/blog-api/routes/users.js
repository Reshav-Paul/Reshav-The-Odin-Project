var express = require('express');
var router = express.Router();

const User = require('../models/user');
const userController = require('../controllers/userController');

router.get('/:id', userController.user_details);

module.exports = router;
