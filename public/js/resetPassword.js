var app = angular.module('resourceTracking', ['resourceTracking.directives']);
app.controller('forgotPasswordController', function($scope, $http) {
    var empty = {
        username: '',
        contact: '',
        password: '',
        confirmpassword: ''
    };
    $scope.forgotPassword = empty;
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.Form.$valid) {
            var model = JSON.parse(angular.toJson($scope.forgotPassword));
            delete model.confirmPassword;
            $http.post('/resetPassword', model).success(function(d, status, headers, config) {
                document.forms['Form'].reset();
            }).error(function(e, status, headers, config) {
                console.log(e);
            });
        }
    };
    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.forgotPassword = empty;
    };
});
