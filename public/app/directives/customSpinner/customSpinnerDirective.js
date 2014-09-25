(function(window, undefined) {
    'use strict';

    angular.module('directives')
        .directive('customSpinner', function() {
            return {
                restrict: 'E',
                templateUrl: '/app/directives/customSpinner/views/customSpinner.html'
            };
        });
})(window);