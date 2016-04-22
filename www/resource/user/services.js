userModel.factory('$UserServ', ['$ModalServ', '$q','$ionicActionSheet','$state','$rootScope','$LoaclStorage',
	function($ModalServ, $q,$ionicActionSheet,$state,$rootScope,$LoaclStorage) {
		var Modals = ["userModal", "gearModal"];
		var service = {
			initModal: initModal,
			showSheet: showSheet
		};
		return service;

		function initModal($scope){
				var q= $q.defer();
				$ModalServ.initModal($scope,"user").then(function(data){
					q.resolve(data)
				});
				return q.promise;
			};

		function showSheet($scope) {
			var _loginout = $scope.language.loginout;
			var _quit = $scope.language.quit;
			var _cancel = $scope.language.cancel;
			$ionicActionSheet.show({
				buttons: [{
					text: _loginout
				}, {
					text: _quit
				}, ],
				titleText: _quit,
				cancelText: _cancel,
				buttonClicked: function(index) {
					if (index == 0) {
						$scope.Modals["gearModal"].hide();
						$state.go("direct");
					} else if (index == 1) {
						$rootScope.ExitApp();
					}
				}
			});
		};


	}
]);