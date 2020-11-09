var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { validateUserIdInBody, validateUserIdInParam } = require('../helpers/middlewares');

router.get('/', authController.jwt_auth, userController.user_list);

router.post('/', userController.user_create);
router.get('/:id', authController.jwt_auth, userController.user_details);
router.put('/:id', authController.jwt_auth, validateUserIdInParam, userController.user_update);
router.delete('/:id', authController.jwt_auth, validateUserIdInParam, userController.user_delete);

router.get('/:id/comments', authController.jwt_auth, userController.user_comments);
router.post('/login', authController.user_login);

module.exports = router;
