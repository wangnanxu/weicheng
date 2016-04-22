DirectModul
//	.directive('chatText', ['$rootScope', 
//		function($rootScope) {
//			return {
//				restrict: 'E',
//				replace: true,
//				link: function(scope, element, attr) {
//					if (scope.Message.SendID == $rootScope.userinfo.account) {
//						element.addClass("boxright");
//						jqLite(element.children()[0]).addClass("imgright");
//					} else {
//						element.children.addClass("boxleft");
//						jqLite(element.children()[0]).addClass("imgleft");
//					}
//				},
//				scope: {
//					Message: "=data"
//				},
//				template: '<a id="{{Message.id}}" class="messagebox"><img ng-src="{{Message.Img}}" class="messageboximg" alt="头像" /><span class="contentbox">{{Message.Content}}</span></a>'
//			}
//		}
//	])
	.directive('chatAudio', ['$rootScope','$AudioServ',
		function($rootScope, $AudioServ) {
			return {
				restrict: 'E',
				replace: true,
				link: function(scope, element, attr) {
					if (scope.Message.SendID == $rootScope.userinfo.account) {
						element.addClass("boxright");
						jqLite(element.children()[0]).addClass("imgright");
					} else {
						element.children.addClass("boxleft");
						jqLite(element.children()[0]).addClass("imgleft");
					}
					scope.onAudio = function(name) {
						$AudioServ.play(name);
					}
				},
				scope: {
					Message: "=data"
				},
				template: '<a id="{{Message.id}}" class="messagebox"><img ng-src="{{Message.Img}}" class="messageboximg" alt="头像" /><span class="button audiobutton"  ng-click="onAudio(Message.Content)"><i class="icon ion-radio-waves"></i></span></a>'
			}
		}
	]).directive('chatImage', ['$rootScope','$PhotoSwipe',
		function($rootScope,$PhotoSwipe) {
			return {
				restrict: 'E',
				replace: true,
				link: function(scope, element, attr) {
					if (scope.Message.SendID == $rootScope.userinfo.account) {
						element.addClass("boxright");
						jqLite(element.children()[0]).addClass("imgright");
					} else {
						element.children.addClass("boxleft");
						jqLite(element.children()[0]).addClass("imgleft");
					}
					scope.scanPhoto = function(imgurl, pindex) {
						var _length = scope.Messages.length;
						var photo = [];
						var index = 0;
						var add = 0
						for (var i = _length - 1; i >= 0; i--) {
							if (scope.Messages[i].Type == "img") {
								photo.push(scope.Messages[i].Content);
								if (pindex == i) {
									index = add;
								} else {
									add += 1;
								}
							}
						}
						$PhotoSwipe.show(photo, index);
					}
				},
				scope: {
					Messages:"=datas",
					Message: "=data",
					num: "=index"
				},
				template: '<a id="{{Message.id}}" class="messagebox"><img ng-src="{{Message.Img}}" class="messageboximg" alt="头像" /><p><img class="contentimg" cache-src="{{Message.Content}}" ng-click="scanPhoto({{Message.Content}},{{num}},{{Messages}})"/></p></a>'
			}
		}
	]).directive('chatText', ['$rootScope','$PhotoSwipe',
		function($rootScope,$PhotoSwipe) {
			var Expression = {
				_bak:"img/expression/bak.png",
				_bls:"img/expression/bls.png",
				_bsm:"img/expression/bsm.png",
				_bye:"img/expression/bye.png",
				_cry:"img/expression/cry.png",
				_dgg:"img/expression/dgg.png",
				_dlk:"img/expression/dlk.png",
				_dps:"img/expression/dps.png",
				_hee:"img/expression/hee.png",
				_kis:"img/expression/kis.png",
				_lvy:"img/expression/lvy.png",		
				_q88:"img/expression/q88.png",
				_sat:"img/expression/sat.png",
				_sil:"img/expression/sil.png",
				_sse:"img/expression/sse.png",
				_tsm:"img/expression/tsm.png",
				_uhp:"img/expression/uhp.png"
			}
			return {
				restrict: 'A',
				link: function(scope, element, attr) {
					var content = attr.chatText;
					for (var exp in Expression) {
						var reg=new RegExp(exp,"g");
						var img = '<img class="contentexpreimg" src="'+Expression[exp]+'"/>';
						content=content.replace(reg,img);
					}
					element.html(content);
				}
			}
		}
	]);