var express = require('express');
var router = express.Router();
var Url = require('../models/url');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'URL Shortener' });
});

/*GET */
router.get('/:shortUrl', function (req, res) {
    if (req.params && req.params.shortUrl && /^[a-z0-9]+$/i.test(req.params.shortUrl)) {
        Url.findByShortUrl(req.params.shortUrl, function (err, result) {
            if (err) {
                res.render('index', { title: 'URL Shortener' });
            }
            if (result && result.originUrl) {
                res.redirect(301, result.originUrl);
            } else {
                res.render('index', { title: 'URL Shortener' });
            }
        });
    } else {
        res.render('index', { title: 'URL Shortener' });
    }
});

module.exports = router;
