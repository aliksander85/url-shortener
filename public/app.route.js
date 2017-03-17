angular
    .module('urlShortener')
    .config(routerConfig);

function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}