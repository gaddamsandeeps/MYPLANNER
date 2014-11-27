var app = angular.module('resourceTracking', ['resourceTracking.directives']);
app.controller('TeamCtrl', function ($scope, $http, $filter,$window) {
		//Teams
		$http.get('getTeams').then(function (obj) {
			$scope.teams = obj.data;
		}, function (e) {
			console.log(e);
		});

		$scope.getTeamReport = function(team) {
			$window.location.href = 'getTeamReport?teamId='+team.id;
		}    
	});

