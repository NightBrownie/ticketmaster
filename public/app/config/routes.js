(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'routingParameters',
            function($stateProvider, $urlRouterProvider, $locationProvider, routingParameters) {
                //default route
                $urlRouterProvider.otherwise(routingParameters.defaultRoute);

                //states
                $stateProvider.state('films', {
                    url: '/films',
                    views: {
                        'main-view': {
                            templateUrl: '/app/views/films.html',
                            controller: 'filmsCtrl'
                        }
                    },
                    pageTitle: 'Films | Watch catalogue of actual films'
                });

                $locationProvider.html5Mode(true);
            }])
        .run(['$rootScope', '$location', 'routingParameters', function($rootScope, $location, routingParameters) {
            $rootScope.$on('$stateChangeStart', function(event, nextState, nextParams, prevState, prevParams) {
                //check authentication ang authorization

                //set page title
                $rootScope.pageTitle = nextState.pageTitle || routingParameters.defaultPageTitle;
            });
        }]);
})(window);