DirectModul
	.directive('onRepeatFinesh', ['$ionicScrollDelegate','$location',
		function($ionicScrollDelegate,$location) {
			return {
				restrict: 'A',
				link: function(scope, element, attr) {
					if (scope.$last === true) {
						element.ready(function() {
							var data = attr.onRepeatFinesh.split(',')
							if (data[0]) {
								switch (data[1]) {
									case "bottom":
										$ionicScrollDelegate.$getByHandle(data[0]).scrollBottom();
										break;
									case "top":
										$ionicScrollDelegate.$getByHandle(data[0]).scrollTop();
										break;
									default:
										$location.hash(data[1]);
										$ionicScrollDelegate.$getByHandle(data[0]).anchorScroll();
										break;
								}
							}
						});
					}
				}
			}
		}
	]);