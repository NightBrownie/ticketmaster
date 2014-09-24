(function(window, undefined) {
    'use strict';

    angular.module('directives')
        .controller('loginFormCtrl', ['$scope', '$http', 'endpointListService', function($scope, $http, endpointListService) {
            //tabs logic
            $scope.activeTabName = 'signin';
            $scope.activateTab = function(tabName) {
                $scope.activeTabName = tabName;
            };
            $scope.isActiveTab = function(tabName) {
                return $scope.activeTabName === tabName;
            };

            //login logic
            $scope.loginUser = {
                username: '',
                password: ''
            };

            $scope.loginSubmit = function(user) {
                var endpoint = endpointListService.loginUser(user);
                $http(endpoint)
                    .success(function(data, status) {
                        console.log('logged in');
                    })
                    .error(function(data, status) {
                        console.log('an error occurred');
                    });
            };

            //register logic
            $scope.registerUser = {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            };

            $scope.registerSubmit = function(user) {
                var endpoint = endpointListService.registerUser(user);
                $http(endpoint)
                    .success(function(data, status) {
                        console.log('registered');
                    })
                    .error(function(data, status) {
                        console.log('an error occurred');
                    });
            };
        }]).directive('loginForm', [function() {
            return {
                restrict: 'EA',
                templateUrl: '/app/directives/loginForm/views/loginForm.html',
                controller: 'loginFormCtrl'
            };
        }]);
})(window);
