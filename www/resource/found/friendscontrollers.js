foundModel
	.controller('FriendsCtrl', ['$scope', '$FoundServ', '$ionicHistory', '$ionicActionSheet', '$PhotoSwipe','$WechatServ',
		function($scope, $FoundServ, $ionicHistory, $ionicActionSheet, $PhotoSwipe,$WechatServ) {
			$scope.goBack = function() {
				$ionicHistory.goBack();
			};
			$scope.show = function() {

				// 显示操作表
				$ionicActionSheet.show({
					buttons: [{
						text: '朋友圈'
					}, {
						text: 'QQ空间'
					}, {
						text: '微博'
					}],
					//					destructiveText: '删除',
					titleText: '分享',
					cancelText: '取消',
					buttonClicked: function(index) {
						if (index == 0) {
							//							Wechat.isInstalled(function(installed) {
							//								alert("Wechat installed: " + (installed ? "Yes" : "No"));
							//								if (installed) {
							//									
							//								}
							//							}, function(reason) {
							//								alert("Failed: " + reason);
							//							});
							$WechatServ.share("send-text","测试文字内容");
						} else if (index == 1) {
							alert("qq空间");
						} else if (index == 2) {
							alert("微博");
							var args = {};
							args.url = "http://www.baidu.com";
							args.title = "Baidu";
							args.description = "This is Baidu";
							args.imageUrl = "https://www.baidu.com/img/bdlogo.png"; //if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
							args.defaultText = "";
							YCWeibo.shareToWeibo(function() {
								alert("share success");
							}, function(failReason) {
								alert(failReason);
							}, args);
						}
						return true;
					}
				});

			};
			$scope.scanPhoto = function(imgurl, pindex) {
				var photo = [];
				photo.push(imgurl);
				$PhotoSwipe.show(photo, pindex);
			}
		}
	])