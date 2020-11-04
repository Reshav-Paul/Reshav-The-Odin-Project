var express = require('express');
var router = express.Router();

const commentController = require('../controllers/commentController');

router.get('/', commentController.comment_list);

router.post('/', commentController.comment_create);
router.get('/:id', commentController.comment_detail);
router.put('/:id', commentController.comment_update);
router.delete('/:id', commentController.comment_delete);

router.get('/:id/user', commentController.comment_user);
router.get('/:id/post', commentController.comment_post);

module.exports = router;