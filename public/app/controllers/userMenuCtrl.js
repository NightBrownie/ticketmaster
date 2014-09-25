(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .controller('userMenuCtrl', ['$scope', function($scope) {
            $scope.isLoginModalShown = false;

            $scope.showLoginModal = function() {
                $scope.isLoginModalShown = true;
            };

            $scope.hideLoginModal = function() {
                $scope.isLoginModalShown = false;
            }
        }]);
})(window);