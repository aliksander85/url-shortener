angular.module('urlShortener')
    .controller('MainController', [
        'UrlService',
        '$location',
        '$timeout',
        MainController
    ]);

function MainController(UrlService, $location, $timeout) {

    var self = this;
    self.generatedShortUrl = '';
    self.error = '';
    self.originUrl = '';
    self.absUrl = $location.absUrl();
    self.errorFullUrl = '';
    self.fullUrl = '';
    self.shortUrl = '';
    self.reg = /^[a-z0-9]+$/i;

    self.sendUrls = sendUrls;
    self.hideMessage = hideMessage;
    self.getOriginUrl = getOriginUrl;

    function sendUrls() {
        if (!angular.isString(self.originUrl) || !self.originUrl.length) {
            self.error = 'originUrl is required';
            self.hideMessage('error');
            return;
        }
        self.generatedShortUrl = '';
        self.error = '';

        UrlService.createUrl({originUrl: self.originUrl}).then(function (res) {
            self.generatedShortUrl = self.absUrl + res.data.shortUrl;
        }, function (err) {
            self.error = err.data.msg;
            self.hideMessage('error');
        });
    }

    function hideMessage (key) {
        $timeout(function () {
            self[key] = '';
        }, 2000);
    }

    function getOriginUrl () {
        if (!angular.isString(self.shortUrl) || !self.shortUrl.length) {
            self.errorFullUrl = 'shortUrl is required';
            self.hideMessage('errorFullUrl');
            return;
        }
        if (!self.reg.test(self.shortUrl)) {
            self.errorFullUrl = 'shortUrl is invalid';
            self.hideMessage('errorFullUrl');
            return;
        }
        self.fullUrl = '';
        self.errorFullUrl = '';

        UrlService.getFullUrl({shortUrl: self.shortUrl}).then(function (res) {
            self.fullUrl = res.data.originUrl;
        }, function (err) {
            self.errorFullUrl = err.data.msg;
            self.hideMessage('errorFullUrl');
        });
    }

}