angular.module("TabsModel", [])
	.controller('tabsCtrl', ['$scope', '$rootScope', '$ionicPopover', '$ModalServ', '$cordovaBarcodeScanner', '$JsonServ', '$Sqlite', '$stateParams', '$state',
		function($scope, $rootScope, $ionicPopover, $ModalServ, $cordovaBarcodeScanner, $JsonServ, $Sqlite, $stateParams, $state) {
			$scope.language = $rootScope.Language.tabs;
			//获取页面语言
			$scope.tabs = {
				wechat: $scope.language.wechat,
				addresslist: $scope.language.addresslist,
				find: $scope.language.find,
				me: $scope.language.me,
				groupchat: $scope.language.groupchat,
				add: $scope.language.add,
				scancode: $scope.language.scancode
			};
			//$ionicPopover弹出右上角提示框
			$ionicPopover.fromTemplateUrl('resource/popover.html', {
				scope: $scope
			}).then(function(popover) {
				$scope.popover = popover;
			})
			//显示右上角弹出框
			$scope.showPop = function($event) {
				$scope.popover.show($event);
			}
			//选择右上角弹出框
			$scope.selectPop = function(choose) {
				if (choose == 2) {
					$rootScope.Modals["addfriendModal"].show();
				} else if (choose == 3) {
					$scope.scanCode();
				}
				$scope.popover.hide();
			};
			//$on用于接收event和data
			$scope.$on("EmitAddContact", function(event, data) {
				//$broadcast将事件向下传播到所有子作用域包括自己
				$scope.$broadcast("AddContact", data);
			});
			//获取添加朋友弹出模块
			$ModalServ.initModal($scope, "addfriend").then(function(modal) {
				$rootScope.Modals = modal;
			}); //自动创建Modal
			
			$scope.closeRootModal = closeRootModal;
			$scope.openRootModal = openRootModal;
			//显示弹出框
			function openRootModal(modal) {
				$rootScope.Modals[modal + "Modal"].show();
			};
			//隐藏弹出框
			function closeRootModal(modal) {
				$rootScope.Modals[modal + "Modal"].hide();
			};

			$scope.scanCode = scanCode;
			//扫描二维码
			function scanCode() {
				$scope.barcodeData = "";
				document.addEventListener("deviceready", function() {
					$cordovaBarcodeScanner.scan().then(function(barcodeData) {
						// Success! Barcode data is here
						$scope.barcodeData = barcodeData;
						alert("We got a barcode\n" + "Result: " + barcodeData.text + "\n" + "Format: " + barcodeData.format + "\n" + "Cancelled: " + barcodeData.cancelled);
					}, function(error) {
						// An error occurred
						alert(error)
					});
					//					// NOTE: encoding not functioning yet
					//					$cordovaBarcodeScanner
					//						.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
					//						.then(function(success) {
					//							// Success!
					//						}, function(error) {
					//							// An error occurred
					//						});
				}, false);
			};
			$scope.AddContactsData = AddContactsData;
			//用于测试，添加聊天数据
			function AddContactsData() {
				$JsonServ.get("contacts").then(function(data) {
					for (var i = 0; i < data.length; i++) {
						$Sqlite.AddContacts(data[i]);
					}
				})
			}
			//返回微信页面
			$scope.GoDefail = function() {
				if (!$stateParams.contactId) {
					$state.go("tab.weixin");
				}
			}
			//默认标题栏隐藏
			$scope.showTabs = function() {
				$rootScope.hideTabs = false;
			}
		}
	]);