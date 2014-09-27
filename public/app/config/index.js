(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .config(['$interpolateProvider', '$httpProvider',
            function($interpolateProvider, $httpProvider) {
                $interpolateProvider.startSymbol('[[');
                $interpolateProvider.endSymbol(']]');

                $httpProvider.interceptors.push('tokenInterceptor');
            }]);
})(window);