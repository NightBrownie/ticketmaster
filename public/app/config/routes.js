(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'routingParameters',
            function($stateProvider, $urlRouterProvider, $locationProvider, routingParameters) {
                //default route
                $urlRouterProvider.otherwise(routingParameters.defaultRoute);

                //states
                $stateProvider.state('main', {
                    abstract: true,
                    views: {
                        'main-view': {
                            templateUrl: '/app/views/main.html',
                            controller: 'mainCtrl'
                        },
                        'user-menu-view': {
                            templateUrl: '/app/views/userMenu.html',
                            controller: 'userMenuCtrl'
                        }
                    }
                }).state('main.films', {
                    url: '/films',
                    views: {
                        'main-content-view': {
                            templateUrl: '/app/views/films.html',
                            controller: 'filmsCtrl'
                        }
                    },
                    pageTitle: 'Films | Watch catalogue of actual films'
                }).state('main.profile', {
                    url: '/profile',
                    views: {
                        'main-content-view': {
                            templateUrl: '/app/views/profile.html',
                            controller: 'profileCtrl'
                        }
                    },
                    pageTitle: 'User Profile | Manage your account and get actual information'
                }).state('main.schedule', {
                    url: '/schedule',
                    views: {
                        'main-content-view': {
                            templateUrl: '/app/views/schedule.html',
                            controller: 'scheduleCtrl'
                        }
                    },
                    pageTitle: 'Film schedule | Choose the film, theater and time you prefer'
                }).state('main.theaters', {
                    url: '/theaters',
                    views: {
                        'main-content-view': {
                            templateUrl: '/app/views/theaters.html',
                            controller: 'theatersCtrl'
                        }
                    },
                    pageTitle: 'Theaters | Choose the best place to go out'
                }).state('main.tickets', {
                    url: '/tickets',
                    views: {
                        'main-content-view': {
                            templateUrl: '/app/views/tickets.html',
                            controller: 'ticketsCtrl'
                        }
                    },
                    pageTitle: 'Buy tickets | Choose best price at best time'
                 });

                $locationProvider.html5Mode(true);
            }])
        .run(['$rootScope', '$location', 'routingParameters', '$state', '$stateParams', 'customEvents',
            function($rootScope, $location, routingParameters, $state, $stateParams, customEvents) {
                $rootScope.$on('$stateChangeStart', function(event, nextState, nextParams, prevState, prevParams) {
                    //check authentication ang authorization

                    //set page title
                    $rootScope.pageTitle = nextState.pageTitle || routingParameters.defaultPageTitle;
                });

                //logout success
                $rootScope.$on(customEvents.authEvents.logoutSuccess, function() {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: true,
                        notify: true
                    })
                });

                //TODO: check if current user is not presented but the token is, load user
            }]);
})(window);