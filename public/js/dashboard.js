var app = angular.module('resourceTracking', ['resourceTracking.directives']);

//DIRECTIVES
//PROJECT
app.directive("projectdraggable", function() {
    return {
        restrict: "A",
        link: function(scope, element, attributes, ctlr) {
            element.attr("draggable", true);
            element.bind("dragstart", function(e) {
                var o = e.originalEvent.dataTransfer;
                o.setData('projectid', attributes.projectid);
                o.setData('projectname', attributes.projectname);
                o.setData('type', 'project');
                element.addClass('over');
            });
        }
    };
});

app.directive("projectdroppable", function() {
    return {
        restrict: "A",
        link: function(scope, element, attributes, ctlr) {
            element.bind("dragover", function(e) {
                e.preventDefault();
            });
            element.bind("drop", function(e) {
                var o = e.originalEvent.dataTransfer;
                var type = o.getData("type");
                if (type === 'project') {
                    scope.addToProjectsView(Number(o.getData("projectid")), o.getData("projectname"));
                    e.stopPropagation();
                    e.preventDefault();
                    //location.reload();
                } else {
                    return;
                }
            });
        }
    };
});

//tooltip
app.directive('bsPopover', function() {
    return function(scope, element, attrs) {
        element.find('[data-toggle="tooltip"]').tooltip({
            placement: 'right'
        });
    };
});

//RESOURCE
app.directive("resourcedraggable", function() {
    return {
        restrict: "A",
        link: function(scope, element, attributes, ctlr) {
            element.attr("draggable", true);
            element.bind("dragstart", function(e) {
                var o = e.originalEvent.dataTransfer;
                o.setData("username", attributes.username);
                o.setData("fullname", attributes.fullname);
                o.setData("type", 'resource');
                var span = element[0];
                if (span.tagName === 'SPAN') {
                    o.setData("operation", 'move');
                    o.setData("sourceProjectId", span.parentElement.parentElement.parentElement.getAttribute('projectid'));
                    o.setData("sourceProjectName", span.parentElement.parentElement.parentElement.getAttribute('projectname'));
                } else {
                    o.setData("operation", 'copy');
                }
            });
        }
    };
});

app.directive("resourcedroppable", function() {
    return {
        restrict: "A",
        link: function(scope, element, attributes, ctlr) {
            element.bind("dragover", function(e) {
                e.preventDefault();
            });
            element.bind("drop", function(e) {
                var o = e.originalEvent.dataTransfer;
                if (o.getData("type") === 'resource') {
                    var op = o.getData("operation");
                    if (op === 'copy') {
                        scope.copyResource(attributes.projectid, attributes.projectname, o.getData("username"), o.getData("fullname"), o.getData("projectname"));
                    }
                    if (op === 'move') {
                        scope.moveResource(o.getData("sourceProjectId"), o.getData("sourceProjectName"), attributes.projectid, attributes.projectname, o.getData("username"));
                        $(e.currentTarget).addClass('open');
                        $(e.currentTarget).find('.resourcseToProject').show();

                    }
                    e.stopPropagation();
                    e.preventDefault();
                    //location.reload();
                } else {
                    return;
                }
            });
        }
    };
});

