(function(window, undefined) {
    'use strict';

    angular.module('directives')
        .directive('existanceValidator', ['$http', function($http) {
            return {
                require: 'ngModel',
                restrict: 'A',
                scope: {
                    existanceValidator: '&'
                },
                link: function(scope, element, attrs, ctrl) {
                    var previousValue = undefined;

                    scope.$watch(function() {
                            ctrl.$parsers.push(function (viewValue) {
                                if (viewValue && viewValue !== previousValue) {
                                    previousValue = viewValue;

                                    var endpoint = scope.existanceValidator();
                                    endpoint.data.value = viewValue;

                                    $http(endpoint)
                                        .success(function (result) {
                                            ctrl.$setValidity('existance', true);
                                        })
                                        .error(function (error, status) {
                                            ctrl.$setValidity('existance', false);
                                        });

                                    return viewValue;
                                }
                            });

                            return false;
                        },
                        function(currentValue) {
                            //listener is not used because we have to call server and set new value in promise callback
                        });
                }
            };
        }]);
})(window);