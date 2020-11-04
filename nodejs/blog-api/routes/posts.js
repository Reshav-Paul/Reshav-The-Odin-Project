var express = require('express');
var router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.all_posts_list);
router.get('/published', postController.published_posts_list);

router.post('/', postController.post_create);
router.get('/:id', postController.post_detail);
router.put('/:id', postController.post_update);
router.delete('/:id', postController.post_delete);

router.get('/:id/comments', postController.post_comments);
router.get('/:id/editor', postController.post_editor);

module.exports = router;