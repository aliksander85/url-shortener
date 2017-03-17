var express = require('express');
var router = express.Router();

var Url = require('../models/url');

/* POST create short url. */
router.post('/create', function(req, res) {

    var newUrlPair = new Url({
        shortUrl: req.body.shortUrl,
        originUrl: req.body.originUrl
    });

    Url.addUrlPair(newUrlPair, function (err, urlPair) {
        if (err) {
            res.json({success: false, msg: 'Failed to create an url pair'});
        } else {
            res.json({success: true, msg: 'url pair added'});
        }
    });

});

module.exports = router;
