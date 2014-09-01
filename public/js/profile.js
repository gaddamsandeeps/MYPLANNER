var app = angular.module('resourceTracking', ['resourceTracking.directives']);
app.controller('EditUserController', function ($scope, $http, $q) {
    $scope.validRole = false;
    var ajax1 = $http.get('/getRoles').then(function (obj) {
        $scope.Roles = obj.data;
    }, function (e) {
        console.log(e);
    });
    var ajax2 = $http.get('getTeams').then(function (obj) {
        $scope.Teams = obj.data;
    }, function (e) {
        console.log(e);
    });
    $q.all([ajax1, ajax2]).then(function () {
        $http.get('/getUser?userid=' + window.userid).then(function (d) {
            var o = d.data;
            var RoleIdx = getIndex($scope.Roles, o.roleid);
            var RoleObj = $scope.Roles[RoleIdx];
            var TeamIdx, TeamObj;
            if (o.roleid == 2) {
                TeamObj = null;
            } else {
                TeamIdx = getIndex($scope.Teams, o.teamid);
                TeamObj = $scope.Teams[TeamIdx];
            }
            var s1 = new Date(o.dob);
            var e1 = document.getElementById('dob');
            e1.valueAsDate = s1;
            var obj = {
                contact: o.contactno,
                firstname: o.firstname,
                lastname: o.lastname,
                roleid: RoleObj,
                sex: o.sex,
                teamid: TeamObj,
                username: o.username,
                dob: e1.value
            };
            $scope.editUser = obj;
            setTimeout(function () {
                $scope.$apply();
            }, 100);
        }, function (e) {
            console.log(e);
        });
    })
    var empty = {
        username: '',
        roleid: null,
        teamid: null,
        firstname: '',
        lastname: '',
        sex: 'M',
        dob: '',
        contact: ''
    };
    $scope.save = function () {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.Form.$valid) {
            var model = JSON.parse(angular.toJson($scope.editUser));
            
            model.roleid = (model.roleid) ? model.roleid.id : null;
            model.teamid = (model.teamid) ? model.teamid.id : null;

            $http.post('/editUser', model).success(function (d, status, headers, config) {
                console.log(d);
            }).error(function (e, status, headers, config) {
                console.log(e);
            });
        }
    };
    $scope.reset = function () {
        $scope.$broadcast('show-errors-reset');
        $scope.editUser = empty;
    };
    $scope.roleChange = function () {
        if ($scope.editUser.roleid && $scope.editUser.roleid.id == 3) {
            $scope.validRole = true;
        } else {
            $scope.validRole = false;
            $scope.editUser.teamid = null;
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
    }
});