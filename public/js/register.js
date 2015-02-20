var app = angular.module('resourceTracking', ['resourceTracking.directives']);
app.controller('NewUserController', function($scope, $http) {

    $scope.validTeam = false;
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
        contact: ''
    };
    $scope.newUser = empty;
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');


        if ($scope.Form.$valid) {

            var model = JSON.parse(angular.toJson($scope.newUser));
            delete model.confirmPassword;
            model.roleid = (model.roleid) ? model.roleid.id : null;
            model.teamid = (model.teamid) ? model.teamid.id : null;
            $http.post('/saveUser', model).then(function(obj) {
                if (obj.data.message === "success") {
                    $("#registerCtrl").css("color", "#3DB34A").text('New User Created Successfully. Please login with your credentials');
                    setTimeout(function() {
                        location.href = '/';
                    }, 2000);
                }
            }, function(e) {
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
            $scope.validTeam = true;
        } else {
            $scope.validTeam = false;
            $scope.newUser.teamid = null;
        }
    };
});
