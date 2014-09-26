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
                            if (authService.isAuthorized(scope.accessLevelVisible)) {
                                element.removeClass(hiddenElementClasses);
                            } else {
                                element.addClass(hiddenElementClasses);
                            }
                        };

                        scope.$watch('accessLevelVisible', function(viewValue) {
                            updateElementVisibility();
                            return viewValue;
                        });

                        $rootScope.$on(customEvents.authEvents.loginSuccess, updateElementVisibility);
                        $rootScope.$on(customEvents.authEvents.logoutSuccess, updateElementVisibility);
                        $rootScope.$on(customEvents.authEvents.sessionTimeout, updateElementVisibility);
                        $rootScope.$on(customEvents.authEvents.userInfoNotFound, updateElementVisibility);
                    }
                };
            }]);
})(window);