angular.module("AudioModel", ['ngCordova']).factory('$AudioServ', ['$cordovaMedia', '$cordovaVibration', '$cordovaFile', 'dateFilter',
	function($cordovaMedia, $cordovaVibration, $cordovaFile, dateFilter) {
		var src = "weicheng/";
		document.addEventListener('deviceready', function() {
				$cordovaFile.checkDir(cordova.file.externalRootDirectory, "weicheng")
					.then(function(success) {
						//					alert("文件夹");
					}, function(error) {
						//					alert("没有文件夹");
						$cordovaFile.createDir(cordova.file.externalRootDirectory, "weicheng", false)
							.then(function(success) {
								//							alert("success");
							}, function(error) {
								//							alert("error");
							});
					});
			})
			//		var Medias = {};
		var mediacache = {};
		var service = {
			startRecord: startRecord,
			stopRecord: stopRecord,
			play: play,
			deleteRecord: deleteRecord
		}
		var mediatimestart = null;
		var mediatimeend = null;
		return service;

		function startRecord() {
			var code = dateFilter(new Date, "yyyyMMddHHmmss") + Math.floor(Math.random() * 1000).toString();
			var mediasrc = "weicheng/" + code + ".mp3";
			var mediaRec = new Media(mediasrc,
				function() {},
				function(err) {
					alert(err)
				}
			);
			//			$cordovaVibration.vibrate(100);
			mediacache[code] = mediaRec;
			mediacache[code].startRecord();
			mediatimestart = new Date();
			return code;
		};

		function stopRecord(code) {
			if (mediacache[code]) {
				mediacache[code].stopRecord();
				mediatimeend = new Date();
				var audiotime = Math.ceil((mediatimeend.getTime() - mediatimestart.getTime())/1000);
				$cordovaVibration.vibrate(100);
				return audiotime;
			}
		};

		function play(code) {
			var mediasrc = "weicheng/" + code + ".mp3";
			var playmedia = new Media(mediasrc,
				function() {},
				function(err) {}
			);
			playmedia.play();
		}

		function deleteRecord(code) {
			mediacache[code].stopRecord();
			mediacache = {};
			mediatimestart = null;
			mediatimeend = null;
			$cordovaVibration.vibrate(100);
		}
	}
]);