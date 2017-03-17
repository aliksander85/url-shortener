var mongoose = require('mongoose');
var config = require('../config/database');

// Url Schema
var UrlSchema = mongoose.Schema({
    shortUrl: String,
    originUrl: String
});

var Url = module.exports = mongoose.model('Url', UrlSchema);

// Url Methods
module.exports.addUrlPair = function (newUrlPair, callback) {
    newUrlPair.save(callback);
};

module.exports.findByShortUrl = function (shortUrl, callback) {
    var query = {shortUrl: shortUrl};
    Url.findOne(query, callback)
};

module.exports.findByOriginUrl = function (originUrl, callback) {
    var query = {originUrl: originUrl};
    Url.findOne(query, callback)
};