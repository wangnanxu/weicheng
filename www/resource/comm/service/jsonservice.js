angular.module("JsonModel", []).factory('$JsonServ', ['$http', '$q',
	function($http, $q) {
		var service = {
			get: get
		}
		return service;

		function get(json) {
			var q = $q.defer();
			$http.get('json/' + json + '.json')
				.success(function(data, status, header, config) {
					q.resolve(data)
				}).error(function() {
					q.resolve('加载xml失败')
				});
			return q.promise;
		};
	}
]);