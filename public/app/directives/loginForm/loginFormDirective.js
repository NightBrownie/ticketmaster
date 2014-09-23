(function(window, undefined) {
    'use strict';

    angular.module('directives')
        .controller('loginFormCtrl', ['$scope', function($scope) {
            //tabs logic
            $scope.activeTabName = 'signin';
            $scope.activateTab = function(tabName) {
                $scope.activeTabName = tabName;
            };
            $scope.isActiveTab = function(tabName) {
                return $scope.activeTabName === tabName;
            };
        }]).directive('loginForm', [function() {
            return {
                restrict: 'EA',
                templateUrl: '/app/directives/loginForm/views/loginForm.html',
                controller: 'loginFormCtrl'
            };
        }]);
})(window);
