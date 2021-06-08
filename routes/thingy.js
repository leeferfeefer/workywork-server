

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Thingy home page');
});

router.get('/about', function(req, res) {
  res.send('About this thingy');
});

module.exports = router;