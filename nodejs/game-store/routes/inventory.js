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
router.get('/category/:id/delete', category_controller.category_delete_get);
router.post('/category/:id/delete', category_controller.category_delete_post);

// Game Routes
router.get('/game/create', game_controller.game_create_get);
router.post('/game/create', game_controller.game_create_post);
router.get('/game/:id', game_controller.game_detail);
router.get('/game/:id/delete', game_controller.game_delete_get);
router.post('/game/:id/delete', game_controller.game_delete_post);

module.exports = router;