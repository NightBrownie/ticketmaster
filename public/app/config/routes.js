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
                    pageTitle: 'User Profile | Manage your account and get actual information',
                    accessLevel: accessLevels.accessLevels.authenticated
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
                    abstract: true,
                    views: {
                        'main-content-view': {
                            templateUrl: '/app/views/adminPanel.html'
                        }
                    }
                }).state('main.adminPanel.films', {
                    url: '/adminpanel/films',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.films.html'
                        }
                    },
                    pageTitle: 'Admin panel | Add new films, edit or delete the old ones',
                    accessLevel: accessLevels.accessLevels.administrator
                }).state('main.adminPanel.film', {
                    url: '/adminpanel/film/:id',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.film.html'
                        }
                    },
                    pageTitle: 'Admin panel | Edit film data',
                    accessLevel: accessLevels.accessLevels.administrator
                }).state('main.adminPanel.theaters', {
                    url: '/adminpanel/theaters',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.theaters.html'
                        }
                    },
                    pageTitle: 'Admin panel | Add new theaters, edit or delete the old ones',
                    accessLevel: accessLevels.accessLevels.administrator
                }).state('main.adminPanel.theater', {
                    url: '/adminpanel/theater/:id',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.theater.html'
                        }
                    },
                    pageTitle: 'Admin panel | Edit theater data',
                    accessLevel: accessLevels.accessLevels.administrator
                }).state('main.adminPanel.events', {
                    url: '/adminpanel/events',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.events.html'
                        }
                    },
                    pageTitle: 'Admin panel | Add new events, edit or delete the old ones',
                    accessLevel: accessLevels.accessLevels.administrator
                }).state('main.adminPanel.event', {
                    url: '/adminpanel/event/:id',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.event.html'
                        }
                    },
                    pageTitle: 'Admin panel | Edit event data',
                    accessLevel: accessLevels.accessLevels.administrator
                }).state('main.adminPanel.users', {
                    url: '/adminpanel/users',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.users.html'
                        }
                    },
                    pageTitle: 'Admin panel | List or delete users',
                    accessLevel: accessLevels.accessLevels.administrator
                });

                $locationProvider.html5Mode(true);
            }])
        .run(['$rootScope', '$location', 'routingParameters', '$state', '$stateParams', 'customEvents', 'authService',
            'accessLevels',
            function($rootScope, $location, routingParameters, $state, $stateParams, customEvents, authService,
                     accessLevels) {
                //TODO: reload page after user data is loaded
                $rootScope.$broadcast(customEvents.authEvents.userInfoNotFound);

                //TODO: probably replace with call of resolve method
                $rootScope.$on('$stateChangeStart', function(event, nextState, nextParams, prevState, prevParams) {
                    //check authentication ang authorization
                    if (nextState.accessLevel && !authService.isAuthorized(nextState.accessLevel)) {
                        //event.preventDefault();
                        return $rootScope.$broadcast(customEvents.authEvents.notAuthorized);
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
                    $state.go(routingParameters.defaultState);
                });
            }]);
})(window);