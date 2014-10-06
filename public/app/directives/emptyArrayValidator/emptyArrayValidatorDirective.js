(function(window, undefined) {
    'use strict';

    angular.module('directives')
        .directive('emptyArrayValidator', function() {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function(scope, elem, attrs, ctrl) {
                    scope.$watch(function() {
                        var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;
                        return !!((ctrl.$pristine && angular.isUndefined(modelValue))
                            || (modelValue && modelValue.length && modelValue.length > 0));
                    }, function(currentValue) {
                        ctrl.$setValidity('empty-array', currentValue);
                    });
                }
            };
        });
})(window, undefined);