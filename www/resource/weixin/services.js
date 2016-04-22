weiXinModel.factory('$WeiXinServ', ['$LoaclStorage', '$state', '$ionicHistory', '$ModalServ', '$q', '$CMATServ', '$rootScope', 'dateFilter', '$Sqlite', '$AudioServ', '$CameraServ',
	function($LoaclStorage, $state, $ionicHistory, $ModalServ, $q, $CMATServ, $rootScope, dateFilter, $Sqlite, $AudioServ, $CameraServ) {
		$rootScope.userinfo = $LoaclStorage.getObject("userinfo", {});
		var contacts = {};
		var service = {
			all: all,
			get: get,
			gotoBack: gotoBack,
			getMessages: getMessages,
			addMessage: addMessage,
			Record: Record,
			Camera: Camera
		}
		return service;
		//返回所有联系人
		function all() {
			var q = $q.defer();
			$Sqlite.GetContacts(true).then(function(data) {
				q.resolve(data);
			});
			return q.promise;
		};
		//**contacts如何得来
		function get(contactId) {
			return contacts[contactId];
		};
		//返回微信页面
		function gotoBack() {
			$state.go("tab.weixin");
		};
		//根据Id获取聊天信息
		function getMessages(id, page) {
			var q = $q.defer();
			$Sqlite.GetMessages($rootScope.userinfo.account, id).then(function(data) {
				var results = [];
				var _length = data.length;
				if (data&&_length>10) {
					results = data.slice(data.length-10*(page+1), data.length)
				}
				else{
					results = data;
				}
				q.resolve(results);
			})
			return q.promise;
		};
		//添加聊天信息
		function addMessage(newmessage, Messages) {
			var Message = {
				SendID: $rootScope.userinfo.account,
				Img: $rootScope.userinfo.image,
				Type: newmessage.Type,
				Time: dateFilter(new Date, "yyyy-MM-dd HH:mm:ss"),
				Content: newmessage.Content,
				AudioTime:newmessage.AudioTime,
				ReceiveID: newmessage.ReceiveID
			};

			Messages.push(Message);
			$Sqlite.AddMessages(Message).then(function(data) {}, function() {
				alert("修改数据失败")
			});

			var _item = {
				ID: Message.ReceiveID,
				IsCurrent: true,
				CurrentContent: Message.Content,
				CurrentTime: Message.Time
			};
			$Sqlite.UpdateContacts(_item).then(function(data) {}, function() {
				alert("修改数据失败")
			});
			return Messages;
		};
		/*
		 * type:0开始录音
		 * type:1停止录音
		 * type:2播放录音
		 * type:3停止录音
		 */
		function Record(type, name, id, Messages) {
			if (type == 0) {
				return $AudioServ.startRecord();
			} else if (type == 1) {
				//				alert(1);
				var audiotime = $AudioServ.stopRecord(name);
				var newmessage = {
					Content: name,
					AudioTime:audiotime,
					Type: "audio",
					ReceiveID: id
				}
				return addMessage(newmessage, Messages);
			} else if (type == 2) {
				$AudioServ.play(name);
			} else if (type == 3) {
				//				alert(3);
				$AudioServ.deleteRecord(name);
			}
		};

		function Camera(id, Messages, type) {
			var q = $q.defer();
			cameracallbck = function(src) {
				var newmessage = {
					Content: src,
					Type: "img",
					ReceiveID: id
				}
				q.resolve(addMessage(newmessage, Messages));
			}
			if (type == 1) {
				$CameraServ.library().then(cameracallbck);
			} else {
				$CameraServ.camera().then(cameracallbck);
			}

			return q.promise;

		};
	}
]);

//			var nowtime = new Date();
//			if (time != "") {
//				var oldtime = new Date(time);
//				var deffer = nowtime-oldtime;
//				if (time > 10000) {
//					newMessage.Time = dateFilter(nowtime, "yyyy-MM-dd hh:mm:ss");
//				} else {
//					newMessage.Time = "";
//				}
//			} else {
//				newMessage.Time = dateFilter(nowtime, "yyyy-MM-dd hh:mm:ss");
//			}