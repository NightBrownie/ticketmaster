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
                }).state('profile', {
                    url: '/profile',
                    views: {
                        'main-view': {
                            templateUrl: '/app/views/profile.html',
                            controller: 'profileCtrl'
                        }
                    },
                    pageTitle: 'User Profile | Manage your account and get actual information'
                }).state('schedule', {
                    url: '/schedule',
                    views: {
                        'main-view': {
                            templateUrl: '/app/views/schedule.html',
                            controller: 'scheduleCtrl'
                        }
                    },
                    pageTitle: 'Film schedule | Choose the film, theater and time you prefer'
                }).state('theaters', {
                    url: '/theaters',
                    views: {
                        'main-view': {
                            templateUrl: '/app/views/theaters.html',
                            controller: 'theatersCtrl'
                        }
                    },
                    pageTitle: 'Theaters | Choose the best place to go out'
                }).state('tickets', {
                    url: '/tickets',
                    views: {
                        'main-view': {
                            templateUrl: '/app/views/tickets.html',
                            controller: 'ticketsCtrl'
                        }
                    },
                    pageTitle: 'Buy tickets | Choose best price at best time'
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