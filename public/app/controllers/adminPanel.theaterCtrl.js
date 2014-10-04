(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .controller('adminPanel.theaterCtrl', ['$scope', '$stateParams', 'definitionsService', '$state', 'routingParameters',
                'validationRegularExpressions',
            function($scope, $stateParams, definitionsService, $state, routingParameters, validationRegularExpressions) {
                $scope.isBusy = true;
                $scope.newMainImageUrl = '';
                $scope.newImageUrl = '';
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
                            description: '',
                            subwayStationName: '',
                            onlineBookingSupported: false,
                            terminalPaymentSupported: false,
                            qrCodeReaderSupported: false,
                            barAllowed: false,
                            parkingAllowed: false,
                            address: {
                                city: '',
                                street: '',
                                houseNumb: ''
                            },
                            phoneNumber: '',
                            photos: [],
                            halls: []
                        };
                    }
                }, function(error) {
                    $state.go(routingParameters.defaultState);
                });

                //methods
                $scope.saveMainImageUrl = function(url) {
                    if (url && $scope.newMainImageUrlForm.$valid) {
                        $scope.entity.mainImageUrl = url;
                    }
                };

                $scope.addImage = function(image) {
                    if (image && $scope.addImageForm.$valid
                            && $scope.entity.photos.indexOf(image) === -1) {
                        $scope.entity.photos.push(image);

                        $scope.newImageUrl = '';
                    }
                };

                $scope.removeImage = function(image) {
                    if (image && $scope.entity.photos.indexOf(image) !== -1) {
                        $scope.entity.photos.splice($scope.entity.photos.indexOf(image), 1);
                    }
                };

                $scope.saveTheater = function(film) {
                    console.log('theater saved');
                };

                $scope.removeTheater = function(film) {
                    console.log('theater removed');
                };
            }]);
})(window);

