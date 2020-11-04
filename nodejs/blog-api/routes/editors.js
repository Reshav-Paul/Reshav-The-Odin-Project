var express = require('express');
var router = express.Router();

const editorController = require('../controllers/editorController');

router.get('/', editorController.editor_list);

router.post('/', editorController.editor_create);
router.get('/:id', editorController.editor_details);
router.put('/:id', editorController.editor_update);
router.delete('/:id', editorController.editor_delete);

router.get('/:id/posts', editorController.editor_posts);

module.exports = router;
