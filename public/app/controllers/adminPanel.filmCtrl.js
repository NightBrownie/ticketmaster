(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .controller('adminPanel.filmCtrl', ['$scope', '$stateParams', 'definitionsService', '$state', 'routingParameters',
                'validationRegularExpressions',
            function($scope, $stateParams, definitionsService, $state, routingParameters, validationRegularExpressions) {
                $scope.isBusy = true;
                $scope.newCoverImageUrl = '';
                $scope.newActorName = '';
                $scope.newFrameUrl = '';
                $scope.validationRegularExpressions = validationRegularExpressions;

                var filmId = $stateParams.id;

                definitionsService.getDefinitions().then(function(definitions) {
                    $scope.definitions = definitions;

                    //check for id and decide if it is a new entity creation or existing entity editing
                    if (filmId) {
                        //call $http service to get filmInfo
                    } else  {
                        $scope.isBusy = false;

                        //get definitions and save them into scope variable

                        //set default entity structure
                        $scope.entity = {
                            name: '',
                            mainImageUrl: '',
                            frameUrls: [],
                            country: definitions.countriesSelectOptions[0],
                            year: definitions.filmProductionYearsSelectOptions[0],
                            length: {
                                hours: definitions.hoursSelectOptions[0],
                                minutes: definitions.minutesSelectOptions[0],
                                seconds: definitions.secondsSelectOptions[0]
                            },
                            genre: '',
                            director: '',
                            mainActors: [],
                            ageRestriction: definitions.ageRestrictionsSelectOptions[0]
                        };
                    }
                }, function(error) {
                    $state.go(routingParameters.defaultState);
                });

                //methods
                $scope.saveCoverImageUrl = function(url) {
                    if (url && $scope.updateMainImageUrlForm.$valid) {
                        $scope.entity.mainImageUrl = url;
                    }
                };

                $scope.addActor = function(actor) {
                    if (actor && $scope.addActorForm.$valid
                            && $scope.entity.mainActors.indexOf(actor) === -1) {
                        $scope.entity.mainActors.push(actor);
                    }
                };

                $scope.removeActor = function(actor) {
                    if (actor && $scope.entity.mainActors.indexOf(actor) !== -1) {
                        $scope.entity.mainActors.splice($scope.entity.mainActors.indexOf(actor), 1);
                    }
                };

                $scope.addFrameUrl = function(frameUrl) {
                    if (frameUrl && $scope.addFrameForm.$valid
                        && $scope.entity.frameUrls.indexOf(frameUrl) === -1) {
                        $scope.entity.frameUrls.push(frameUrl);
                    }
                };

                $scope.removeFrameUrl = function(frameUrl) {
                    if (frameUrl && $scope.entity.frameUrls.indexOf(frameUrl) !== -1) {
                        $scope.entity.frameUrls.splice($scope.entity.frameUrls.indexOf(frameUrl), 1);
                    }
                };

                $scope.saveFilm = function(film) {
                    console.log('film saved');
                };

                $scope.removeFilm = function(film) {
                    console.log('film removed');
                };
            }]);
})(window);

