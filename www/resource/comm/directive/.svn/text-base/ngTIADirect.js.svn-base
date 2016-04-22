DirectModul
	.directive('onTiaType', [

		function() {
			var s = 1;
			return {
				restrict: 'E',
				replace: true,
				transclude: true,
				scope: {
					type: '@type',
					content: '@content',
					click: '@click'
				},
				link: function(scope, elem, attr) {
					var type = attr.type;
					var content = attr.content;
					if (type == "img") {
						elem.append('<img class="contentimg" ng-src="{{content}}"/>');
					} else if (type == "audio") {
						elem.className = "button audiobutton";
						elem.append('<span class="button audiobutton" ng-click="onAudio(2,{{content}})"><i class="icon ion-radio-waves"></i></span>');
					} else {
						elem.className = "contentbox";
						elem.text(content);
					}
				},
				template: function(tElem, tAttrs) {
					//					var template = '<span><img class="contentimg" ng-src="{{content}}"/><span><span class="button audiobutton" ng-click="onAudio(2,{{content}})"><i class="icon ion-radio-waves"></i></span><span class="contentbox">{{content}}</span>';
					var template = '<span type="{{type}}" content="{{content}}"></span>';
					//					var type = tAttrs.type;
					//					if (type == "img") {
					//						template = '<span><img class="contentimg" ng-src="{{content}}"/><span>';
					//					} else if (type == "audio") {
					//						template = '<span class="button audiobutton" ng-click="onAudio(2,{{content}})"><i class="icon ion-radio-waves"></i></span>';
					//					} else {
					//						template = '<span class="contentbox">{{content}}</span>';
					//					}
					return template;
				}
			}
		}
	]);