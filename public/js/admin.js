var app = angular.module('resourceTracking', ['resourceTracking.directives']);
app.controller('TeamCtrl', function($scope, $http, $filter) {

    var localExecutivesObj;

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

    //Executives
    $http.get('getExecutives').then(function(obj) {
        $scope.Executives = obj.data;
        localExecutivesObj = angular.copy(obj.data);
    }, function(e) {
        console.log(e);
    });

    $scope.addTeam = function() {
        $scope.mode = 'Add';
        $scope.reset();
        document.forms['AddTeamForm'].reset();

        $("#teamlead").on("change", function() {

            $scope.Executives = angular.copy(localExecutivesObj);
            var currentLeadId = $scope.team.leadid.id;
            var currentScopeExecutives = $scope.Executives;

            $.each(currentScopeExecutives, function(index, exeObj) {

                if (exeObj.id == currentLeadId) {

                    $scope.$apply(function() {
                        currentScopeExecutives.splice(index, 1);
                        $scope.Executives = currentScopeExecutives;
                    });
                    return false;
                } else {
                    $scope.$apply(function() {
                        $scope.Executives = angular.copy(localExecutivesObj);
                    });
                }
            });
        });

        $('#AddTeamModal').on('hidden.bs.modal', function() {
            $scope.Executives = angular.copy(localExecutivesObj);
        })

        $('#AddTeamModal').modal('show');
    };
    $scope.editTeam = function($event, item_id) {


        var tcheck = $filter('filter')($scope.Teams, {
            id: item_id
        });


        if (tcheck.length) {
            var o = tcheck[0];
            var lcheck = $filter('filter')($scope.Leads, {
                id: o.leadid
            });


            var scopeExecutives = $scope.Executives;



            $.each(scopeExecutives, function(index, exeObj) {

                if (exeObj.id == tcheck[0].leadid) {
                    scopeExecutives.splice(index, 1);
                    return false;
                }

            });

            if (lcheck.length) {
                o.leadid = lcheck[0];
            }
            $scope.team = JSON.parse(angular.toJson(o));
            $scope.team.leadid = o.leadid;


        }
        $scope.mode = 'Edit';
        $('#AddTeamModal').modal('show');


        $("#teamlead").on("change", function() {

            $scope.Executives = angular.copy(localExecutivesObj);
            var currentLeadId = $scope.team.leadid.id;
            var currentScopeExecutives = $scope.Executives;

            $.each(currentScopeExecutives, function(index, exeObj) {

                if (exeObj.id == currentLeadId) {

                    $scope.$apply(function() {
                        currentScopeExecutives.splice(index, 1);
                        $scope.Executives = currentScopeExecutives;
                    });
                    return false;
                } else {
                    $scope.$apply(function() {
                        $scope.Executives = angular.copy(localExecutivesObj);
                    });
                }

            });
        });

        $('#AddTeamModal').on('hidden.bs.modal', function() {
            $scope.Executives = angular.copy(localExecutivesObj);
        });
    };

    $scope.removeTeam = function(item_id) {
        $http.post('/removeTeam', {
            id: item_id
        }).then(function(obj) {
            var d = obj.data;
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
                $scope.Teams.splice(index, 1);
            }
        }, function(e) {
            console.log(e);
        });
    };

    $scope.saveTeam = function() {
        $scope.$broadcast('show-errors-check-validity');

        var username, mockLead, mockExecutive;



        if ($scope.AddTeamForm.$valid) {
            var model = JSON.parse(angular.toJson($scope.team));


            mockLead = model.leadid;
            mockExecutive = model.executives || [];

            if (typeof(model.leadid) === 'object') {
                username = model.leadid.username;
                model.leadid = model.leadid.id;
            }


            var url;
            if ($scope.mode === 'Add') {
                url = '/saveTeam';
            } else {
                url = '/editTeam';
            }

            var execArray = [];

            if (!model.executives) {
                model.executives = [];
            }


            if (model.executives.length) {
                $.each(model.executives, function(index, execObj) {
                    execArray.push(execObj.id);
                });
            }

            model.executives = execArray;

            $http.post(url, model).then(function(obj) {
                var d = obj.data;
                var msg = d.message;


                if ($scope.mode === 'Add') {
                    showStatus(d, model.name + ' Team   added');
                    if (msg === "success") {
                        model.id = d.data;

                        model.username = username;
                        model.executives = mockExecutive;
                        model.leadid = mockLead;

                        $scope.Teams.push(model);

                    }
                } else {
                    showStatus(d, model.name + ' Team   edited');

                    if (msg === "success") {

                        var index;

                        /*Reset Model with lead and executive obj*/

                        model.executives = mockExecutive;

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

            $scope.Executives = localExecutivesObj;

            $('#AddTeamModal').modal('hide');
        }
    };
    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.team = {};
    };
    $scope.showExecutives = function(e) {
        var element = $(e.currentTarget).parent().parent();
        element.next().slideToggle();
    }

    $scope.resetExecutives = function(e) {
        $("#executive option:selected").removeAttr('selected');
        $scope.team.executives = [];
    }



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
        $scope.reset();
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
        $http.post('removeRole', {
            id: item_id
        }).then(function(obj) {
            var d = obj.data;
            var msg = d.message;
            if (msg === "success") {
                var index;
                for (var i = 0, l = $scope.Roles.length; i < l; i++) {
                    var r = $scope.Roles[i];
                    if (r.id == item_id) {
                        index = i;
                        break;
                    }
                }
                $scope.Roles.splice(index, 1);
            }
        }, function(e) {
            console.log(e);
        });
    };

    $scope.saveRole = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.AddRoleForm.$valid) {
            var model = JSON.parse(angular.toJson($scope.role));
            var url;
            if ($scope.mode === 'Add') {
                url = '/saveRole';
            } else {
                url = '/editRole';
            }
            $http.post(url, model).then(function(obj) {
                var d = obj.data;
                var msg = d.message;
                if ($scope.mode === 'Add') {
                    showStatus(d, model.name + ' Role   added');
                    if (msg === "success") {
                        model.id = d.data;
                        $scope.Roles.push(model);
                    }
                } else {
                    showStatus(d, model.name + ' Role   edited');
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
        $scope.role = {};
    };
});

app.controller('NTProjectCtrl', function($scope, $http, $filter) {
    $scope.mode = '';
    //Projects
    $http.get('/getAdminProjects').then(function(obj) {
        $scope.Projects = obj.data;
    }, function(e) {
        console.log(e);
    });
    $scope.addProject = function() {
        $scope.mode = 'Add';
        $scope.reset();
        document.forms['ProjectForm'].reset();
        $('#ProjectModal').modal('show');
    };
    $scope.editProject = function(item_id) {
        var tcheck = $filter('filter')($scope.Projects, {
            id: item_id
        });
        if (tcheck.length) {
            var o = tcheck[0];
            $scope.project = JSON.parse(angular.toJson(o));
        }
        $scope.mode = 'Edit';
        $('#ProjectModal').modal('show');
    };
    $scope.saveProject = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.ProjectForm.$valid) {
            var model = JSON.parse(angular.toJson($scope.project));
            var url;
            if ($scope.mode === 'Add') {
                url = '/saveAdminProject';
            } else {
                url = '/editAdminProject';
            }
            $http.post(url, model).then(function(obj) {
                var d = obj.data;
                var msg = d.message;
                if ($scope.mode === 'Add') {
                    showStatus(d, 'Project ' + model.name + ' added');
                    if (msg === "success") {
                        model.id = d.data;
                        $scope.Projects.push(model);
                    }
                } else {
                    showStatus(d, 'Project ' + model.name + ' edited');
                    if (msg === "success") {
                        var index;
                        for (i = 0, l = $scope.Projects.length; i < l; i++) {
                            var r = $scope.Projects[i];
                            if (r.id == model.id) {
                                index = i;
                                break;
                            }
                        }
                        $scope.Projects[index] = model;
                    }
                }
            }, function(e) {
                console.log(e);
            });
            $('#ProjectModal').modal('hide');
        }
    };

    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.project = {};
    };
});