//SERVICES
app.factory('Services', function($http, $q) {
    return {
        getURL: function(url) {
            var d = $q.defer();
            $http.get(url).then(function(response) {
                d.resolve(response.data);
            }, function err(reason) {
                d.reject(reason);
            });
            return d.promise;
        },
        postURL: function(url, obj, msg) {
            var d = $q.defer();
            $http.post(url, obj).then(function(response) {
                d.resolve(response.data);
                if (msg) {
                    showStatus(response.data, msg);
                }
            }, function err(reason) {
                d.reject(reason);
            });
            return d.promise;
        },
        getIndex: function(arr, id) {
            var index = -1;
            for (var i = 0, j = arr.length; i < j; i++) {
                if (arr[i]['id'] === id) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        dateStr: function(f) {
            var y = f.getFullYear();
            var m = f.getMonth() + 1;
            var d = f.getDate();
            var s = y + '-' + m + '-' + d;
            return s;
        }
    }
});

app.controller('genericCtrl', function($rootScope, Services) {

    $rootScope.getResources = function(e) {
        if (e) {
            e.stopPropagation();
        }
        //TeamUsers
        Services.getURL('getTeamUsersAndAvailability').then(function(d) {
            for (var i = 0; i <= d.length - 1; i++) {
                d[i].resourcelogged = loghours(d[i].logged);
            }
            $rootScope.TeamUsers = d;
            for (var i = 0; i < $rootScope.TeamUsers.length; i++) {
                if ($rootScope.TeamUsers[i].accesslevel > 0) {
                    $rootScope.TeamUsers[i].accesslevel = true;
                } else {
                    $rootScope.TeamUsers[i].accesslevel = false;
                }

                if (!$rootScope.TeamUsers[i].projectCount) {
                    $rootScope.TeamUsers[i].projectCount = 0;
                }
            }

        }, function(e) {
            console.log(e);
        });
    };

    $rootScope.getResources();

    $rootScope.getProjects = function(e) {
        if (e) {
            e.stopPropagation();
        }
        //Projects
        Services.getURL('getProjects').then(function(d) {
            for (var i = 0, l = d.length; i < l; i++) {
                var obj = d[i];
                var bool = 'count' in obj;

                if (!bool) {
                    obj.count = 0;
                }
                obj.projectlogged = projectloghours(obj.count, obj.logged);
            }
            $rootScope.Projects = d;
        }, function(e) {
            console.log(e);
        });
    };

    $rootScope.getProjects();

    $rootScope.showUserTimesheet = function(id) {
        var url = '/usertimesheet?id=' + id;
        location.href = url;
    };
    $rootScope.showUserReport = function(id) {
        var url = '/report?id=' + id;
        location.href = url;
    };
});

app.controller('projectViewController', function($scope, $rootScope, Services, $filter) {
    //droppedProjects
    $scope.droppedProjects = null;
    Services.getURL('/getMyProjects').then(function(d) {
        var total = 0,
        spent = 0,
        bal = 0,
        percent = 0;
        for (var i = 0; i <= d.length - 1; i++) {
            for (var j = 0; j <= d[i].users.length - 1; j++) {
                spent = toHrs(d[i].users[j].logged);
                d[i].users[j].logged = spent;

                total = calcBusinessDays(new Date(d[i].users[j].startdate), new Date(d[i].users[j].enddate));
                d[i].users[j].total = total;

                bal = (total - spent).toFixed(2);
                d[i].users[j].bal = bal;

                d[i].users[j].percent = (spent / total) * 100;
            }

            d[i].diff = currentDateStatus(d[i].enddate, d[i].startdate);
            d[i].currentdate = todaysDate();
        }
        $scope.droppedProjects = d;
    }, function(e) {
        console.log(e);
    });

    $scope.addToProjectsView = function(projectid, projectname) {
        var check = $filter('filter')($scope.droppedProjects, {
            id: projectid
        });
        if (check.length === 0) {
            Services.getURL('/addMyProject?id=' + projectid).then(function(d) {
                console.log(d);

                d.diff = currentDateStatus(d.enddate, d.startdate);
                d.currentdate = todaysDate();
                var total = 0,
                spent = 0,
                bal = 0,
                percent = 0;
                for (var j = 0; j <= d.users.length - 1; j++) {
                    spent = toHrs(d.users[j].logged);
                    console.log(d.users[j].logged);
                    d.users[j].logged = spent;

                    total = calcBusinessDays(new Date(d.users[j].startdate), new Date(d.users[j].enddate));
                    d.users[j].total = total;

                    bal = (total - spent).toFixed(2);
                    d.users[j].bal = bal;

                    d.users[j].percent = (spent / total) * 100;
                }


                if (d.id) {
                    showStatus({
                        "message": "success"
                    }, ('Project ' + projectname + ' added'));
                } else {
                    showStatus({});
                }
                $scope.droppedProjects.push(d);
                setTimeout(function() {
                    $scope.$apply();
                }, 100);
            }, function(e) {
                console.log(e);
            });
}
};

$scope.closeView = function(project) {
    bootbox.confirm("Do you want to continue ?", function(result) {
        if (!result) {
            return;
        }
        var index = -1;
        for (var i = 0, l = $scope.droppedProjects.length; i < l; i++) {
            var p = $scope.droppedProjects[i];
            var pid = p.id;
            if (pid == project.id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            $scope.droppedProjects.splice(index, 1);
            var obj = {
                id: pid
            };
            var msg = 'Project ' + project.name + ' removed';
            Services.postURL('/removeMyProject', obj, msg);
        }
    });
};

$scope.copyResource = function(projectid, projectname, resourcename, resourcefullname) {
    var pindex = -1;
    for (var i = 0, l = $scope.droppedProjects.length; i < l; i++) {
        var p = $scope.droppedProjects[i];
        if (p['id'] == projectid) {
            pindex = i;
            break;
        }
    }
    if (pindex !== -1) {
        var resArr = $scope.droppedProjects[pindex].users;

        window.x = resArr;


        var tempSearch = $filter('filter')(resArr, {
            username: resourcename
        });
        if (tempSearch.length === 0) {
            var tempArr = $filter('filter')($rootScope.TeamUsers, {
                username: resourcename
            });

            var obj = {
                id: projectid,
                userid: tempArr[0].id
            }
            $rootScope.userid = obj.userid;
            $rootScope.projectid = projectid;
            $rootScope.resourcename = resourcename;
            $rootScope.resourcefullname = resourcefullname;
            $rootScope.projectname = projectname;

            $('#resourceName').val(resourcefullname);
            $('#AddDateModal').modal('show');

            $scope.$apply();
        }
    }
}

$scope.moveResource = function(spid, spname, tpid, tpname, resourcename) {
    var s, t;
    for (var i = 0, l = $scope.droppedProjects.length; i < l; i++) {
        var p = $scope.droppedProjects[i];
        if (p['id'] == spid) {
            s = i;
        }
        if (p['id'] == tpid) {
            t = i;
        }
    }
    var tArr = $scope.droppedProjects[t].users;
    var tcheck = $filter('filter')(tArr, {
        username: resourcename
    });
    if (tcheck.length) return;
    var sArr = $scope.droppedProjects[s].users;
    for (i = 0, j = sArr.length; i < j; i++) {
        var tObj = sArr[i];
        if (tObj.username === resourcename) {
            var sPos = i;
            break;
        }
    }
    sArr.splice(sPos, 1);

    tArr.push(tObj);
    var obj = {
        removepid: spid,
        updatepid: tpid,
        userid: tObj.id
    };
    var msg = 'Resource moved from ' + spname + ' to ' + tpname;
    Services.postURL('/addNRemoveResourceFromProject', obj, msg);
    $scope.$apply();
};
$scope.removeResource = function(project, userObj) {
    var pindex = -1,
    i, l, p, resArr, dindex;
    for (i = 0, l = $scope.droppedProjects.length; i < l; i++) {
        p = $scope.droppedProjects[i];
        if (p['id'] == project.id) {
            pindex = i;
            break;
        }
    }
    if (pindex !== -1) {
        resArr = $scope.droppedProjects[pindex].users;
        for (i = 0; i < resArr.length; i++) {
            if (resArr[i].id === userObj.id) {
                dindex = i;
                break;
            }
        }

        resArr.splice(dindex, 1);

        var proj = $filter('filter')($rootScope.Projects, {
            name: project.name
        });

        if (proj.length) {
            proj[0].count--;
        }

        var user = $filter('filter')($rootScope.TeamUsers, {
            username: userObj.username
        });

        if (user.length) {
            user[0].projectCount--;
        }

        var obj = {
            id: project.id,
            userid: userObj.id
        };
        var msg = userObj.firstname + ' ' + userObj.lastname + ' removed from project ' + project.name;
        Services.postURL('/removeResourceFromProject', obj, msg);
    }
        //location.reload();
    };

    $scope.editProject = function(id) {
        $rootScope.projectType = 'Edit Project';
        $rootScope.projectId = id;
        $rootScope.$broadcast('editProject');
    };
    $scope.addProject = function(e) {
        e.stopPropagation();
        $rootScope.projectType = 'Add Project';
        document.getElementById('ProjectForm').reset();
        $('#ProjectModal').modal('show');
    };
    //Settings section
    $scope.setPermissions = function(userData) {
        var accesslevel = Number(userData.accesslevel);
        Services.postURL("/setPermissions", {
            "accesslevel": accesslevel,
            "id": userData.id
        }).then(function(d) {
            var msg = '';
            if (accesslevel === 1) {
                msg = 'Added lead permissions to ';
            } else {
                msg = 'Removed lead permissions to ';
            }
            showStatus(d, msg + userData.firstname + ' ' + userData.lastname);
            if (d.message === 'success' && $rootScope.projectType === 'Add Project') {
                $rootScope.getProjects();
            }
        }, function(e) {
            console.log(e);
        });
    }
});

app.controller('ProjectController', function($scope, $rootScope, Services) {
    var tempObj = null;
    $rootScope.$on('editProject', function() {
        Services.getURL('/getProject?id=' + $rootScope.projectId).then(function(d) {
            var s1 = new Date(d.startdate);
            var s2 = new Date(d.enddate);
            var e1 = document.getElementById('startdate');
            var e2 = document.getElementById('enddate');
            e1.valueAsDate = s1;
            e2.valueAsDate = s2;
            var obj = {
                name: d.name,
                description: d.description,
                startdate: e1.value,
                enddate: e2.value,
                id: d.id
            };
            tempObj = JSON.parse(angular.toJson(obj));
            $scope.project = tempObj;
            //$scope.reset();
            $('#ProjectModal').modal('show');
        }, function(e) {
            console.log(e);
        });
    });
    var empty = {
        name: '',
        description: '',
        startdate: '',
        enddate: ''
    };
    $scope.project = empty;

    $scope.close = function() {
        $scope.project = empty;
    };

    $scope.saveProject = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.ProjectForm.$valid) {
            if (document.getElementById('enddate').valueAsNumber > document.getElementById('startdate').valueAsNumber) {
                var url, msg = '',
                projectname = document.getElementById('projectname').value;
                if ($rootScope.projectType === 'Edit Project') {
                    url = '/editProject';
                    msg = 'Project ' + projectname + ' edited';
                } else {
                    url = '/saveProject';
                    msg = 'Project ' + projectname + ' created';
                }
                var model = JSON.parse(angular.toJson($scope.project));

                Services.postURL(url, model).then(function(d) {
                    showStatus(d, msg);
                    if (d.message === 'success' && $rootScope.projectType === 'Add Project') {
                        $rootScope.getProjects();
                    }
                }, function(e) {
                    console.log(e);
                });

                $('#ProjectModal').modal('hide');
                //document.forms['ProjectForm'].reset();
            } else {
                $('#errorContainer').html('<LI>End Date should be Greater than Start Date</LI>');
            }
        }
    };
    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        if ($rootScope.projectType === 'Edit Project') {
            if (tempObj) {
                var o = JSON.parse(angular.toJson(tempObj));
                $scope.$broadcast('show-errors-reset');
                $scope.project = o;
            }
        } else {
            document.forms['ProjectForm'].reset();
        }
    };
});

