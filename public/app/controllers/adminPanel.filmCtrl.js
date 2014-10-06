(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .controller('adminPanel.filmCtrl', ['$scope', '$stateParams', 'definitionsService', '$state', 'routingParameters',
                'validationRegularExpressions', 'endpointListService', '$http',
            function($scope, $stateParams, definitionsService, $state, routingParameters, validationRegularExpressions,
                    endpointListService, $http) {
                $scope.isBusy = true;
                $scope.newCoverImageUrl = '';
                $scope.newActorName = '';
                $scope.newFrameUrl = '';
                $scope.entity = {};
                $scope.validationRegularExpressions = validationRegularExpressions;

                var filmId = $stateParams.id;


                definitionsService.getDefinitions().then(function(definitions) {
                    $scope.definitions = definitions;

                    var defaultEntity = {
                        name: '',
                        description: '',
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

                    var setDefaultFieldsValue = function() {
                        for (var property in defaultEntity) {
                            if ($scope.entity[property] == null) {
                                $scope.entity[property] = defaultEntity[property];
                            }
                        }
                    };

                    //check for id and decide if it is a new entity creation or existing entity editing
                    if (filmId) {
                        $http(endpointListService.getFilm(filmId))
                            .success(function(data, status) {
                                $scope.entity = data;
                                setDefaultFieldsValue();
                                $scope.isBusy = false;
                            }).error(function(error, status) {
                                console.log('An error occurred during film loading process: ' , error);
                                $state.go(routingParameters.adminPanelParams.filmsState);
                                $scope.isBusy = false;
                            });
                    } else  {
                        $scope.isBusy = false;

                        //set default entity structure
                        setDefaultFieldsValue();
                    }
                }, function(error) {
                    $state.go(routingParameters.adminPanelParams.filmsState);
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

                        $scope.newActorName = '';
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

                        $scope.newFrameUrl = '';
                    }
                };

                $scope.removeFrameUrl = function(frameUrl) {
                    if (frameUrl && $scope.entity.frameUrls.indexOf(frameUrl) !== -1) {
                        $scope.entity.frameUrls.splice($scope.entity.frameUrls.indexOf(frameUrl), 1);
                    }
                };

                $scope.saveFilm = function(film) {
                    if ($scope.filmEditForm.$valid) {
                        if ($scope.entity._id) {
                            $http(endpointListService.putFilm($scope.entity))
                                .success(function(data, status) {
                                    console.log('The film data is saved'); //TODO: replace with toastr call
                                    $state.go(routingParameters.adminPanelParams.filmsState);
                                }).error(function(error, status) {
                                    console.log(error); //TODO: replace with toastr call
                                });
                        } else {
                            $http(endpointListService.postFilm($scope.entity))
                                .success(function(data, status) {
                                    console.log('The film data is saved'); //TODO: replace with toastr call
                                    $state.go(routingParameters.adminPanelParams.filmsState);
                                }).error(function(error, status) {
                                    console.log(error); //TODO: replace with toastr call
                                });
                        }
                    }
                };

                $scope.removeFilm = function(film) {
                    var entityId = film._id;
                    if (!entityId) {
                        return;
                    }

                    if (entityId) {
                        $scope.isBusy = true;
                        var endpoint = endpointListService.deleteFilm(entityId);

                        if (!endpoint) {
                            $scope.isBusy = false;

                            //TODO: replace with toastr call to inform user about error
                            return console.log('Endpoint cannot be created');
                        }

                        $http(endpoint).success(function(data, status) {
                            $state.go(routingParameters.adminPanelParams.filmsState);
                            $scope.isBusy = false;
                        }).error(function(error, status) {
                            $scope.isBusy = false;

                            //TODO: replace with toastr call to inform user about error
                            if (status === 500) {
                                return console.log('An error occurred during deletion process: ', error);
                            }
                        });
                    }
                };
            }]);
})(window);