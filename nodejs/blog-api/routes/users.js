var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.user_list);

router.post('/', userController.user_create);
router.get('/:id', userController.user_details);
router.put('/:id', userController.user_update);
router.delete('/:id', userController.user_delete);

router.get('/:id/comments', userController.user_comments);

module.exports = router;