//SOW scenarios..
app.controller('SowController', function($scope, $rootScope, Services, $filter) {
    $scope.sowproject = resetModel();
    $scope.saveSow = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.SowForm.$valid) {
            var model = JSON.parse(angular.toJson($scope.sowproject));
            //model.name = $('#resourceName').val();
            model.userid = $rootScope.userid;
            model.id = $rootScope.projectid;
            var msg = $rootScope.resourcefullname + ' added to project ' + $rootScope.projectname;
            Services.postURL('/addResourceToProject', model).then(function(d) {
                if (d.message === 'success') {
                    $('#AddDateModal').modal('hide');
                    document.getElementById('SowForm').reset();
                    $scope.$broadcast('show-errors-reset');
                    $scope.sowproject = resetModel();
                    var tempArr = $filter('filter')($rootScope.TeamUsers, {
                        username: $rootScope.resourcename
                    });

                    var proj = $filter('filter')($rootScope.Projects, {
                        name: $rootScope.projectname
                    });                    

                    if (proj.length) {
                        proj[0].count++;
                    }
                    var res = tempArr[0];
                    //code to increment project count
                    res.projectCount++;
                    res.startdate = d.data.startdate;
                    res.enddate = d.data.enddate;
                    res.billable = d.data.billable;


                    //start

                    var total = calcBusinessDays(new Date(d.data.startdate), new Date(d.data.enddate)),
                    spent = toHrs(d.data.logged),
                    bal = (total - spent).toFixed(2),
                    percent = (spent / total) * 100;

                    res.total = total;
                    res.logged = spent;
                    res.bal = bal;
                    res.percent = percent;
                    //end

                    x.push(res);
                    //code to increment project count
                }
                showStatus(d, msg);
            }, function(e) {
                console.log(e);
            });
            /*}else {
             $('#errorContainer').html('<LI>End Date should be Greater than Start Date</LI>');
         }*/
     }
 };

 function resetModel() {
    return {
        sowprojectdescription: '',
        sowstartdate: '',
        sowenddate: '',
        billable: false
    };
}
});