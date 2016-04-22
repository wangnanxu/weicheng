loginModle
	.factory('$LoginFrontPageServ', ['$JsonServ', '$q','$LoaclStorage','$rootScope',
		function($JsonServ, $q,$LoaclStorage,$rootScope) {
			var service = {
				getLanguage: getLanguage,
				setLanguage:setLanguage
			}
			return service;

			function getLanguage(language) {
				var q = $q.defer();
				$JsonServ.get(language).then(function(data) {
					q.resolve(data)
				});
				return q.promise;
			};
			
			function setLanguage(language){
				$LoaclStorage.set("language",language);
				var q = $q.defer();
				$rootScope.GetLanguage().then(function(data){
					q.resolve(data)
				});
				return q.promise;
			}
		}
	]);