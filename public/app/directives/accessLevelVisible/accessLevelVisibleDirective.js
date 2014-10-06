(function(window, undefined) {
    'use strict';

    angular.module("directives")
        .directive('accessLevelVisible', ['$rootScope', 'authService', 'customEvents',
            function($rootScope, authService, customEvents) {
                return {
                    restrict: 'A',
                    scope: {
                        accessLevelVisible: '='
                    },
                    link: function(scope, element, attrs) {
                        var hiddenElementClasses = 'hidden unauthorized-hidden';

                        var updateElementVisibility = function() {
                            authService.checkAuthorization(scope.accessLevelVisible)
                                .then(function(data) {
                                    if (data) {
                                        element.removeClass(hiddenElementClasses);
                                    } else {
                                        element.addClass(hiddenElementClasses);
                                    }
                                }, function(error) {
                                    element.addClass(hiddenElementClasses);
                                });
                        };

                        $rootScope.$watch('currentUserInfo', function(viewValue) {
                            updateElementVisibility();
                            return viewValue;
                        });
                    }
                };
            }]);
})(window);