let express = require('express');
let router = express.Router();

let category_controller = require('../controllers/categoryController');

// Category Routes
router.get('/', category_controller.index);
router.get('/category/:id', category_controller.category_detail);

module.exports = router;