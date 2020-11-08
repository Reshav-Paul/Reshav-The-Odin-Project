var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const editorRouter = require('./editors');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const authController = require('../controllers/authController');

router.get('/', function(req, res, next) {
    res.json({ message: 'Default API response' });
});

router.use('/users', userRouter);
router.use('/posts', postsRouter);
router.use('/editors', editorRouter);
router.post('/editors/login', authController.editor_login);
router.use('/comments', authController.jwt_auth, commentsRouter);

module.exports = router;
