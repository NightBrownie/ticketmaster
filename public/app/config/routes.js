(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'routingParameters', 'accessLevels',
            function($stateProvider, $urlRouterProvider, $locationProvider, routingParameters, accessLevels) {
                //default route
                $urlRouterProvider.otherwise(routingParameters.defaultRoute);

                var getCheckAuthForRouteFactory = function(accessLevel) {
                    return ['$q', 'accessLevels', 'authService', '$rootScope', '$state', '$stateParams', 'customEvents',
                        function($q, accessLevels, authService, $rootScope, $state, $stateParams, customEvents) {
                            var deferred = $q.defer();

                            authService.checkAuthorization(accessLevel)
                                .then(function(isAuthorized) {
                                    if (isAuthorized) {
                                        deferred.resolve(isAuthorized);
                                    } else {
                                        deferred.reject(isAuthorized);
                                        $state.go(routingParameters.defaultState);
                                        $rootScope.$broadcast(customEvents.authEvents.notAuthorized);
                                    }
                                }, function(error) {
                                    deferred.reject(error);
                                    $state.go(routingParameters.defaultState);
                                    $rootScope.$broadcast(customEvents.authEvents.notAuthorized);
                                });
        
                            return deferred.promise;
                        }];
                };

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
                    resolve: {
                        auth: getCheckAuthForRouteFactory(accessLevels.accessLevels.authenticated)
                    }
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
                            templateUrl: '/app/views/adminPanel.films.html',
                            controller: 'adminPanel.filmsCtrl'
                        }
                    },
                    pageTitle: 'Admin panel | Add new films, edit or delete the old ones',
                    resolve: {
                        auth: getCheckAuthForRouteFactory(accessLevels.accessLevels.administrator)
                    }
                }).state('main.adminPanel.film', {
                    url: '/adminpanel/film/:id',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.film.html',
                            controller: 'adminPanel.filmCtrl'
                        }
                    },
                    pageTitle: 'Admin panel | Edit film data',
                    resolve: {
                        auth: getCheckAuthForRouteFactory(accessLevels.accessLevels.administrator)
                    }
                }).state('main.adminPanel.theaters', {
                    url: '/adminpanel/theaters',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.theaters.html',
                            controller: 'adminPanel.theatersCtrl'
                        }
                    },
                    pageTitle: 'Admin panel | Add new theaters, edit or delete the old ones',
                    resolve: {
                        auth: getCheckAuthForRouteFactory(accessLevels.accessLevels.administrator)
                    }
                }).state('main.adminPanel.theater', {
                    url: '/adminpanel/theater/:id',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.theater.html',
                            controller: 'adminPanel.theaterCtrl'
                        }
                    },
                    pageTitle: 'Admin panel | Edit theater data',
                    resolve: {
                        auth: getCheckAuthForRouteFactory(accessLevels.accessLevels.administrator)
                    }
                }).state('main.adminPanel.events', {
                    url: '/adminpanel/events',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.events.html',
                            controller: 'adminPanel.eventsCtrl'
                        }
                    },
                    pageTitle: 'Admin panel | Add new events, edit or delete the old ones',
                    resolve: {
                        auth: getCheckAuthForRouteFactory(accessLevels.accessLevels.administrator)
                    }
                }).state('main.adminPanel.event', {
                    url: '/adminpanel/event/:id',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.event.html',
                            controller: 'adminPanel.eventCtrl'
                        }
                    },
                    pageTitle: 'Admin panel | Edit event data',
                    resolve: {
                        auth: getCheckAuthForRouteFactory(accessLevels.accessLevels.administrator)
                    }
                }).state('main.adminPanel.users', {
                    url: '/adminpanel/users',
                    views: {
                        'admin-panel-content-view': {
                            templateUrl: '/app/views/adminPanel.users.html',
                            controller: 'adminPanel.usersCtrl'
                        }
                    },
                    pageTitle: 'Admin panel | List or delete users',
                    resolve: {
                        auth: getCheckAuthForRouteFactory(accessLevels.accessLevels.administrator)
                    }
                });

                $locationProvider.html5Mode(true);
            }])
        .run(['$rootScope', '$location', 'routingParameters', '$state', '$stateParams', 'customEvents', 'authService',
            'accessLevels',
            function($rootScope, $location, routingParameters, $state, $stateParams, customEvents, authService,
                     accessLevels) {
                //TODO: reload page after user data is loaded
                $rootScope.$broadcast(customEvents.authEvents.userInfoNotFound);

                $rootScope.$on('$stateChangeStart', function(event, nextState, nextParams, prevState, prevParams) {
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