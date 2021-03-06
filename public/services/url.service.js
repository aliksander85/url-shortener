angular.module('urlShortener')
    .service('UrlService', [
        '$http',
        UrlService
    ]);

function UrlService($http) {
    var self = this;

    self.createUrl = function (data) {
        return $http.post('/urls/create', data);
    };

    self.getFullUrl = function (data) {
        return $http.get('/urls/getOrigin', { params: data});
    };

    return self;

}