(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .config(['$interpolateProvider', '$httpProvider',
            function($interpolateProvider, $httpProvider) {
                $httpProvider.interceptors.push('tokenInterceptor');
            }]);
})(window);