loginModle.factory('$AccountLoginServ', ['$q', '$JsonServ', '$state','$ionicPopup','$rootScope','$LoaclStorage',
	function($q, $JsonServ, $state,$ionicPopup,$rootScope,$LoaclStorage) {
		var service = {
			getCountry: getCountry,
			checkLogin: checkLogin
		};
		return service;

		function getCountry() {
			var q = $q.defer();
			$JsonServ.get("country").then(function(data) {
				q.resolve(data)
			});
			return q.promise;
		};

		function checkLogin(userinfo) {
			$JsonServ.get("userinfo").then(function(data) {
				var _length = data.length;
				var isLogin = false;
				for (var i = 0; i < _length; i++) {
					if (data[i].account == userinfo.account && data[i].password == userinfo.password) {
						$rootScope.userinfo = data[i];
						$LoaclStorage.setObject("userinfo",data[i]);
						isLogin = true;
						break;
					}
				}
				if (isLogin) {
					$state.go("tab.weixin");
				} else {
					$ionicPopup.alert({
						title: '登录错误',
						template: '账号密码错误'
					});
				}

			});
		};
	}
]);