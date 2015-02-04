var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.set('Cache-Control', 'max-age=3600, public');
  res.json({
    counter: req.cookies.counter || 0
  });
});

router.post('/', function(req, res, next) {
  var counter = parseInt(req.cookies.counter, 10) || 0;
  res.cookie('counter', counter + 1);
  res.json({
    status: 'success'
  });
});

module.exports = router;