app.controller("IterationCtrl", function($scope, $http, $filter) {
    $scope.mode = '';
    //Projects
    $http.get('/getIterations').then(function(obj) {

        $scope.Iterations = obj.data;

    }, function(e) {
        console.log(e);
    });


    $scope.addIteration = function() {
        $scope.mode = 'Add';
        $scope.reset();
        document.forms['IterationForm'].reset();
        $('#IterationModal').modal('show');
    };

    $scope.saveIteration = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.IterationForm.$valid) {
            var model = JSON.parse(angular.toJson($scope.iteration));
            var url;
            if ($scope.mode === 'Add') {
                url = '/saveIteration';
            }
            $http.post(url, model).then(function(obj) {

                var d = obj.data;
                var msg = d.message;

                if ($scope.mode === 'Add') {

                    showStatus(d, 'Iteration ' + model.name + ' added');
                    if (msg === "success") {
                        model.id = d.data;
                        $scope.Iterations.push(model);
                    }
                }

            }, function(e) {
                console.log(e);
            });
            $('#IterationModal').modal('hide');


        }
    };
    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.iteration = {};
    };
});


app.controller("UersCtrl", function($scope, $http, $filter) {
    //users
    $http.get('/getUnverifiedUsers').then(function(obj) {
        $scope.users = obj.data.data;
    }, function(e) {
        console.log(e);
    });

    $scope.verifyUser = function(uid, name, currentIndex, users) {
        $scope.users = users;
        var verifyResources = $scope.users,
            searchIndex = -1;
        $http.post('/verifyUser', {
            id: uid
        }).then(function(obj) {
            users.splice(currentIndex, 1);
            for (var i = 0; i < verifyResources.length; i++) {
                if (users[i].id == uid) {
                    searchIndex = i;
                    break;
                }
                if (searchIndex != -1) {
                    users.splice(searchIndex, 1);
                }
            }
            showStatus(obj.data, name + ' got verified');
        }, function(e) {
            console.log(e);
        });
    };
});
