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

    self.sendUrls = sendUrls;
    self.hideMessage = hideMessage;

    function sendUrls() {
        if (!angular.isString(self.originUrl) || !self.originUrl.length) {
            self.error = 'originUrl is required';
            self.hideMessage('error');
            return;
        }
        self.generatedShortUrl = '';
        self.error = '';

        UrlService.createUrl({originUrl: self.originUrl}).then(function (res) {
            self.generatedShortUrl = $location.absUrl() + res.data.shortUrl;
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

}