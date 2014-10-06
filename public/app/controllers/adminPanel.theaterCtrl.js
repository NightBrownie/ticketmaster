(function(window, undefined) {
    'use strict';

    angular.module('ticket-master')
        .controller('adminPanel.theaterCtrl', ['$scope', '$stateParams', '$state', 'routingParameters',
                'validationRegularExpressions', 'endpointListService', '$http',
            function($scope, $stateParams, $state, routingParameters, validationRegularExpressions,
                    endpointListService, $http) {
                $scope.validationRegularExpressions = validationRegularExpressions;

                var HallTemplate = function() {
                    var self = this;

                    self.name = '';
                    self.rows = [];
                };

                var HallRowTemplate = function(rowNumber) {
                    var self = this;

                    self.seatsCount = 0;
                    self.rowNumber = rowNumber || 0;
                };

                $scope.isBusy = true;
                $scope.newMainImageUrl = '';
                $scope.newImageUrl = '';

                //hall editing vars
                $scope.currentEditingHall = null;
                $scope.newHallRow = new HallRowTemplate();

                $scope.entity = {};

                var defaultEntity = {
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

                var setDefaultFieldsValue = function() {
                    for (var property in defaultEntity) {
                        if ($scope.entity[property] == null) {
                            $scope.entity[property] = defaultEntity[property];
                        }
                    }
                };

                var theaterId = $stateParams.id;

                //check for id and decide if it is a new entity creation or existing entity editing
                if (theaterId) {
                    $http(endpointListService.getTheater(theaterId))
                        .success(function(data, status) {
                            $scope.entity = data;
                            setDefaultFieldsValue();
                            $scope.isBusy = false;
                        }).error(function(error, status) {
                            console.log('An error occurred during theater loading process: ' , error);
                            $state.go(routingParameters.adminPanelParams.theatersState);
                            $scope.isBusy = false;
                        });
                } else  {
                    $scope.isBusy = false;

                    //set default entity structure
                    setDefaultFieldsValue();
                }

                //methods
                $scope.saveMainImageUrl = function(url) {
                    if (url && $scope.newMainImageUrlForm.$valid) {
                        $scope.entity.mainImageUrl = url;
                        $scope.newMainImageUrl = '';
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

                $scope.moveRowUp = function(row) {
                    if (row && $scope.currentEditingHall.rows.indexOf(row) !== -1) {
                        for (var i = 0; i < $scope.currentEditingHall.rows.length; i++) {
                            if ($scope.currentEditingHall.rows[i].rowNumber == row.rowNumber - 1) {
                                $scope.currentEditingHall.rows[i].rowNumber = row.rowNumber;
                                row.rowNumber--;
                                $scope.currentEditingHall.rows.sort(function(a, b) {
                                    return a.rowNumber - b.rowNumber;
                                });
                                break;
                            }
                        }
                    }
                };

                $scope.moveRowDown = function(row) {
                    if (row && $scope.currentEditingHall.rows.indexOf(row) !== -1) {
                        for (var i = 0; i < $scope.currentEditingHall.rows.length; i++) {
                            if ($scope.currentEditingHall.rows[i].rowNumber == row.rowNumber + 1) {
                                $scope.currentEditingHall.rows[i].rowNumber = row.rowNumber;
                                row.rowNumber++;
                                $scope.currentEditingHall.rows.sort(function(a, b) {
                                    return a.rowNumber - b.rowNumber;
                                });
                                break;
                            }
                        }
                    }
                };

                $scope.addRow = function(row) {
                    if (row && $scope.addRowForm.$valid && row.seatsCount > 0) {
                        $scope.currentEditingHall.rows.push(row);
                        $scope.newHallRow = new HallRowTemplate();
                    }
                };

                $scope.removeRow = function(row) {
                    if (row && $scope.currentEditingHall.rows.indexOf(row) !== -1) {
                        $scope.currentEditingHall.rows.splice($scope.currentEditingHall.rows.indexOf(row), 1);
                        for (var i = 0; i < $scope.currentEditingHall.rows.length; i++) {
                            if ($scope.currentEditingHall.rows[i].rowNumber > row.rowNumber) {
                                --$scope.currentEditingHall.rows[i].rowNumber;
                            }
                        }
                    }
                };

                $scope.saveHall = function(hall) {
                    if ($scope.editHallForm.$valid && hall.name != '' && hall.rows.length > 0) {
                        if ($scope.entity.halls.indexOf(hall) === -1) {
                            $scope.entity.halls.push(hall);
                        }

                        $scope.currentEditingHall = null;
                    }
                };

                $scope.removeHall = function(hall) {
                    if (hall && $scope.entity.halls.indexOf(hall) !== -1) {
                        $scope.entity.halls.splice($scope.entity.halls.indexOf(hall), 1);
                    }
                };

                $scope.startEditHall = function(hall) {
                    if (hall && $scope.entity.halls.indexOf(hall) !== -1) {
                        $scope.currentEditingHall = hall;
                    }
                };

                $scope.addNewHall = function() {
                    $scope.currentEditingHall = new HallTemplate();
                };

                $scope.getSeatsCountForHall = function(hall) {
                    if (hall && hall.rows && hall.rows.length > 0) {
                        var seats = 0;

                        for (var i = 0; i < hall.rows.length; i++){
                            if (hall.rows[i].seatsCount) {
                                seats += hall.rows[i].seatsCount;
                            }
                        }

                        return seats;
                    }
                };

                $scope.saveTheater = function(theater) {
                    if ($scope.theaterEditForm.$valid) {
                        if ($scope.entity._id) {
                            $http(endpointListService.putTheater($scope.entity))
                                .success(function(data, status) {
                                    console.log('The theater data is saved'); //TODO: replace with toastr call
                                    $state.go(routingParameters.adminPanelParams.theatersState);
                                }).error(function(error, status) {
                                    console.log(error); //TODO: replace with toastr call
                                });
                        } else {
                            $http(endpointListService.postTheater($scope.entity))
                                .success(function(data, status) {
                                    console.log('The theater data is saved'); //TODO: replace with toastr call
                                    $state.go(routingParameters.adminPanelParams.theatersState);
                                }).error(function(error, status) {
                                    console.log(error); //TODO: replace with toastr call
                                });
                        }
                    }
                };

                $scope.removeTheater = function(theater) {
                    var entityId = theater._id;
                    if (!entityId) {
                        return;
                    }

                    if (entityId) {
                        $scope.isBusy = true;
                        var endpoint = endpointListService.deleteTheater(entityId);

                        if (!endpoint) {
                            $scope.isBusy = false;

                            //TODO: replace with toastr call to inform user about error
                            return console.log('Endpoint cannot be created');
                        }

                        $http(endpoint).success(function(data, status) {
                            $state.go(routingParameters.adminPanelParams.theatersState);
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

