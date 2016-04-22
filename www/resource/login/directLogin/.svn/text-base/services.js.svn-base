loginModle
	.factory('$DirectLoginServ', ['$JsonServ', '$state','$ionicPopup','$rootScope','$LoaclStorage',
		function($JsonServ, $state,$ionicPopup,$rootScope,$LoaclStorage) {
			var service = {
				checkLogin:checkLogin
			}
			return service;
			
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