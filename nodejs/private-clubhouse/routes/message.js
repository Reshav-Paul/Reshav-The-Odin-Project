const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

router.get('/create', messageController.message_create_get);
router.post('/create', messageController.message_create_post);
router.get('/:id', messageController.message_detail);

module.exports = router;