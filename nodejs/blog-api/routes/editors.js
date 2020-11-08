var express = require('express');
var router = express.Router();

const editorController = require('../controllers/editorController');
const authController = require('../controllers/authController');

router.get('/', authController.jwt_auth, editorController.editor_list);

router.post('/', editorController.editor_create);
router.get('/:id', authController.jwt_auth, editorController.editor_details);
router.put('/:id', authController.editor_jwt_auth, editorController.editor_update);
router.delete('/:id', authController.editor_jwt_auth, editorController.editor_delete);

router.get('/:id/posts', authController.jwt_auth, editorController.editor_posts);

module.exports = router;
