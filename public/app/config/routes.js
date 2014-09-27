(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'routingParameters', 'accessLevels',
            function($stateProvider, $urlRouterProvider, $locationProvider, routingParameters, accessLevels) {
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
                }).state('main.adminPanel', {
                    url: '/adminpanel',
                    views: {
                        'main-content-view': {
                            templateUrl: '/app/views/adminPanel.html',
                            controller: 'adminPanelCtrl'
                        }
                    },
                    pageTitle: 'Admin panel | Add new films or theaters, manage the old ones',
                    accessLevel: accessLevels.accessLevels.administrator
            });

                $locationProvider.html5Mode(true);
            }])
        .run(['$rootScope', '$location', 'routingParameters', '$state', '$stateParams', 'customEvents', 'authService',
            'accessLevels',
            function($rootScope, $location, routingParameters, $state, $stateParams, customEvents, authService,
                     accessLevels) {
                $rootScope.$on('$stateChangeStart', function(event, nextState, nextParams, prevState, prevParams) {
                    //check authentication ang authorization
                    if (nextState.accessLevel && !authService.isAuthorized(nextState.accessLevel)) {
                        $rootScope.$broadcast(customEvents.authEvents.notAuthorized);
                    }

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

                $rootScope.$on(customEvents.authEvents.notAuthorized, function() {
                    $location.path(routingParameters.defaultRoute);
                });

                $rootScope.$broadcast(customEvents.authEvents.userInfoNotFound);
            }]);
})(window);