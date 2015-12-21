(function() {
'use strict';

angular.module('simple.services', [])
.factory('SimpleApiService', ['$q', '$http', function($q, $http) {
	var apiUrl = '/api/simple/';

	var getNames = function () {
		return $q(function (resolve, reject) {
			$http.get(apiUrl).success(function (names) {
				resolve(names);
			})
			.error(function (error) {
				reject(error);
			});
		});
	};

	var addName = function (name) {
		return $q(function (resolve, reject) {
			$http.post(apiUrl, name).success(function(name) {
				resolve(name);
			})
			.error(function (error) {
				reject(error);
			});
		});
	};

	var editName = function (name) {
		return $q(function (resolve, reject) {
			$http.put(apiUrl, name).success(function (result) {
				resolve(result);
			})
			.error(function (error) {
				reject(error);
			});
		});
	};

	var removeName = function (id) {
		return $q(function (resolve,  reject) {
			$http.delete(apiUrl + id).success(function (result) {
				resolve(result);
			})
			.error(function (error) {
				reject(error);
			});
		});
	};

	return {
		getNames: getNames,
		addName: addName,
		editName: editName,
		removeName: removeName
	}
}]);

})();