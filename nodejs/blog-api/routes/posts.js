var express = require('express');
var router = express.Router();

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

router.get('/', authController.jwt_auth, postController.all_posts_list);
router.get('/published', authController.jwt_auth, postController.published_posts_list);

router.post('/', authController.editor_jwt_auth, postController.post_create);
router.get('/:id', authController.jwt_auth, postController.post_detail);
router.put('/:id', authController.editor_jwt_auth, postController.post_update);
router.delete('/:id', authController.editor_jwt_auth, postController.post_delete);

router.get('/:id/comments', authController.jwt_auth, postController.post_comments);
router.get('/:id/editor', authController.jwt_auth, postController.post_editor);

module.exports = router;