(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {
                //default route
                $urlRouterProvider.otherwise("/");

                //states

                $locationProvider.html5Mode(true);
            }]);
})(window);