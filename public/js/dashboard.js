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

app.controller('genericCtrl', function($http, $rootScope, Services) {

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
                if ($rootScope.TeamUsers[i].accesslevel > 1) {
                    $rootScope.TeamUsers[i].check = true;
                } else {
                    $rootScope.TeamUsers[i].check = false;
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
        Services.getURL('getProjectsByTeamId').then(function(d) {
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
    $rootScope.removeUser = function(uid, name, currentIndex, teamUsers) {

        $rootScope.teamUsers = teamUsers;

        var dashBdResourceHandler = $rootScope.TeamUsers;
        var removeResourceHandler, searchIndex = -1;
        bootbox.confirm("Do you want to continue ?", function(result) {
            if (!result) {
                return;
            }
            var obj = {
                id: uid
            };
            removeResourceHandler = Services.postURL('/removeUser', obj);
            removeResourceHandler.then(function(arg) {
                teamUsers.splice(currentIndex, 1);
                for (var i = 0; i < dashBdResourceHandler.length; i++) {
                    if (dashBdResourceHandler[i].id == uid) {
                        searchIndex = i;
                        break;
                    }
                    if (searchIndex != -1) {
                        dashBdResourceHandler.splice(searchIndex, 1);
                    }
                }
                showStatus(arg, "Resource " + name + " deactivated");
            }, function(e) {
                console.log(e);
            });
        });
    };
});

app.controller('projectViewController', function($scope, $rootScope, Services, $filter) {
    //droppedProjects
    $rootScope.$on('editProjectName', function() {

        var currentProj = $filter('filter')($scope.droppedProjects, {
            id: $rootScope.curProjectHandler.id
        });

        if (currentProj.length) {
            currentProj[0].name = $rootScope.curProjectHandler.name;
            currentProj[0].startdate = $rootScope.curProjectHandler.startdate || $("#ProjectModal #startdate").val();
            currentProj[0].enddate = $rootScope.curProjectHandler.enddate || $("#ProjectModal #enddate").val();
            currentProj[0].description = $rootScope.curProjectHandler.description || $("#ProjectModal #projectdescription").val();
            currentProj[0].diff = currentDateStatus(currentProj[0].enddate, currentProj[0].startdate);
            currentProj[0].currentdate = todaysDate();
        }
    });


    $scope.droppedProjects = {};
    Services.getURL('/getMyProjects').then(function(d) {

        var total = 0,
            spent = 0,
            bal = 0,
            percent = 0;
        for (var i = 0; i <= d.length - 1; i++) {
            for (var j = 0; j <= d[i].users.length - 1; j++) {
                spent = toHrs(d[i].users[j].logged);
                d[i].users[j].logged = spent;

                /*Billing Validity control*/


                var validityCtrlClass, validityStatus;

                if (d[i].users[j].billable === 1) {
                    if (d[i].users[j].days < 0) {
                        validityCtrlClass = 'inactive-billing';
                        validityStatus = "Billing completed for current project."
                    } else if (d[i].users[j].days >= 0 && d[i].users[j].days <= 5) {
                        validityCtrlClass = 'near-end-billing';
                        validityStatus = "Billing will be completed within next 5 days.";
                    } else {
                        validityCtrlClass = 'active-billing';
                        validityStatus = "Active billing."
                    }
                }
                if (d[i].users[j].billable !== 1) {
                    validityCtrlClass = "non-billable";
                    validityStatus = "Not billable for current project.";
                    d[i].users[j].sowno = "NA";
                } else {
                    sowno = d[i].users[j].sowno;
                }

                d[i].users[j].validityCtrlClass = validityCtrlClass;
                d[i].users[j].validityStatus = validityStatus;

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
            id: projectid,
            name: projectname
        });
        if (check.length === 0) {
            Services.getURL('/addMyProject?id=' + projectid).then(function(d) {
                d.diff = currentDateStatus(d.enddate, d.startdate);
                d.currentdate = todaysDate();
                var total = 0,
                    spent = 0,
                    bal = 0,
                    percent = 0;
                for (var j = 0; j <= d.users.length - 1; j++) {
                    spent = toHrs(d.users[j].logged);
                    d.users[j].logged = spent;

                    total = calcBusinessDays(new Date(d.users[j].startdate), new Date(d.users[j].enddate));
                    d.users[j].total = total;

                    bal = (total - spent).toFixed(2);
                    d.users[j].bal = bal;

                    d.users[j].percent = (spent / total) * 100;
                    if (d.users[j].billable === 1) {
                        if (d.users[j].days < 0) {
                            d.users[j].validityCtrlClass = 'inactive-billing';
                            d.users[j].validityStatus = "Billing completed for current project."
                        } else if (d.users[j].days >= 0 && d.users[j].days <= 5) {
                            d.users[j].validityCtrlClass = 'near-end-billing';
                            d.users[j].validityStatus = "Billing will be completed within next 5 days.";
                        } else {
                            d.users[j].validityCtrlClass = 'active-billing';
                            d.users[j].validityStatus = "Active billing."
                        }
                    }
                    if (d.users[j].billable !== 1) {
                        d.users[j].validityCtrlClass = "non-billable";
                        d.users[j].validityStatus = "Not billable for current project."
                        d.users[j].sowno = "NA";
                    } else {
                        d.sowno = d.users[j].sowno;
                    }
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

        document.getElementById('SowForm').reset();

        //$scope.reset();

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
                $rootScope.projectresourceid = obj.projectresourceid;
                $rootScope.projectid = projectid;
                $rootScope.resourcename = resourcename;
                $rootScope.resourcefullname = resourcefullname;
                $rootScope.projectname = projectname;

                $('#resourceName').val(resourcefullname);
                $("#saveSow").show();
                $("#editSow").hide();
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
        console.log($scope.droppedProjects);
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

    $scope.editResource = function(p, d) {

        $rootScope.curResourceHandler = d;
        $rootScope.curProjectHandler = p;
        $rootScope.userid = d.id;
        $rootScope.projectresourceid = d.projectresourceid;
        $rootScope.projectid = p.id;
        $rootScope.projectname = p.name;
        $rootScope.sowno = d.sowno;
        $rootScope.resourcefullname = d.firstname + " " + d.lastname;

        var sowproject = {
            name: d.firstname + " " + d.lastname,
            sowprojectdescription: d.description,
            sowstartdate: d.startdate,
            sowenddate: d.enddate,
            billable: d.billable,
            sowno: d.sowno
        };

        $("#saveSow").hide();
        $("#editSow").show();
        $('#AddDateModal').modal('show');
        $rootScope.$broadcast("updatesowmodelevent", sowproject);
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
                userid: userObj.id,
                projectname: project.name,
                projectresourceid: userObj.projectresourceid
            };
            var msg = userObj.firstname + ' ' + userObj.lastname + ' removed from project ' + project.name;
            Services.postURL('/removeResourceFromProject', obj, msg);
        }

        //location.reload();
    };

    $scope.editProject = function(p, id) {

        $rootScope.curProjectHandler = p;
        $rootScope.projectType = 'Edit Project';
        $rootScope.projectId = id;
        $rootScope.$broadcast('editProject');
    };



    $scope.removeProject = function(p, id, projects, currentIndex) {

        var dashBdProjectsHandler = $scope.droppedProjects;
        var removeProjectHandler, searchIndex = -1;
        bootbox.confirm("Do you want to remove the project ?", function(result) {

            if (!result) {
                return;
            }
            var obj = {
                id: id
            };
            var msg = 'Project ' + p.name + ' removed';
            removeProjectHandler = Services.postURL('/removeProject', obj, msg);
            removeProjectHandler.then(function(arg) {
                projects.splice(currentIndex, 1);
                for (var i = 0; i < dashBdProjectsHandler.length; i++) {

                    if (dashBdProjectsHandler[i].id == id) {
                        searchIndex = i;
                        break;
                    }
                };
                if (searchIndex != -1) {
                    dashBdProjectsHandler.splice(searchIndex, 1);
                }
            });;
        });
    };

    $scope.addProject = function(e) {
        e.stopPropagation();
        $rootScope.projectType = 'Add Project';
        document.getElementById('ProjectForm').reset();
        $('#ProjectModal').modal('show');
    };
    //Settings section
    $scope.setPermissions = function(userData) {
        var accesslevel = 1;
        if (userData.check) {
            accesslevel = 2;
        }
        console.log(userData);
        Services.postURL("/setPermissions", {
            "accesslevel": accesslevel,
            "id": userData.id
        }).then(function(d) {
            var msg = '';
            if (accesslevel === 2) {
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
    };

    $scope.reset = function() {
        $rootScope.$broadcast('show-errors-reset');
        $scope.project = {};
        $scope.sowproject = {};
        $('#sownodisplay').removeAttr('show-errors');
        $('#errorContainer').empty();
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

    $scope.close = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.project = {};
        $scope.sowproject = {};
        $('#errorContainer').empty();
    };

    $scope.saveProject = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.ProjectForm.$valid) {
            if (document.getElementById('enddate').valueAsNumber > document.getElementById('startdate').valueAsNumber) {
                var url, msg = '',
                    projectname = document.getElementById('projectname').value;
                if ($rootScope.projectType === 'Edit Project') {
                    url = '/editProject';
                    msg = 'Project ' + projectname + ' updated';
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

                    if (d.message === 'success' && $rootScope.projectType === 'Edit Project') {
                        $rootScope.curProjectHandler.name = $("#ProjectForm #projectname").val();
                        $rootScope.$broadcast("editProjectName");
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
    $scope.sowproject = $rootScope.sowproject = resetModel();

    $scope.getSowNumber = function() {
        if ($scope.sowproject.billable) {
            $scope.sowproject.sowno = "";
        } else {
            $scope.sowproject.sowno = "NA";
        }
    };

    $scope.saveSow = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.SowForm.$valid) {
            if ($scope.sowproject.sowenddate >= $scope.sowproject.sowstartdate) {
                $('#sowerrorContainer').empty();
                var model = JSON.parse(angular.toJson($scope.sowproject));
                //model.name = $('#resourceName').val();
                model.userid = $rootScope.userid;
                model.id = $rootScope.projectid;
                model.projectname = $rootScope.projectname;

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

                        if (res.billable === 1) {
                            if (d.data.days < 0) {
                                res.validityCtrlClass = 'inactive-billing';
                                res.validityStatus = "Billing completed for current project."
                            } else if (d.data.days >= 0 && d.data.days <= 5) {
                                res.validityCtrlClass = 'near-end-billing';
                                res.validityStatus = "Billing will be completed within next 5 days.";
                            } else {
                                res.validityCtrlClass = 'active-billing';
                                res.validityStatus = "Active billing."
                            }
                        }

                        if (res.billable !== 1) {
                            res.validityCtrlClass = "non-billable";
                            res.validityStatus = "Not billable for current project."
                            res.sowno = "NA";
                        } else {
                            res.sowno = d.data.sowno;
                        }
                        res.description = d.data.description;
                        res.projectresourceid = d.data.projectresourceid;

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
            } else {
                $('#sowerrorContainer').html('<LI>End Date should be Greater than Start Date</LI>');
            }
        }
    };


    $scope.$on("updatesowmodelevent", function(event, data) {
        $scope.sowproject = data;
        if ($scope.sowproject.billable === 1) {
            $scope.sowproject.billable = true;
        } else {
            $scope.sowproject.billable = false;
        }

    });

    $scope.updateSow = function() {

        if ($scope.SowForm.$invalid) {
            $scope.$broadcast('show-errors-check-validity');
            return;
        }

        $rootScope.sowproject = $scope.sowproject;

        if (!$scope.sowproject.billable) {
            $rootScope.sowproject.billable = 0;
        } else {
            $rootScope.sowproject.billable = 1;
        }



        var model = JSON.parse(angular.toJson($rootScope.sowproject));
        model.userid = $rootScope.userid;
        model.id = $rootScope.projectid;
        model.projectname = $rootScope.projectname;
        model.projectresourceid = $rootScope.projectresourceid;

        var msg = $rootScope.resourcefullname + " 's status updated to project " + $rootScope.projectname;


        if ($scope.sowproject.sowenddate >= $scope.sowproject.sowstartdate) {
            $('#sowerrorContainer').empty();

            Services.postURL('/editResourceOfProject', model).then(function(d) {

                if (d.message === 'success') {
                    $('#AddDateModal').modal('hide');

                    $scope.sowproject = {};

                    var spentTime = toHrs(d.data.logged);
                    d.data.logged = spentTime;

                    var total = calcBusinessDays(new Date(d.data.startdate), new Date(d.data.enddate));
                    d.data.total = total;

                    var bal = (total - spentTime).toFixed(2);
                    d.data.bal = bal;

                    d.data.percent = (spentTime / total) * 100;

                    $rootScope.curResourceHandler.firstname = d.data.firstname;
                    $rootScope.curResourceHandler.lastname = d.data.lastname;
                    $rootScope.curResourceHandler.startdate = d.data.startdate;
                    $rootScope.curResourceHandler.enddate = d.data.enddate;

                    if (d.data.billable === 1) {
                        if (d.data.days <= 0) {
                            $rootScope.curResourceHandler.validityCtrlClass = 'inactive-billing';
                            $rootScope.curResourceHandler.validityStatus = "Billing completed for current project."
                        } else if (d.data.days > 0 && d.data.days <= 5) {
                            $rootScope.curResourceHandler.validityCtrlClass = 'near-end-billing';
                            $rootScope.curResourceHandler.validityStatus = "Billing will be completed within next 5 days.";
                        } else {
                            $rootScope.curResourceHandler.validityCtrlClass = 'active-billing';
                            $rootScope.curResourceHandler.validityStatus = "Active billing."
                        }
                    }

                    if (d.data.billable !== 1) {
                        $rootScope.curResourceHandler.validityCtrlClass = "non-billable";
                        $rootScope.curResourceHandler.validityStatus = "Not billable for current project.";
                        $rootScope.curResourceHandler.sowno = "NA";
                    } else {
                        $rootScope.curResourceHandler.sowno = d.data.sowno;
                    }
                    $rootScope.curResourceHandler.logged = d.data.logged;
                    $rootScope.curResourceHandler.total = d.data.total;
                    $rootScope.curResourceHandler.bal = d.data.bal;
                    $rootScope.curResourceHandler.percent = d.data.percent;
                    $rootScope.curResourceHandler.description = d.data.description;
                    $rootScope.curResourceHandler.billable = d.data.billable;
                }
                showStatus(d, msg);
            }, function(e) {
                console.log(e);
            });
        } else {
            $('#sowerrorContainer').html('<LI>End Date should be Greater than Start Date</LI>');
        }
    };

    $scope.closeSow = function() {
        $scope.sowproject = {};
        $scope.$broadcast('show-errors-reset');
        $('#errorContainer').empty();
        $('#sowerrorContainer').empty();
    };

    function resetModel() {
        return {
            sowprojectdescription: '',
            sowstartdate: '',
            sowenddate: '',
            sowno: '',
            billable: false
        };
    }
});
