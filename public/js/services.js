'use strict';

angular.module('simple.services', [])
.factory('SimpleApiService', ['$http', function($q, $http) {
	var apiUrl = '/api/simple/';

	return {
		get: get,
		add: add,
		edit: edit,
		remove: remove
	}

	var get = function () {
		return $q(function (resolve, reject) {
			$http.get(apiUrl).success(function (names) {
				resolve(names);
			})
			.error(function (error) {
				reject(error);
			})
		})
	};

	var add = function (name) {
		return $q(function (resolve, reject) {
			$http.post(apiUrl, name).success(function(name) {
				resolve(name);
			})
			.error(function (error) {
				reject(error);
			});
		});
	};

	var edit = function (name) {
		return $q(function (resolve, reject) {
			$http.put(apiUrl, name).success(function (result) {
				resolve(result);
			})
			.error(function (error) {
				reject(error);
			});
		});
	};

	var remove = function (id) {
		return $q(function (resolve,  reject) {
			$http.delete(apiUrl + id).success(function (result) {
				resolve(result);
			})
			.error(function (error) {
				reject(error);
			});
		});
	};
}]);