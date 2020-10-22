var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const editorRouter = require('./editors');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');

router.get('/', function(req, res, next) {
    res.json({ message: 'Default API response' });
});

router.use('/users', userRouter);
router.use('/posts', postsRouter);
router.use('/editors', editorRouter);
router.use('/comments', commentsRouter);

module.exports = router;
