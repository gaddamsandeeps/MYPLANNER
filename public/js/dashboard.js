var app = angular.module('resourceTracking', ['resourceTracking.directives']);
//DIRECTIVES
//PROJECT
app.directive("projectdraggable", function() {
    return {
        restrict: "A",
        link: function(scope, element, attributes, ctlr) {
            element.attr("draggable", true);
            element.bind("dragstart", function(e) {
                e.originalEvent.dataTransfer.setData('projectid', attributes.projectid);
                e.originalEvent.dataTransfer.setData('type', 'project');
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
                var type = e.originalEvent.dataTransfer.getData("type");
                if (type === 'project') {
                    scope.addToProjectsView(Number(e.originalEvent.dataTransfer.getData("projectid")));
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
//RESOURCE
app.directive("resourcedraggable", function() {
    return {
        restrict: "A",
        link: function(scope, element, attributes, ctlr) {
            element.attr("draggable", true);
            element.bind("dragstart", function(e) {
                e.originalEvent.dataTransfer.setData("username", attributes.username);
                e.originalEvent.dataTransfer.setData("type", 'resource');
                if (element[0].tagName === 'SPAN') {
                    e.originalEvent.dataTransfer.setData("operation", 'move');
                    e.originalEvent.dataTransfer.setData("sourceProjectId", element[0].parentElement.getAttribute('projectid'));
                } else {
                    e.originalEvent.dataTransfer.setData("operation", 'copy');
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
                        scope.copyResource(attributes.projectid, o.getData("username"));
                    }
                    if (op === 'move') {
                        scope.moveResource(o.getData("sourceProjectId"), attributes.projectid, o.getData("username"));
                    }
                    e.stopPropagation();
                    e.preventDefault();
                    //location.reload();
                }
                else {
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
        postURL: function(url, obj) {
            var d = $q.defer();
            $http.post(url, obj).then(function(response) {
                d.resolve(response.data);
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
    $rootScope.projectType = 'New Project';
    //TeamUsers
    Services.getURL('getTeamUsersAndAvailability').then(function(d) {
        for (var i = 0; i <= d.length - 1; i++) {
            d[i].resourcelogged = loghours(d[i].logged);
        }
        $rootScope.TeamUsers = d;
    }, function(e) {
        console.log(e);
    });
    //Projects    
    Services.getURL('getProjects').then(function(d) {
        for (var i = 0; i <= d.length - 1; i++) {
            d[i].projectlogged = projectloghours(d[i].count, d[i].logged);
        }
        $rootScope.Projects = d;
    }, function(e) {
        console.log(e);
    });
    $rootScope.showUserTimesheet = function(id) {
        var url = '/usertimesheet?id=' + id;
        location.href = url;
    };
    $rootScope.showUserReport = function(id) {
        var url = '/reports?id=' + id;
        location.href = url;
    };
});
app.controller('projectViewController', function($scope, $rootScope, Services, $filter) {
    //droppedProjects
    $scope.droppedProjects = null;
    Services.getURL('/getMyProjects').then(function(d) {
        for (var i = 0; i <= d.length - 1; i++) {
            d[i].diff = currentDateStatus(d[i].enddate, d[i].startdate);
            d[i].currentdate=todaysDate();
        }
        $scope.droppedProjects = d;
    }, function(e) {
        console.log(e);
    });
    $scope.addToProjectsView = function(item_id) {
        var check = $filter('filter')($scope.droppedProjects, {
            id: item_id
        });
        if (check.length === 0) {
            Services.getURL('/addMyProject?id=' + item_id).then(function(d) {
                $scope.droppedProjects.push(d);
                setTimeout(function() {
                    $scope.$apply();
                }, 100);
            }, function(e) {
                console.log(e);
            });
        }
    };
    $scope.closeView = function(item_id) {
        var index = -1;
        for (var i = 0, l = $scope.droppedProjects.length; i < l; i++) {
            var p = $scope.droppedProjects[i];
            var pid = p.id;
            if (pid == item_id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            $scope.droppedProjects.splice(index, 1);
            var obj = {
                id: pid
            };
            Services.postURL('/removeMyProject', obj);
        }
		////location.reload();
    }
    $scope.copyResource = function(projectid, resourcename) {
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
            var tempSearch = $filter('filter')(resArr, {
                username: resourcename
            });
            if (tempSearch.length === 0) {
                var tempArr = $filter('filter')($rootScope.TeamUsers, {
                    username: resourcename
                });
                resArr.push(tempArr[0]);
                var obj = {
                    id: projectid,
                    userid: tempArr[0].id
                }
                Services.postURL('/addResourceToProject', obj);
                $scope.$apply();
            }
        }
    }
    $scope.moveResource = function(spid, tpid, resourcename) {
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
        var sArr = $scope.droppedProjects[s].users;
        for (i = 0, j = sArr.length; i < j; i++) {
            var tObj = sArr[i];
            if (tObj.username === resourcename) {
                var sPos = i;
                break;
            }
        }
        sArr.splice(sPos, 1);
        var tArr = $scope.droppedProjects[t].users;
        tArr.push(tObj);
        var obj = {
            removepid: spid,
            updatepid: tpid,
            userid: tObj.id
        };
        Services.postURL('/addNRemoveResourceFromProject', obj);
        $scope.$apply();
    };
    $scope.removeResource = function(projectid, userObj) {
        var pindex = -1,
                i, l, p, resArr, dindex;
        for (i = 0, l = $scope.droppedProjects.length; i < l; i++) {
            p = $scope.droppedProjects[i];
            if (p['id'] == projectid) {
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
            var obj = {
                id: projectid,
                userid: userObj.id
            };
            Services.postURL('/removeResourceFromProject', obj);
        }
        //location.reload();
    };
    $scope.editProject = function(id) {
        $rootScope.projectType = 'Edit Project';
        $rootScope.projectId = id;
        $rootScope.$broadcast('editProject');
    };
    $rootScope.projectType = 'Add Project';
    $rootScope.projectId = null;
});

app.controller('AddProjectController', function($scope, $rootScope, Services) {
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

            $scope.project = obj;
            $('#AddProjectModal').modal('show');
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
    $scope.saveProject = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.AddProjectForm.$valid) {
            if (document.getElementById('enddate').valueAsNumber > document.getElementById('startdate').valueAsNumber) {
                var url;
                if ($rootScope.projectType === 'Edit Project') {
                    url = '/editProject';
                } else {
                    url = '/saveProject';
                }
                var model = JSON.parse(angular.toJson($scope.project));
                Services.postURL(url, model).then(function (d) {
                    console.log(d);
                }, function (e) {
                    console.log(e);
                });
                $('#AddProjectModal').modal('hide');
                document.forms['AddProjectForm'].reset();
            } else {
                alert('End Date should be Greater than Start Date');
            }            
        }
    };
    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.project = empty;
    };
});