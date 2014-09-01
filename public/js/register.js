var app = angular.module('resourceTracking', ['resourceTracking.directives']);
app.controller('NewUserController', function($scope, $http) {
    $scope.validRole = false;
    //Roles
    $http.get('/getRoles').then(function(obj) {
        $scope.Roles = obj.data;
    }, function(e) {
        console.log(e);
    });
    //Teams
    $http.get('getTeams').then(function(obj) {
        $scope.Teams = obj.data;
    }, function(e) {
        console.log(e);
    });
    var empty = {
        username: '',
        password: '',
        roleid: null,
        teamid: null,
        firstname: '',
		lastname: '',
        sex: 'M',
		dob: '',
        contact: ''
    };
    $scope.newUser = empty;
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.Form.$valid) {
            var model = JSON.parse(angular.toJson($scope.newUser));
            delete model.confirmPassword;
            model.roleid = model.roleid.id;
            model.teamid = model.teamid.id;
            $http.post('/saveUser', model).success(function(d, status, headers, config) {
                console.log(d);
                document.forms['Form'].reset();
            }).error(function(e, status, headers, config) {
                console.log(e);
            });
        }
    };
    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.newUser = empty;
    };
    $scope.roleChange = function() {
        if ($scope.newUser.roleid && $scope.newUser.roleid.id == 3) {
            $scope.validRole = true;
        } else {
            $scope.validRole = false;
            $scope.newUser.teamid = null;
        }
    };
});
