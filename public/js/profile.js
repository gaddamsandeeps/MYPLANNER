var app = angular.module('resourceTracking', ['resourceTracking.directives']);


app.controller('EditUserController', function($scope, $http, $q) {
    var tempObj = null;
    $scope.validTeam = false;
    $scope.validRole = false;
    var ajax1 = $http.get('/getRoles').then(function(obj) {
        $scope.Roles = obj.data;
    }, function(e) {
        console.log(e);
    });
    var ajax2 = $http.get('/getTeams').then(function(obj) {
        $scope.Teams = obj.data;
    }, function(e) {
        console.log(e);
    });
    $q.all([ajax1, ajax2]).then(function() {
        $http.get('/getUser?userid=' + window.userid).then(function(d) {
            var o = d.data;
            var RoleIdx = getIndex($scope.Roles, o.roleid);
            var RoleObj = $scope.Roles[RoleIdx];
            var TeamIdx, TeamObj;
            if (o.roleid != 3) {
                TeamObj = null;
            } else {
                TeamIdx = getIndex($scope.Teams, o.teamid);
                TeamObj = $scope.Teams[TeamIdx];
                $scope.validTeam = true;
            }

            var obj = {
                contact: o.contactno,
                firstname: o.firstname,
                lastname: o.lastname,
                roleid: RoleObj,
                teamid: TeamObj,
                username: o.username
            };
            tempObj = JSON.parse(angular.toJson(obj));
            $scope.editUser = obj;
            setTimeout(function() {
                $scope.$apply();
            }, 100);
        }, function(e) {
            console.log(e);
        });
    });
    var empty = {
        username: '',
        roleid: null,
        teamid: null,
        firstname: '',
        lastname: '',
        contact: ''
    };
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.EditUserForm.$valid) {
            var model = JSON.parse(angular.toJson($scope.editUser));
            model.roleid = (model.roleid) ? model.roleid.id : null;
            model.teamid = (model.teamid) ? model.teamid.id : null;
            $http.post('/editUser', model).success(function(d, status, headers, config) {
                showStatus(d, 'User profile edited');
                setTimeout(function() {
                    location.href = '/';
                }, 2000);
            }).error(function(e, status, headers, config) {
                console.log(e);
            });
        }
    };
    $scope.reset = function() {
        if (tempObj) {
            var o = JSON.parse(angular.toJson(tempObj));
            if (o.roleid) {
                var RoleIdx = getIndex($scope.Roles, o.roleid.id);
                o.roleid = $scope.Roles[RoleIdx];
            }
            if (o.teamid) {
                var TeamIdx = getIndex($scope.Teams, o.teamid.id);
                o.teamid = $scope.Teams[TeamIdx];
            }
            $scope.$broadcast('show-errors-reset');
            $scope.editUser = o;
        }
    };

    function getIndex(arr, id) {
        var index = -1;
        for (var i = 0, j = arr.length; i < j; i++) {
            if (arr[i]['id'] === id) {
                index = i;
                break;
            }
        }
        return index;
    };
    $scope.roleChange = function() {
        if ($scope.editUser.roleid && $scope.editUser.roleid.id == 3) {
            $scope.validTeam = true;
        } else {
            $scope.validTeam = false;
            $scope.editUser.teamid = null;
        }
    };
});


app.controller('changePasswordController', function($scope, $http) {
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.Form.$valid) {
            var model = JSON.parse(angular.toJson($scope.changePassword));
            var obj = {
                oldpassword: model.oldpassword,
                newpassword: model.password
            };
            $http.post('/changePassword', obj).success(function(d, status, headers, config) {
                location.href = "/";
            }).error(function(e, status, headers, config) {
                console.log(e);
            });
        }
    };
});
