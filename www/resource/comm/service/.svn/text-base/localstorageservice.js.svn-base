angular.module('loaclstorage', []).factory('$LoaclStorage', ['$window',
	function($window) {
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function(key, value) {
				$window.localStorage[key] = angular.toJson(value);
			},
			getObject: function(key,defaultValue) {
				return angular.fromJson($window.localStorage[key] || defaultValue);
			},
			removeItem: function(key) {
				return $window.localStorage.removeItem(key);
			},
			clear: function(key) {
				return $window.localStorage.clear();
			}
		}
	}
]);

angular.module('sqlitedb', []).factory('$SQLite', ['$window',
	function($window) {
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}');
			},
			removeItem: function(key) {
				return $window.localStorage.removeItem(key);
			},
			clear: function(key) {
				return $window.localStorage.clear();
			}
		}
	}
]);