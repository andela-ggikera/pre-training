angular
.module('simple.controllers', [])
.controller('MainController', ['$scope', 'SimpleApiService', '$mdDialog', function($scope, SimpleApiService, $mdDialog) {

	$scope.getNames = function($index) {
		$scope.users = {};
		SimpleApiService.get().then(function (results) {
			console.log(results);
			$scope.users.names = results;
			$scope.selectName = results[$index];
		})
	}

}]);