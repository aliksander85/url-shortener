var express = require('express');
var router = express.Router();
var Url = require('../models/url');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'URL Shortener' });
});

/*GET */
router.get('/:shortUrl', function (req, res) {
  Url.findByShortUrl(req.params.shortUrl, function (err, result) {
      if (err) {
          res.render('index', { title: 'URL Shortener' });
      }
      res.redirect(301, result.originUrl);
  });
});

module.exports = router;
