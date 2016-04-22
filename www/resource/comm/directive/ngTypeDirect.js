DirectModul
	.directive('onCheckType', [
		function($ionicScrollDelegate, $location) {
			return {
				restrict: 'A',
				link: function(scope, element, attr) {
					var contact = attr.onCheckType;
					contact=angular.fromJson(contact)
					if(contact.Type=="img"){
						element.html("[图片]");
					}else if(contact.Type=="audio"){
						element.html("[图片]");
					}else{
						element.html(contact.CurrentContent);
					}
				}
			}
		}
	]);