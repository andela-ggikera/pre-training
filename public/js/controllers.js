angular
.module('simple.controllers', [])
.controller('MainController', ['$scope', 'SimpleApiService', '$mdDialog', function($scope, SimpleApiService, $mdDialog) {

	$scope.getNames = function ($index) {
		$scope.users = {};
		SimpleApiService.getNames().then(function (results) {
			console.log(results);
			$scope.users.names = results;
			$scope.selectedName = results[$index];
		})
	};
	$scope.selectedName = {};
	$scope.getNames(0);

	$scope.createNewUser = function () {
		$scope.users.newUser = true;
		$scope.selectedName = {};
	}

	$scope.selectName = function (name) {
		$scope.selectedName = name;
		$scope.users.newUser = false;
	}

	$scope.saveUser = function () {
		if ($scope.users.newUser) {
			SimpleApiService.addName($scope.selectedName).then(function (results) {
				$scope.getNames($scope.users.length - 1)
			})
		}
		else {
			SimpleApiService.editName($scope.selectedName).then(function (results) {
				$scope.getNames($scope.users.length -1);
			})
		}
	}
	$scope.removeUser = function ($index) {
		var confirmation = $mdDialog.confirm()
          .title('Delete a name')
          .content('Are you sure you want to Delete ' + $scope.selectedName.name + '?')
          .ariaLabel('Delete User')
          .ok('Yes')
          .cancel('Cancel');
        $mdDialog.show(confirmation).then(
          function() {
            SimpleApiService.removeName($scope.selectedName._id).then(function(res) {
                // success
                $scope.getNames(0);
              });
          });
	};



}]);