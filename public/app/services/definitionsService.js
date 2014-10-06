(function(window, undefined) {
    'use strict';

    angular.module('services')
        .factory('definitionsService', ['$q', '$http', 'endpointListService',
            function($q, $http, endpointListService) {
                var definitions = null;
                var promise = null;

                return {
                    getDefinitions: function() {
                        if (promise) {
                            return promise;
                        }

                        var deferred = $q.defer();

                        if (!definitions) {
                            $http(endpointListService.getDefinitions())
                                .success(function (data, status) {
                                    definitions = data;
                                    deferred.resolve(definitions);
                                    promise = null;
                                })
                                .error(function (error, status) {
                                    deferred.reject(error);
                                    promise = null;
                                });

                            promise = deferred.promise
                        } else {
                            deferred.resolve(definitions);
                        }

                        return deferred.promise;
                    }
                };
            }]);
})(window);