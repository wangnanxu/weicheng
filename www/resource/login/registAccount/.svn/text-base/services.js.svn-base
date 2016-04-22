loginModle
	.factory('$RegistAccountServ', ['$q', '$JsonServ', '$state','$LoaclStorage','$rootScope',
		function($q, $JsonServ, $state,$LoaclStorage,$rootScope) {
			var service = {
				getCountry: getCountry,
				doLogin: doLogin
			}
			return service;

			function getCountry() {
				var q = $q.defer();
				$JsonServ.get("country").then(function(data) {
					q.resolve(data)
				});
				return q.promise;
			};

			function doLogin(register) {
				$LoaclStorage.setObject("userinfo",register);
				$rootScope.userinfo=register;
				$state.go("tab.weixin");
			};
		}
	]);