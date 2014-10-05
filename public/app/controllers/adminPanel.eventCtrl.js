(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .controller('adminPanel.eventCtrl', ['$scope', '$stateParams', '$state', 'routingParameters',
            function($scope, $stateParams, $state, routingParameters) {
                $scope.isBusy = true;
                $scope.filmIds = [];
                $scope.theaterIds = [];
                $scope.hallIds = [];

                var eventId = $stateParams.id;

                //check for id and decide if it is a new entity creation or existing entity editing
                if (eventId) {
                    //call $http service to get filmInfo
                } else  {
                    $scope.isBusy = false;

                    //set default entity structure
                    $scope.entity = {
                        date: Date.now(),
                        filmId: null, //TODO: replace with load from list
                        theaterId: null, //TODO: replace with load from list
                        hallId: null //TODO: replace with load from list
                    };
                }

                //methods
                $scope.saveEvent = function(event) {
                    if ($scope.editEventForm.$valid) {
                        console.log('event saved');
                    }
                };

                $scope.removeEvent = function(event) {
                    console.log('event removed');
                };
            }]);
})(window);

