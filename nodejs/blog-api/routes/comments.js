var express = require('express');
var router = express.Router();

const commentController = require('../controllers/commentController');
const { validateUserIdInBody } = require('../helpers/middlewares');

router.get('/', commentController.comment_list);

router.post('/', validateUserIdInBody, commentController.comment_create);
router.get('/:id', commentController.comment_detail);
router.put('/:id', commentController.comment_update);
router.delete('/:id', commentController.comment_delete);

router.get('/:id/user', commentController.comment_user);
router.get('/:id/post', commentController.comment_post);

module.exports = router;