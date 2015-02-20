var app = angular.module('resourceTracking', ['resourceTracking.directives']);

app.controller('projectController', function($scope, $http, $rootScope, $filter) {

    //Projects
    $http.get('/getNonTProjects').then(function(obj) {
        $scope.Projects = obj.data;
    }, function(e) {
        console.log(e);
    });


    $scope.projectAccess = function(project) {
        $http.post('/giveAccessToProjectsByTeamId?id=' + project.id).then(function(obj) {
            showStatus(obj.data, 'Access given to project ' + project.name);
            if (obj.data.message === 'success') {
                var proj = $filter('filter')($scope.Projects, {
                    name: project.name,
                    id: project.id,
                });

                var index = -1;
                for (var i = 0, l = $scope.Projects.length; i < l; i++) {
                    var p = $scope.Projects[i];
                    var pid = p.id;
                    if (pid == project.id) {
                        index = i;
                        break;
                    }
                }

                $scope.Projects.splice(index, 1);
            }
        }, function(e) {
            console.log(e);
        });

    };

});
