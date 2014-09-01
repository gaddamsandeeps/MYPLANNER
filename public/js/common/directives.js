var d = angular.module('resourceTracking.directives', []);
d.directive('showErrors', function($timeout) {
    return {
        restrict: 'A',
        require: '^form',
        link: function(scope, el, attrs, formCtrl) {
            var inputEl = el[0].querySelector("[name]");
            var inputNgEl = angular.element(inputEl);
            var inputName = inputNgEl.attr('name');
            var blurred = false;
            inputNgEl.bind('blur', function() {
                blurred = true;
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
            });
            scope.$watch(function() {
                return formCtrl[inputName].$invalid;
            }, function(invalid) {
                if (!blurred && invalid) {
                    return;
                }
                el.toggleClass('has-error', invalid);
            });
            scope.$on('show-errors-check-validity', function() {
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
            });
            scope.$on('show-errors-reset', function() {
                $timeout(function() {
                    el.removeClass('has-error');
                }, 0, false);
            });
        }
    }
});
d.directive('validPassword', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue, $scope) {
                var noMatch = viewValue != scope.Form.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            });
        }
    }
});
