var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Use /api endpoint for accessing the api' });
});

module.exports = router;
