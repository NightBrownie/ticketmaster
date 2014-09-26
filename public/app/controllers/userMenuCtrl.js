(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .controller('userMenuCtrl', ['$scope', 'authService', 'accessLevels',
            function($scope, authService, accessLevels) {
                $scope.isLoginModalShown = false;

                $scope.accessLevels = accessLevels.accessLevels;

                $scope.showLoginModal = function() {
                    $scope.isLoginModalShown = true;
                };

                $scope.hideLoginModal = function() {
                    $scope.isLoginModalShown = false;
                };

                $scope.signOut = function() {
                    authService.logout();
                };
            }]);
})(window);