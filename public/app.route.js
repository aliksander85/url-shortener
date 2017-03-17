angular
    .module('urlShortener')
    .config(routerConfig);

function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });
    $urlRouterProvider.otherwise('/');
}