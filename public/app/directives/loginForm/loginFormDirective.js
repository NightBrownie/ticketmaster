(function(window, undefined) {
    'use strict';

    angular.module('directives')
        .controller('loginFormCtrl', ['$scope', 'authService', 'validationRegularExpressions', 'endpointListService',
            function($scope, authService, validationRegularExpressions, endpointListService) {
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

                $scope.isLoginFormBusy = false;

                $scope.loginSubmit = function(user) {
                    $scope.isLoginFormBusy = true;

                    if ($scope.loginForm.$valid) {
                        authService.login({username: user.username, password: user.password})
                            .then(function(result) {
                                $scope.loginUser.username = '';
                                $scope.loginUser.password = '';

                                $scope.loginForm.$setDirty(false);
                                $scope.loginForm.$setPristine();
                                $scope.isLoginFormBusy = false;

                                $scope.operationSuccessfulCallback();
                            },
                            function(result) {
                                $scope.loginUser.password = '';

                                $scope.isLoginFormBusy = false;
                            });
                    }
                };

                //register logic
                $scope.registerUser = {
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                };

                $scope.isRegisterFormBusy = false;

                $scope.registerSubmit = function(user) {
                    $scope.isRegisterFormBusy = true;

                    if ($scope.registerForm.$valid) {
                        authService.register(user)
                            .then(function(result) {
                                //then just try to login with new user
                                authService.login({username: user.username, password: user.password});

                                $scope.registerUser.username = '';
                                $scope.registerUser.email = '';
                                $scope.registerUser.password = '';
                                $scope.registerUser.confirmPassword = '';

                                $scope.registerForm.$setDirty(false);
                                $scope.registerForm.$setPristine();
                                $scope.isRegisterFormBusy = false;

                                $scope.operationSuccessfulCallback();
                            },
                            function(result) {
                                $scope.isRegisterFormBusy = false;
                            });
                    }
                };

                $scope.getCheckEmailEndpoint = function(email) {
                    return endpointListService.checkEmail(email);
                };

                $scope.getCheckUsernameEndpoint = function(username) {
                    return endpointListService.checkUsername(username);
                };
            }])
        .directive('loginForm', [function() {
            return {
                restrict: 'EA',
                templateUrl: '/app/directives/loginForm/views/loginForm.html',
                controller: 'loginFormCtrl',
                scope: {
                    operationSuccessfulCallback: '&'
                }
            };
        }]);
})(window);
