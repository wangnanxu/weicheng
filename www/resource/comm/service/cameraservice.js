angular.module("CameraModel", ['ngCordova']).factory('$CameraServ', ['$q', '$cordovaCamera',
	function($q, $cordovaCamera) {
		var service = {
			camera: camera,
			library: library
		}
		return service;

		function camera() {
			var q = $q.defer();
			document.addEventListener("deviceready", function() {
				var options = {
					quality: 100,
					correctOrientation: true,
					destinationType: navigator.camera.DestinationType.FILE_URI,
					sourceType: navigator.camera.PictureSourceType.CAMERA,
					allowEdit: false,
					encodingType: navigator.camera.EncodingType.JPEG,
					targetWidth: 600,
					targetHeight: 600,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: false
				};
				$cordovaCamera.getPicture(options).then(function(imageUrl) {
					q.resolve(imageUrl); //成功返回
				}, function(err) {
					q.reject(error); //失败返回
				});

			}, false);
			return q.promise;
		};

		function library() {
			var q = $q.defer();
			document.addEventListener("deviceready", function() {
				var options = {
					quality: 100,
					destinationType: navigator.camera.DestinationType.FILE_URI,
					sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
				};
				$cordovaCamera.getPicture(options).then(function(imageUrl) {
					q.resolve(imageUrl); //成功返回
				}, function(err) {
					q.reject(err); //失败返回
				});

			}, false);
			return q.promise;
		};
	}
]);