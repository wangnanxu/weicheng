userModel
	.controller('UserCtrl', ['$scope', '$UserServ', '$rootScope', '$ionicFtActionSheet', '$state', '$ionicModal', '$LoaclStorage', '$cacheFactory',
		function($scope, $UserServ, $rootScope, $ionicFtActionSheet, $state, $ionicModal, $LoaclStorage, $cacheFactory) {
			$scope.language = $rootScope.Language.user; //获取语言
			$scope.userinfo = $rootScope.userinfo; //获取userinfo用户信息
			$scope.userinfo = $LoaclStorage.getObject("userinfo");
			$scope.openModal = openModal; //打开Modal，传入参数modal名字
			$scope.closeModal = closeModal; //关闭Modal，传入参数modal名字
			$scope.show = show; //显示action sheet
			$scope.Modals = {}; //初始化modal
			$UserServ.initModal($scope).then(function(modal) {
				$scope.Modals = modal;
			}); //自动创建Modal

			function show() {
				$UserServ.showSheet($scope);
			};

			function openModal(modal) {
				$scope.Modals[modal + "Modal"].show();
			};

			function closeModal(modal) {
				$scope.Modals[modal + "Modal"].hide();
			};

			$scope.showSheet = function() {
				$ionicFtActionSheet.show({
					buttons: [{
						img: "img/qq.jpg",
						text: "QQ"
					}, {
						img: "img/wechat.jpg",
						text: "微信"
					}],
					titleText: "分享",
					cancelText: "取消",
					buttonClicked: function(index) {
						if (index == 0) {} else if (index == 1) {}
					}
				});
			}
			$scope.keys = [];
			$scope.cache = $cacheFactory('cacheId');
			$scope.put = function(key, value) {
				if ($scope.cache.get(key) === undefined) {
					$scope.keys.push(key);
				}
				$scope.cache.put(key, value === undefined ? null : value);
			};
		}
	])