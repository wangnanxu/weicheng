weiXinModel.controller('WXContactCtrl', ['$scope', '$ionicLoading', '$timeout', '$WeiXinServ', '$stateParams', '$ionicScrollDelegate', '$rootScope', '$state', '$ionicTabsDelegate', '$location', '$PhotoSwipe', '$ionicNavBarDelegate', '$ionicFtActionSheet',
	function($scope, $ionicLoading, $timeout, $WeiXinServ, $stateParams, $ionicScrollDelegate, $rootScope, $state, $ionicTabsDelegate, $location, $PhotoSwipe, $ionicNavBarDelegate, $ionicFtActionSheet) {
		$scope.contactId = $stateParams.contactId;
		$scope.contactName = $stateParams.contactName;
		$ionicNavBarDelegate.showBackButton(false);
		$scope.page = 0;
		if ($scope.contactId) {
			$WeiXinServ.getMessages($scope.contactId, $scope.page).then(function(data) {
				$scope.Messages = data;
				$scope.newMessage = {
					Content: "",
					AudioTime: "",
					Type: "text",
					ReceiveID: $scope.contactId
				}
			});
		}
		//接收event和data
		$scope.$on('$ionicView.enter',function(){
//			alert(11);
		})
		//返回微信页面
		$scope.goBack = function() {
			$WeiXinServ.gotoBack();
		}

		$scope.HOL = false;
		$scope.changeHeight = changeHeight;
		//改变高度
		function changeHeight(isTrue, type) {
			if (type) {
				if (isTrue) {
					$scope.HOL = !$scope.HOL;
				} else {
					$scope.HOL = true;
				}
			} else {
				if (isTrue != -1) {
					$scope.HOL = isTrue;
				}
			}
			//延迟
			setTimeout(function() {
				$location.hash("message_" + ($scope.Messages.length - 1));
				$ionicScrollDelegate.$getByHandle('MessagesScroll').anchorScroll();
			}, 150)
		}; 
		/*
		 * HOL:高度是否改变  Low:true  Height:false
		 * type: 0:文本输入框	1:语音
		 * state:语音 down:true  up:false
		 * fo_type: 0:无	 1:语音	2：表情
		 */
		$scope.HOL = true;
		$scope.type = 0;
		$scope.state = true;
		$scope.fo_type = 0;
		$scope.changeFooter = changeFooter;
		//切换页脚
		function changeFooter(type) {
			switch (type) {
				case 0:
					type0(); //录音与输入框切换
					break;
				case 1:
					type1(); //录音显隐切换
					break;
				case 2:
					type2(); //表情显隐切换
					break;
				default:
					typedefalt();
					break;
			}
			$timeout(function() {
				$location.hash("message_" + ($scope.Messages.length - 1));
				$ionicScrollDelegate.$getByHandle('MessagesScroll').anchorScroll();
			}, 150)

			function type0() {
				if ($scope.type == 0) {
					$scope.HOL = false;
					$scope.type = 1;
					$scope.state = true;
					$scope.fo_type = 1;
				} else {
					$scope.HOL = true;
					$scope.type = 0;
					$scope.state = false;
					$scope.fo_type = 0;
				}
			};

			function type1() {
				if ($scope.state == true) {
					$scope.fo_type = 0;
				} else {
					$scope.fo_type = 1;
				}
				$scope.HOL = !$scope.HOL;
				$scope.state = !$scope.state;
			};

			function type2() {
				$scope.fo_type = 2;
				if ($scope.type == 1) {
					$scope.HOL = false;
				} else {
					$timeout(function() {
						$scope.HOL = !$scope.HOL;
					}, 50)
				}
				$scope.type = 0;
			};

			function typedefalt() {
				$scope.fo_type = 0;
				$scope.HOL = true;
				$scope.state = true;
				$scope.type = 0;
			};

		};
		//添加文字内容
		$scope.addMessage = addMessage;
		//添加消息
		function addMessage(e) {
			var keycode = window.event ? e.keyCode : e.which;
			if (keycode == 13 && $scope.newMessage.Content != "") {
				$scope.Messages = $WeiXinServ.addMessage($scope.newMessage, $scope.Messages);
				$scope.newMessage.Content = "";
			}
		};
		$scope.ResizeScroll = ResizeScroll;
		//刷新滑动块高度
		function ResizeScroll(isfocus) {
			setTimeout(function() {
				$location.hash("message_" + ($scope.Messages.length - 1));
				$ionicScrollDelegate.$getByHandle('MessagesScroll').anchorScroll();
			}, 150)
		}
		//录音
		$scope.onAudio = function(type, name) {
			if (type == 0) {
				$scope.mediacode = $WeiXinServ.Record(type);
				$ionicLoading.show({
					template: "<span>开始录音</span><span>左右滑动取消录音</span>",
					noBackdrop: true
				});
			} else if (type == 1) {
				if ($scope.mediacode) {
					$scope.Messages = $WeiXinServ.Record(type, $scope.mediacode, $scope.contactId, $scope.Messages);
					$scope.mediacode = null;
				}
				$ionicLoading.hide();
			} else if (type == 2) {
				$WeiXinServ.Record(type, name);
			} else if (type = 3) {
				if ($scope.mediacode) {
					$WeiXinServ.Record(type, $scope.mediacode);
					$scope.mediacode = null;
					$ionicLoading.show({
						template: "已取消录音",
						noBackdrop: true
					});

				}
				//				$ionicLoading.hide();
			}
		};
		//
		$scope.onCamera = function(type) {
			$WeiXinServ.Camera($scope.contactId, $scope.Messages, type).then(function(data) {
				$scope.Messages = data;
			})
		};
		//浏览照片
		$scope.scanPhoto = function(imgurl, pindex) {
				var _length = $scope.Messages.length;
				var photo = [];
				var index = 0;
				var add = 0
				for (var i = _length - 1; i >= 0; i--) {
					if ($scope.Messages[i].Type == "img") {
						photo.push($scope.Messages[i].Content);
						if (pindex == i) {
							index = add;
						} else {
							add += 1;
						}
					}
				}
				$PhotoSwipe.show(photo, index);
			};
			//添加表情
		$scope.addExpression = addExpression;

		function addExpression(exp) {
			if (!$scope.newMessage.Content) {
				$scope.newMessage.Content = "";
			}
			$scope.newMessage.Content += exp;
		};
		$scope.isrefresh = true;
		//下拉列表刷新
		$scope.doRefresh = function() {
			$scope.page += 1;
			if ($scope.isrefresh) {
				$WeiXinServ.getMessages($scope.contactId, $scope.page).then(function(data) {
					if (data.length % 10 != 0 || (data.length != $scope.Messages.length && data % 10 == 0)) {
						$scope.isrefresh = false;
					}
					$scope.Messages = data;
					setTimeout(function() {
						$location.hash("message_0");
						$ionicScrollDelegate.$getByHandle('MessagesScroll').anchorScroll();
					}, 150)
					$scope.$broadcast('scroll.refreshComplete');
				});
			} else {
				$scope.$broadcast('scroll.refreshComplete');
			}
		}
		//显示选择目录
		$scope.showSheet = function() {
			$ionicFtActionSheet.show({
				buttons: [{
					img: "img/camera.png",
					text: "相机"
				}, {
					img: "img/wechat.jpg",
					text: "相册"
				}],
				titleText: "选择",
				cancelText: "取消",
				buttonClicked: function(index) {
					if (index == 0) {
						$scope.onCamera(0);
					} else if (index == 1) {
						$scope.onCamera(1);
						//						cordova.plugins.Keyboard.show();
					}
				}
			});
		}
		window.addEventListener('native.keyboardshow', keyboardShowHandler);

		function keyboardShowHandler(e) {
			//			alert('Keyboard height is: ' + e.keyboardHeight);
		}
		$scope.experssions = [{
			img: "img/expression/uhp.png",
			exp: "_uhp"
		}, {
			img: "img/expression/tsm.png",
			exp: "_tsm"
		}, {
			img: "img/expression/sse.png",
			exp: "_sse"
		}, {
			img: "img/expression/sil.png",
			exp: "_sil"
		}, {
			img: "img/expression/sat.png",
			exp: "_sat"
		}, {
			img: "img/expression/q88.png",
			exp: "_q88"
		}, {
			img: "img/expression/lvy.png",
			exp: "_lvy"
		}, {
			img: "img/expression/kis.png",
			exp: "_kis"
		}, {
			img: "img/expression/hee.png",
			exp: "_hee"
		}, {
			img: "img/expression/dps.png",
			exp: "_dps"
		}, {
			img: "img/expression/dlk.png",
			exp: "_dlk"
		}, {
			img: "img/expression/dgg.png",
			exp: "_dgg"
		}, {
			img: "img/expression/cry.png",
			exp: "_cry"
		}, {
			img: "img/expression/bsm.png",
			exp: "_bsm"
		}, {
			img: "img/expression/bye.png",
			exp: "_bye"
		}, {
			img: "img/expression/bls.png",
			exp: "_bls"
		}, {
			img: "img/expression/bak.png",
			exp: "_bak"
		}];
	}
])