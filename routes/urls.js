var express = require('express');
var router = express.Router();
var randomUrlUtil = require('../utils/random-url');
var https = require('https');

var Url = require('../models/url');

function checkOriginURL (originUrl, callback) {
    https.get(originUrl, function (res) {
        console.log('statusCode:', res.statusCode);
        if (res.statusCode.toString()[0] == '2' || res.statusCode.toString()[0] == '3') {
            checkExistOriginURL(originUrl, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback();
                }
            });
        } else {
            callback({success: false, msg: 'origin URL is not reachable'})
        }
    }).on('error', function (e) {
        console.error(e);
        callback({success: false, msg: e})
    });
}

function checkExistOriginURL (originUrl, callback) {
    Url.findByOriginUrl(originUrl, function (err, res) {
        if (!err && !res) {
            callback();
        } else if (err) {
            callback({success: false, msg: err});
        } else if (res) {
            callback({success: false, msg: 'This origin URL already exists'});
        }

    });
}

function checkShortUrl (shortUrl, callback) {
    Url.findByShortUrl(shortUrl, function (err, res) {
        if (!err && !res) {
            callback();
        } else if (err) {
            callback({success: false, msg: err});
        } else if (res) {
            callback({success: false, msg: 'This short URL already exists'});
        }
    })
}

/* POST create short url. */
router.post('/create', function(req, res) {

    // check url if exists
    checkOriginURL(req.body.originUrl, function (err) {

        var shortUrl;

        if (err) {
            return res.json(err);
        }

        // check if user set a desired url
        if (req.body.shortUrl) {
            shortUrl = req.body.shortUrl;
        } else {
            // generate short url
            shortUrl = randomUrlUtil.generate(10);
        }

        checkShortUrl(shortUrl, function (err) {

            if (err) {
                return res.json(err);
            }

            var newUrlPair = new Url({
                shortUrl: shortUrl,
                originUrl: req.body.originUrl
            });

            Url.addUrlPair(newUrlPair, function (err, urlPair) {
                if (err) {
                    res.json({success: false, msg: 'Failed to create a URL pair', real: err});
                } else {
                    res.json({success: true, msg: 'URL pair added', shortUrl: urlPair.shortUrl});
                }
            });

        });

    });

});

module.exports = router;
