(function(window, undefined) {
    'use strict';

    angular.module('directives')
        .controller('loginFormCtrl', ['$scope', '$http', 'authService', 'validationRegularExpressions',
            function($scope, $http, authService, validationRegularExpressions) {
                //tabs logic
                $scope.activeTabName = 'signin';
                $scope.activateTab = function(tabName) {
                    $scope.activeTabName = tabName;
                };
                $scope.isActiveTab = function(tabName) {
                    return $scope.activeTabName === tabName;
                };

                $scope.validationRegularExpressions = validationRegularExpressions;

                //login logic
                $scope.loginUser = {
                    username: '',
                    password: ''
                };

                $scope.loginSubmit = function(user) {
                    authService.login({username: user.username, password: user.password})
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
                    authService.register(user)
                        .success(function(data, status) {
                            console.log('logged in');
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
