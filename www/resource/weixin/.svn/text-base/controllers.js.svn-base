weiXinModel.controller('WeiXinCtrl', ['$scope', '$WeiXinServ', '$location', '$ionicScrollDelegate',
	function($scope, $WeiXinServ, $location, $ionicScrollDelegate) {
		$WeiXinServ.all().then(function(data) {
			$scope.contacts = data;
		});
	}
])