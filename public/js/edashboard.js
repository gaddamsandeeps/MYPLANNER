var app = angular.module('resourceTracking', ['resourceTracking.directives']);


/*****tab group names*****/

app.directive("edTab", function() {
    return {
        restrict: "A",
        link: function(scope, element, attributes, ctlr) {
            element.off().on("click", function(e) {
                $(".group-name").removeClass("active");
                element.addClass("active");
                scope.getActiveProjects(element.data("teamid"));
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

app.controller('genericCtrl', function($scope, $rootScope, Services, $http) {

    $scope.droppedProjects = [];
    $(".group-name").eq(0).addClass("active");
    var initalTeamId = $(".group-name").eq(0).data("teamid");
    $rootScope.teamId = initalTeamId;
    var activeProjectHandler = getActiveProjectsData(initalTeamId);
    activeProjectHandler.success(function(resp) {
        for (var i = 0; i < resp.length; i++) {
            if (resp[i].users.length == 0) {
                $('#showreports').addClass('hidechart');
            } else {
                $('#showreports').removeClass('hidechart');
            }
        }
        $scope.droppedProjects = resourceBillingController(resp);
    });

    $scope.displayChart = function(p) {

        p.chartOpened = !p.chartOpened;

        if (!p.chartOpened) {
            $('#' + p.id).addClass('hidechart');
            return;
        }


        Services.getURL('/getDetailedProjectReportLogs?id=' + p.id + '&teamid=' + $rootScope.teamId).then(function(d) {
            var usersData = [],
                billable = 'Billable',
                nonBillable = 'Non Billable',
                existflag = false;

            for (var i in d) {
                if (d[i].billable == 1) {
                    if (usersData.hasOwnProperty(billable)) {
                        usersData[billable] = (d[i].logged + usersData[billable]);
                    } else {
                        usersData[billable] = d[i].logged;
                    }
                    existflag = true;
                } else {
                    if (usersData.hasOwnProperty(nonBillable)) {
                        usersData[nonBillable] = (d[i].logged + usersData[nonBillable]);
                    } else {
                        usersData[nonBillable] = d[i].logged;
                    }
                    existflag = true;
                }
            }
            if (existflag) {
                generateCharts(p.id, p.name + ' Resource Spent Hours', usersData);
                if ($('#' + p.id).hasClass('hidechart')) {
                    $('#' + p.id).removeClass('hidechart');
                } else {
                    $('#' + p.id).addClass('hidechart');
                }
                existflag = false;
            } else {

            }
        }, function(e) {
            console.log(e);
        });
    };

    function generateCharts(target, title, data) {
        $('#' + target).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                width: "300",
                height: "200"
            },
            credits: {
                enabled: false
            },
            title: {
                text: title,
                style: {
                    "font-size": "10px",
                    "font-weight": "bold"
                }
            },
            tooltip: {
                formatter: function() {
                    return this.percentage.toFixed(2) + ' %';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>' + this.point.title + '</b>: ' + toHrs(this.point.y) + ' Hrs';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Project share',
                data: chartObj(data)
            }]
        });
    }

    function getActiveProjectsData(teamId) {
        var activeProjectHandler = $http({
            url: 'getActiveProjectsByTeamId?teamid=' + teamId,
            method: 'GET',
            contentType: 'application/json'
        });
        return activeProjectHandler;
    }

    function resourceBillingController(d) {

        var total = 0,
            spent = 0,
            bal = 0,
            percent = 0;
        for (var i = 0; i < d.length; i++) {
            if (d[i].users && d[i].users.length) {
                for (var j = 0; j < d[i].users.length; j++) {
                    spent = toHrs(d[i].users[j].logged);
                    d[i].users[j].logged = spent;



                    /*Billing Validity control*/


                    var billingNearEndDate = new Date(d[i].users[j].enddate);
                    var nearFactor = new Date(d[i].users[j].enddate).getDate() - 5;
                    billingNearEndDate.setDate(nearFactor);
                    var billingNearEndDateTime = billingNearEndDate.getTime();


                    var billingEndTime = new Date(d[i].users[j].enddate).getTime();
                    var currentDateTime = new Date().getTime();

                    var validityCtrlClass, validityStatus;

                    if (currentDateTime >= billingNearEndDateTime && currentDateTime <= billingEndTime) {
                        validityCtrlClass = "near-end-billing";
                        validityStatus = "Billing will be completed within next 5 days.";
                    } else if (currentDateTime < billingEndTime) {
                        validityCtrlClass = "active-billing";
                        validityStatus = "Active billing."
                    } else if (currentDateTime > billingEndTime) {
                        validityCtrlClass = "inactive-billing";
                        validityStatus = "Billing completed for current project."
                    }
                    if (!d[i].users[j].billable) {
                        validityCtrlClass = "non-billable";
                        validityStatus = "Not billable for current project."
                        d[i].users[j].sowno = "NA";
                    }

                    d[i].users[j].validityCtrlClass = validityCtrlClass;
                    d[i].users[j].validityStatus = validityStatus;

                    total = calcBusinessDays(new Date(d[i].users[j].startdate), new Date(d[i].users[j].enddate));
                    d[i].users[j].total = total;

                    bal = (total - spent).toFixed(2);
                    d[i].users[j].bal = bal;

                    d[i].users[j].percent = (spent / total) * 100;



                }
            }

            d[i].diff = currentDateStatus(d[i].enddate, d[i].startdate);

            d[i].currentdate = todaysDate();

        }
        return d;
    }

    $scope.getActiveProjects = function(teamId) {
        $rootScope.teamId = teamId;
        var activeProjectHandler = getActiveProjectsData(teamId);
        activeProjectHandler.success(function(resp) {
            $scope.droppedProjects = resourceBillingController(resp);
        });
    }

});

function chartObj(obj) {
    return Object.keys(obj).map(function(value, index) {
        return {
            title: value,
            y: obj[value]
        };
    });
}
