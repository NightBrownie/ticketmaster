(function(window, undefined){
    'use strict';

    angular.module('ticket-master')
        .controller('adminPanel.theatersCtrl', ['$scope', 'endpointListService',
            function($scope, endpointListService) {
                $scope.endpointListService = endpointListService;
            }]);
})(window);