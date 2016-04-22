loginModle.controller('AccountLoginCtrl', ['$scope', '$AccountLoginServ', '$rootScope', '$ionicModal', '$state',
	function($scope, $AccountLoginServ, $rootScope, $ionicModal, $state) {
		$scope.language = $rootScope.Language.accountlogin;
		$scope.closeModal = closeModal;
		$scope.changeCounty = changeCounty;
		$scope.doLogin = doLogin;
		$scope.openModal = openModal;
		$scope.initModal = initModal;
		$scope.initModal();
		$scope.selectCountry = {
			country: "中国",
			areacode: "+86"
		};
		$scope.countrys = [];
		$AccountLoginServ.getCountry().then(function(data) {
			$scope.countrys = data;
		})
		$scope.userinfo={
			account:"qc0000",
			password:"123456"
		}
		function initModal() {
			$ionicModal.fromTemplateUrl("resource/login/accountLogin/countryModal.html", {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});
		};

		function openModal() {
			$scope.modal.show();
		};

		function closeModal() {
			$scope.modal.hide();
		};

		function changeCounty(item) {
			$scope.selectCountry = {
				country: item.country,
				areacode: item.areacode
			};
			$scope.closeModal();
		};

		function doLogin() {
			$scope.userinfo.areacode=$scope.selectCountry.areacode;
			$AccountLoginServ.checkLogin($scope.userinfo);
		};
	}
])