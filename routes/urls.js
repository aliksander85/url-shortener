var express = require('express');
var router = express.Router();
var randomUrlUtil = require('../utils/random-url');
var request = require('request');

var Url = require('../models/url');

function checkOriginURL (originUrl, callback) {

    request(originUrl, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        if (error) {
            return callback({error: true, msg: 'origin URL is not reachable'});
        }

        if (response && response.statusCode.toString()[0] && (response.statusCode.toString()[0] == '2' || response.statusCode.toString()[0] == '3')) {
            checkExistOriginURL(originUrl, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback();
                }
            });
        } else {
            callback({error: true, msg: 'origin URL is not reachable'})
        }

    });

}

function checkExistOriginURL (originUrl, callback) {
    Url.findByOriginUrl(originUrl, function (err, res) {
        if (!err && !res) {
            callback();
        } else if (err) {
            callback({error: true, msg: err});
        } else if (res) {
            callback({error: true, msg: 'This origin URL is already exists'});
        }

    });
}

function checkShortUrl (shortUrl, callback) {
    Url.findByShortUrl(shortUrl, function (err, res) {
        if (!err && !res) {
            callback();
        } else if (err) {
            callback({error: true, msg: err});
        } else if (res) {
            callback({error: true, msg: 'This short URL already exists'});
        }
    })
}

function getItemByShortUrl (shortUrl, callback) {
    Url.findByShortUrl(shortUrl, function (err, res) {
        if (!err && !res) {
            callback();
        } else if (err) {
            callback(null, {error: true, msg: err});
        } else if (res) {
            callback(res);
        }
    })
}

/* POST create short url. */
router.post('/create', function(req, res) {

    var originUrl = req.body.originUrl.toString();

    // check url if exists
    checkOriginURL(originUrl, function (err) {

        var shortUrl;

        if (err) {
            return res.status(500).send(err);
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
                return res.status(500).send(err);
            }

            var newUrlPair = new Url({
                shortUrl: shortUrl,
                originUrl: originUrl
            });

            Url.addUrlPair(newUrlPair, function (err, urlPair) {
                if (err) {
                    res.status(500).send({error: true, msg: 'Failed to create a URL pair', real: err});
                } else {
                    res.status(200).send({success: true, msg: 'URL pair added', shortUrl: urlPair.shortUrl});
                }
            });

        });

    });

});

router.get('/getOrigin', function (req, res) {
    var shortUrl = req.query.shortUrl.toString();

    getItemByShortUrl(shortUrl, function (data, error) {
        if (error) {
            res.status(500).send(error);
        }
        if (!data) {
            res.status(404).send({msg: 'URL not found'})
        }
        res.status(200).send(data);
    });
});

module.exports = router;
