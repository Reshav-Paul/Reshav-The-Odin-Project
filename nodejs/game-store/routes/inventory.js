let express = require('express');
let router = express.Router();

let category_controller = require('../controllers/categoryController');
let game_controller = require('../controllers/gameController');

// Category Routes
router.get('/', category_controller.index);
router.get('/categories', category_controller.category_list);
router.get('/category/create', category_controller.category_create_get);
router.post('/category/create', category_controller.category_create_post);
router.get('/category/:id', category_controller.category_detail);

// Game Routes
router.get('/game/create', game_controller.game_create_get);
router.get('/game/:id', game_controller.game_detail);

module.exports = router;