loginModle
	.controller('DirectLoginCtrl', ['$scope', '$DirectLoginServ', '$rootScope', '$ionicPopup', '$state', '$ionicActionSheet','$LoaclStorage',
		function($scope, $DirectLoginServ, $rootScope, $ionicPopup, $state, $ionicActionSheet,$LoaclStorage) {
			$scope.language = $rootScope.Language.directlogin;
			$scope.userinfo = $LoaclStorage.getObject("userinfo");
			$scope.doLogin = doLogin;
			$scope.showPopup = function() {
				// 一个精心制作的自定义弹窗
				$scope.morePopup = $ionicPopup.show({
					title: "更多",
					template: '<div class="list"><a class="item" ng-click="hidePopup(\'account\')">{{language.changeaccount}}</a><a class="item" ng-click="hidePopup(\'regist\')">{{language.registbtn}}</a></div>',
					scope: $scope
				});
			};
			$scope.hidePopup = function(state) {
				$scope.morePopup.close();
				$state.go(state)
			}
			$scope.show = function() {
				var _changeaccount = $scope.language.changeaccount;
				var _registbtn = $scope.language.registbtn;
				var _more = $scope.language.more;
				var _cancel = $scope.language.cancel;
				$scope.hideSheet =$ionicActionSheet.show({
					buttons: [{
						text: _changeaccount
					}, {
						text: _registbtn
					}, ],
					titleText: _more,
					cancelText: _cancel,
					buttonClicked: function(index) {
						if (index == 0) {
							$state.go("account");
						} else if (index == 1) {
							$scope.hideSheet();
							$state.go("regist");
						}
					}
				});
			};
			
			function doLogin() {
				$DirectLoginServ.checkLogin($scope.userinfo);
			};
		}
	]);