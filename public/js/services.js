(function() {
'use strict';

angular.module('simple.services', [])
.factory('SimpleApiService', ['$q', '$http', function($q, $http) {
	var apiUrl = '/api/simple/';

	// get verb: get all the names from the collection
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
	// post verb: add a new name to the collection
	var addName = function (name) {
		return $q(function (resolve, reject) {
			$http.post(apiUrl, name).success(function(results) {
				resolve(results);
			})
			.error(function (error) {
				reject(error);
			});
		});
	};
	// put verb: edit an existing name from the collection
	var editName = function (name) {
		return $q(function (resolve, reject) {
			$http.put(apiUrl, name).success(function (results) {
				resolve(results);
			})
			.error(function (error) {
				reject(error);
			});
		});
	};
	// delete verb: delete a name from the collection
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

	// interfaces to access the rest api
	return {
		getNames: getNames,
		addName: addName,
		editName: editName,
		removeName: removeName
	}
}]);

})();