var app = angular.module('resourceTracking', ['resourceTracking.directives']);
app.controller('TeamCtrl', function($scope, $http, $filter) {
    $scope.mode = '';
    //Teams
    $http.get('getTeams').then(function(obj) {
        $scope.Teams = obj.data;
    }, function(e) {
        console.log(e);
    });
    //Leads
    $http.get('getLeads').then(function(obj) {
        $scope.Leads = obj.data;
    }, function(e) {
        console.log(e);
    });
    $scope.addTeam = function() {
        $scope.mode = 'Add';
        document.forms['AddTeamForm'].reset();
        $('#AddTeamModal').modal('show');
    };
    $scope.editTeam = function(item_id) {
        var tcheck = $filter('filter')($scope.Teams, {
            id: item_id
        });
        if (tcheck.length) {
            var o = tcheck[0];
            var lcheck = $filter('filter')($scope.Leads, {
                id: o.leadid
            });
            if (lcheck.length) {
                o.leadid = lcheck[0];
            }
            $scope.team = JSON.parse(angular.toJson(o));
            $scope.team.leadid = o.leadid;
        }
        $scope.mode = 'Edit';
        $('#AddTeamModal').modal('show');
    };
    $scope.removeTeam = function(item_id) {
        $http.post('/removeTeam', {id:item_id}).then(function(obj) {
            var d = obj.data;
            console.log(d);
            var msg = d.message;
            if (msg === "success") {
                var index;
                for (i = 0, l = $scope.Teams.length; i < l; i++) {
                    var r = $scope.Teams[i];
                    if (r.id == item_id) {
                        index = i;
                        break;
                    }
                }
                $scope.Teams.splice(index,1);
            }
        }, function(e) {
            console.log(e);
        });
    };
    var empty = {
        name: '',
        description: '',
        leadid: ''
    };
    $scope.team = empty;
    $scope.saveTeam = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.AddTeamForm.$valid) {
            var model = JSON.parse(angular.toJson($scope.team));
            if (typeof(model.leadid) === 'object') {
                model.leadid = model.leadid.id;
            }
            var url;
            if ($scope.mode === 'Add') {
                url = '/saveTeam';
            } else {
                url = '/editTeam';
            }
            console.log(model);
            $http.post(url, model).then(function(obj) {
                var d = obj.data;
                var msg = d.message;
                if ($scope.mode === 'Add') {
                    if (msg === "success") {
                        model.id = d.data;
                        $scope.Teams.push(model);
                    }
                } else {
                    if (msg === "success") {
                        var index;
                        for (i = 0, l = $scope.Teams.length; i < l; i++) {
                            var r = $scope.Teams[i];
                            if (r.id == model.id) {
                                index = i;
                                break;
                            }
                        }
                        $scope.Teams[index] = model;
                    }
                }
            }, function(e) {
                console.log(e);
            });
            $('#AddTeamModal').modal('hide');
        }
    };
    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.team = empty;
    };
});
app.controller('RoleCtrl', function($scope, $http, $filter) {
    $scope.mode = '';
    //Roles
    $http.get('getRoles').then(function(obj) {
        $scope.Roles = obj.data;
    }, function(e) {
        console.log(e);
    });
    $scope.addRole = function() {
        $scope.mode = 'Add';
        document.forms['AddRoleForm'].reset();
        $('#AddRoleModal').modal('show');
    };
    $scope.editRole = function(item_id) {
        var tcheck = $filter('filter')($scope.Roles, {
            id: item_id
        });
        if (tcheck.length) {
            var o = tcheck[0];
            $scope.role = JSON.parse(angular.toJson(o));
        }
        $scope.mode = 'Edit';
        $('#AddRoleModal').modal('show');
    };
    $scope.removeRole = function(item_id) {
        $http.post('removeRole', {id:item_id}).then(function(obj) {
            var d = obj.data;
            console.log(d);
            var msg = d.message;
            if (msg === "success") {
                var index;
                for (i = 0, l = $scope.Roles.length; i < l; i++) {
                    var r = $scope.Roles[i];
                    if (r.id == item_id) {
                        index = i;
                        break;
                    }
                }
                $scope.Roles.splice(index,1);
            }
        }, function(e) {
            console.log(e);
        });
    };
    var empty = {
        name: '',
        description: ''
    };
    $scope.role = empty;
    $scope.saveRole = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.AddRoleForm.$valid) {
            console.log('saveRole');
            var model = JSON.parse(angular.toJson($scope.role));
            var url;
            if ($scope.mode === 'Add') {
                url = '/saveRole';
            } else {
                url = '/editRole';
            }
            console.log(model);
            $http.post(url, model).then(function(obj) {
                var d = obj.data;
                var msg = d.message;
                if ($scope.mode === 'Add') {
                    if (msg === "success") {
                        model.id = d.data;
                        $scope.Roles.push(model);
                    }
                } else {
                    if (msg === "success") {
                        var index;
                        for (i = 0, l = $scope.Roles.length; i < l; i++) {
                            var r = $scope.Roles[i];
                            if (r.id == model.id) {
                                index = i;
                                break;
                            }
                        }
                        $scope.Roles[index] = model;
                    }
                }
            }, function(e) {
                console.log(e);
            });
            $('#AddRoleModal').modal('hide');
        }
    };
    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.role = empty;
    };
});