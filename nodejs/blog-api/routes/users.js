var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', authController.auth_jwt, userController.user_list);

router.post('/', userController.user_create);
router.get('/:id', authController.auth_jwt, userController.user_details);
router.put('/:id', authController.auth_jwt, userController.user_update);
router.delete('/:id', authController.auth_jwt, userController.user_delete);

router.get('/:id/comments', userController.user_comments);

module.exports = router;
