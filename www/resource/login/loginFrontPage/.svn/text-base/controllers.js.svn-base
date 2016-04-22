loginModle
	.controller('LoginFrontPageCtrl', ['$scope', '$LoginFrontPageServ', '$state', '$rootScope', '$ionicPopover', '$ionicHistory', '$ionicNavBarDelegate',
		function($scope, $LoginFrontPageServ, $state, $rootScope, $ionicPopover, $ionicHistory, $ionicNavBarDelegate) {
			$ionicNavBarDelegate.showBar(false);
			$scope.language = $rootScope.Language.login;
			$scope.loginbtn = $scope.language.loginbtn;
			$scope.registbtn = $scope.language.registbtn;
			$scope.languagebtn = $rootScope.Language.language;


			$scope.selected = {
				language: $rootScope.currentLanguage
			}
			$LoginFrontPageServ.getLanguage("config").then(function(data) {
				$scope.languageslist = data.languageslist;
			});

			$scope.Login = Login;
			$scope.Register = Register;
			$scope.showPop = showPop;
			$scope.selectPop = selectPop;

			function Login() {
				//				$state.go("direct");
				$state.go("account");
			};

			function Register() {
				//				$ionicHistory.nextViewOptions({
				//					disableAnimate: true
				//				});
				$state.go("regist");
			};

			function showPop($event) {
				if (!$scope.popover) {
					$ionicPopover.fromTemplateUrl('resource/login/loginFrontPage/popover.html', {
						scope: $scope
					}).then(function(popover) {
						$scope.popover = popover;
						$scope.popover.show($event);
					})
				} else {
					$scope.popover.show($event);
				}
			};

			function selectPop(language) {
				$LoginFrontPageServ.setLanguage(language).then(function() {
					$scope.language = $rootScope.Language.login;
					$scope.loginbtn = $scope.language.loginbtn;
					$scope.registbtn = $scope.language.registbtn;
					$scope.languagebtn = $rootScope.Language.language;
				});
				$scope.popover.hide();
			};

//			$scope.companys = [{
//				suppliers_id: 1,
//				suppliers_name: "选项1"
//			}, {
//				suppliers_id: 2,
//				suppliers_name: "选项2"
//			}];
//			$scope.driver = {};
//			$scope.driver.suppliers_id = $scope.companys[0].suppliers_id;
		
	}]);