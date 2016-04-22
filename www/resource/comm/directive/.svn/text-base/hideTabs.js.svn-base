angular.module('hideTabsDirect', []).directive('hideTabs', hideTabs);
	hideTabs.$inject = ['$rootScope'];
	function hideTabs($rootScope) {
		var directive = {
			restrict: 'A',
			link: link
		};
		return directive;

		function link(scope, element, attributes) {
			scope.$watch(attributes.hideTabs, function(value) {
					$rootScope.hideTabs = value;
			});
		}
	}