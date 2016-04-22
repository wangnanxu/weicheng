mailListModel
	.controller('MailListCtrl', ['$scope', '$MailListServ',
		function($scope, $MailListServ) {
			$MailListServ.all().then(function(data) {
				$scope.contacts = data;
			});
			$scope.alphabet = $MailListServ.alpha();
			$MailListServ.initModal($scope).then(function(modal) {
				$scope.Modals = modal;
			}); //自动创建Modal
			$scope.openModal = openModal; //打开Modal，传入参数modal名字
			$scope.closeModal = closeModal; //关闭Modal，传入参数modal名字
			$scope.GotoSend = GotoSend;
			$scope.alphaScroll = alphaScroll;

			function alphaScroll(id) {
				$MailListServ.alphaScroll(id);
			};

			function openModal(modal, item) {
				$scope.contactinfo = item;
				$scope.Modals[modal + "Modal"].show();
			};

			function closeModal(modal) {
				$scope.Modals[modal + "Modal"].hide();
			};

			function GotoSend() {
				$MailListServ.addSendContact($scope.contactinfo)
//				$scope.$emit("EmitAddContact", $scope.contactinfo);
				$scope.Modals["contactinfoModal"].hide();
			}
		}
	]);