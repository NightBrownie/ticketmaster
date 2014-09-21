(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .config(['$interpolateProvider', function($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }]);
})(window);