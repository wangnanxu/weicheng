angular.module("modalModel", []).factory('$ModalServ', ['$q', '$ionicModal','$rootScope',
	function($q, $ionicModal,$rootScope) {
		var ModalsObject ={
			mailList: ["mailList/","contactinfoModal"],
			user:["user/","userModal", "gearModal"],
			weixin:["weixin/","contactModal"],
			addfriend:["commPage/addFriend/","addfriendModal"]
		}
		var service = {
			initModal: initModal
		}
		return service;
		//初始化弹出框
		function initModal($scope,param) {
			var Modals = ModalsObject[param]
			var q = $q.defer();
			var modalobjects = {};
			var i = 1;
			createModal(i)

			function createModal(i) {
				if (Modals[i]) {
					$ionicModal.fromTemplateUrl("resource/"+Modals[0] + Modals[i] + ".html", {
						scope: $scope,
						animation: 'slide-in-up'
					}).then(function(modal) {
						modalobjects[Modals[i]] = modal;
						createModal(i + 1);
					});
				} else {
					q.resolve(modalobjects);
				}
			}
			return q.promise;
		};
	}
]);