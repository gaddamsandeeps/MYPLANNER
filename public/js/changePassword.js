var app = angular.module('resourceTracking', ['resourceTracking.directives']);
app.controller('changePasswordController', function($scope, $http) {
    var empty = {
        oldpassword: '',
        newpassword: '',
        confirmnewpassword: ''
    };
    $scope.changePassword = empty;
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.changePasswordForm.$valid) {
            var model = JSON.parse(angular.toJson($scope.changePassword));
            delete model.confirmnewpassword;
            $http.post('/changePassword', model).success(function(d, status, headers, config) {
                document.forms['changePasswordForm'].reset();
            }).error(function(e, status, headers, config) {
                console.log(e);
            });
        }
    };
    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.changePassword = empty;
    };
});
