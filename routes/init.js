var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  // send request to Firebase messaging


  // send response
  res.status(200).send('Done');
});


module.exports = router;