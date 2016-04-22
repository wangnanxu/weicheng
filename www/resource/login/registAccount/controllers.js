loginModle
	.controller('RegistAccountCtrl', ['$scope', '$RegistAccountServ', '$rootScope', '$ionicModal', '$state',
		function($scope, $RegistAccountServ, $rootScope, $ionicModal, $state) {
			$scope.language = $rootScope.Language.registaccount;
			$scope.openModal = openModal;
			$scope.closeModal = closeModal;
			$scope.changeCounty = changeCounty;
			$scope.initModal = initModal;
			$scope.initModal();
			$scope.selectCountry = {
				country: "中国",
				areacode: "+86"
			};
			$scope.register = {
				nickname: "启程",
				account: "18723137796",
				password: "123456",
				image:"img/ionic.png"
			};
			$scope.doLogin = doLogin;
			$scope.countrys = [];
			$RegistAccountServ.getCountry().then(function(data) {
				$scope.countrys = data;
			});

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
				$RegistAccountServ.doLogin($scope.register);
			};
		}
	])