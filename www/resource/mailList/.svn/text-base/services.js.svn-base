mailListModel
	.factory('$MailListServ', ['$q', '$filter', '$location', '$ionicScrollDelegate', '$JsonServ', '$ModalServ', '$state', '$Sqlite', '$rootScope',
		function($q, $filter, $location, $ionicScrollDelegate, $JsonServ, $ModalServ, $state, $Sqlite, $rootScope) {
			var contacts = [];
			var service = {
				all: all,
				remove: remove,
				get: get,
				alpha: alpha,
				alphaScroll: alphaScroll,
				initModal: initModal,
				addSendContact: addSendContact
			}
			return service;

			function all() {
				var q = $q.defer();
				$Sqlite.GetContacts().then(function(data) {
					contacts = $filter('chineseFilter')($filter, data, "Name");
					q.resolve(contacts)
				});
				//				$JsonServ.get("contacts").then(function(data) {
				//					for (var i = 0; i < data.length; i++) {
				//						$Sqlite.AddContacts(data[i]);
				//					}
				//					q.resolve(contacts)
				//				})
				return q.promise;
			};

			function remove(contact) {
				contacts.splice(contacts.indexOf(contact), 1);
			};

			function get(contactId) {
				return $CMATServ.getContactById(contactId);
			};

			function alpha() {
				var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
				var numbers = new Array();
				for (var i = 0; i < str.length; i++) {
					var nextChar = str.charAt(i);
					numbers.push(nextChar);
				}
				return numbers;
			};

			function alphaScroll(id) {
				if (contacts[id]) {
					$location.hash(id);
					$ionicScrollDelegate.$getByHandle('mailAlphaScroll').anchorScroll();
				}
			};

			function initModal($scope) {
				var q = $q.defer();
				$ModalServ.initModal($scope, "mailList").then(function(data) {
					q.resolve(data)
				});
				return q.promise;
			};

			function addSendContact(item) {
				$state.go("weixincontact", {
					contactId: item.ID,
					contactName:item.Name
				});
			};
		}
	]);