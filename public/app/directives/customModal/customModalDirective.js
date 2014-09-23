(function(window, undefined) {
    'use strict';

    angular.module('directives')
        .controller('customModalCtrl', ['$scope', function($scope) {
            $scope.hideModal = function(e) {
                $scope.show = false;
            };
        }]).directive('customModal', function() {
            return {
                restrict: 'EA',
                templateUrl: '/app/directives/customModal/views/customModal.html',
                transclude: true,
                scope: {
                    show: '='
                },
                controller: 'customModalCtrl'
            };
        });
})(window);