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
router.use('/posts', authController.auth_jwt, postsRouter);
router.use('/editors', authController.auth_jwt, editorRouter);
router.use('/comments', authController.auth_jwt, commentsRouter);
router.post('/login', authController.login);

module.exports = router;
