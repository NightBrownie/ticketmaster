(function(window, undefined) {
    'use strict';

    angular.module('directives')
        .controller('loginFormCtrl', ['$scope', function($scope) {
        }]).directive('loginForm', [function() {
            return {
                restrict: 'EA',
                templateUrl: '/app/directives/loginForm/views/loginForm.html',
                controller: 'loginFormCtrl'
            };
        }]);
})(window);
