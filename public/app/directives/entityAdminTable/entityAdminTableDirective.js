(function(window, undefined) {
    'use strict';

    angular.module('directives')
        .controller('entityAdminTableCtrl', ['$scope', '$http',
            function($scope, $http) {
                $scope.entities = [];
                $scope.selectedEntitiesIds = [];
                $scope.entitiesCount = 0;
                $scope.currentPageNumber = 0;

                $scope.isBusy = true;

                var loadEntities = function() {
                    $scope.isBusy = true;

                    if(!$scope.getGetEntitiesEndpoint()){
                        return $scope.isBusy = false;
                    }

                    var skip = $scope.currentPageNumber * $scope.getEntitiesOnPageCount();
                    var limit = $scope.getEntitiesOnPageCount();
                    var endpoint = $scope.getGetEntitiesEndpoint()(skip, limit);

                    $http(endpoint).success(function(data, status) {
                        /*the data format should match:
                        * {
                        *   entitiesCount: someValue,
                        *   entities: [array of entities]
                        * }*/

                        $scope.entities = data.entities;
                        $scope.entitiesCount = data.entitiesCount;
                        $scope.isBusy = false;
                     }).error(function(error, status) {
                        //TODO: replace with toastr call
                        if (status === 500) {
                            console.log('An error occurred during entity list getting process: ', error);
                        }

                        $scope.isBusy = false;
                    });
                };

                //methods
                $scope.getEntitiesOnPageCount = function() {
                    return $scope.entitiesOnPageCount || 10;
                };

                $scope.unselectAll = function() {
                    $scope.selectedEntities = [];
                };
                $scope.selectAll = function() {
                    if (entityIdPath) {
                        for (var i = 0; i < $scope.entities.length; i++) {
                            var entityId = ($scope.entities[i])[entityIdPath];

                            if ($scope.selectedEntities.indexOf(entityId) === -1) {
                                $scope.selectedEntities.push(entityId);
                            }
                        }
                    }
                };

                $scope.selectEntity = function(entityId) {
                    if (entityId) {
                        if ($scope.selectedEntitiesIds.indexOf(entityId) === -1) {
                            $scope.selectedEntitiesIds.push(entityId);
                        } else {
                            $scope.selectedEntitiesIds.splice($scope.selectedEntitiesIds.indexOf(entityId), 1);
                        }
                    }
                };

                $scope.removeSelectedEntities = function() {
                    if ($scope.selectedEntitiesIds.length) {
                        for (var i = 0; i < $scope.selectedEntitiesIds.length; i++) {
                            $scope.removeEntity($scope.selectedEntitiesIds[i]);
                        }
                    }
                };

                $scope.removeEntity = function(entityId) {
                    if (entityId) {
                        var endpoint = getRemoveEntityEndpoint()(entityId);

                        if (!endpoint) {
                            //TODO: replace with toastr call to inform user about error
                            return console.log('Endpoint cannot be created');
                        }

                        $http(endpoint).success(function(data, status) {
                            loadEntities();
                        }).error(function(error, status) {
                            //TODO: replace with toastr call to inform user about error
                            if (status === 500) {
                                return console.log('An error occurred during deletion process: ', error);
                            }
                        });
                    }
                };

                $scope.getPagesCount = function() {
                    return Math.ceil($scope.entitiesCount/$scope.getEntitiesOnPageCount());
                };
                $scope.getPages = function() {
                    var pages = [];

                    for (var i = 0; i < $scope.getPagesCount(); i++) {
                        pages.push(i);
                    }

                    return pages;
                };

                $scope.goToPage = function(page) {
                    if (page > 0 && page < $scope.getPagesCount() && $scope.currentPageNumber !== page) {
                        $scope.currentPageNumber = page;
                        loadEntities();
                    }
                };

                $scope.goToNextPage = function() {
                    if ($scope.currentPageNumber < $scope.getPagesCount()) {
                        $scope.goToPage($scope.currentPageNumber + 1);
                    }
                };
                $scope.goToPreviousPage = function() {
                    if ($scope.currentPageNumber > 0) {
                        $scope.goToPage($scope.currentPageNumber - 1);
                    }
                };

                loadEntities();
            }])
        .directive('entityAdminTable', [function() {
                return {
                    restrict: 'EA',
                    templateUrl: '/app/directives/entityAdminTable/views/entityAdminTable.html',
                    controller: 'entityAdminTableCtrl',
                    scope: {
                        //endpoints settings
                        getGetEntitiesEndpoint: '&',
                        getRemoveEntityEndpoint: '&',

                        //links settings
                        //should have format: '/some/entity/{:id}'
                        getEditEntityState: '&',

                        //paging settings
                        entitiesOnPageCount: '=',

                        //entity options
                        entityIdPath: '@',
                        entityNamePath: '@',
                        isRemoveActionEnabled: '@',
                        isEntitySelectionEnabled: '@'
                    }
                };
            }]);
})(window);