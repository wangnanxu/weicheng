angular.module("CMATModel", []).factory('$CMATServ', ['$LoaclStorage', '$Sqlite', '$q',
	function($LoaclStorage, $Sqlite, $q) {
		var allContacts = [];
		var currentContacts = [];

		var _length = currentContacts.length;
		var currentobject = {};
		var Messages = {};
		for (var i = 0; i < _length; i++) {
			currentobject[currentContacts[i].id] = i;
		}
		var service = {
			getAllContacts: getAllContacts,
			addContact: addContact,
			addCurrentContact: addCurrentContact,
			getCurrentContacts: getCurrentContacts,
			getContactById: getContactById,
			getMessages: getMessages,
			addMessage: addMessage
		}
		return service;

		function getAllContacts() {
			var q = $q.defer();
			$Sqlite.GetContacts().then(function(data) {
				if (data == null) {
					data = [];
				}
				q.resolve(data);
			});
			return q.promise;
		}

		function addContact(item) {
			var q = $q.defer();
			$Sqlite.AddContacts(item).then(function(data) {
				q.resolve();
			}, function() {
				alert("修改数据失败")
			});
			return q.promise;
		}

		function addCurrentContact(item) {
			var q = $q.defer();
			var _item = {
				ID: item.ReceiveID,
				IsCurrent: true,
				CurrentContent: item.Content
			};
			$Sqlite.UpdateContacts(_item).then(function(data) {
				q.resolve();
			}, function() {
				alert("修改数据失败")
			});
			return q.promise;
		};

		function getCurrentContacts() {
			var q = $q.defer();
			$Sqlite.GetContacts(true).then(function(data) {
				q.resolve(data);
			});
			return q.promise;
		};

		function getContactById(contactId) {
			var _length = currentContacts.length;
			for (var i = 0; i < _length; i++) {
				if (currentContacts[i].id === parseInt(contactId)) {
					return currentContacts[i];
				}
			};
			return null;
		};

		function getMessages(SendID, ReceiveID) {
			var q = $q.defer();
			var MarkID = SendID + ReceiveID;
			//			if (Messages[MarkID]) {
			//				q.resolve(Messages[MarkID]);
			//			}
			//			else {
			$Sqlite.GetMessages(SendID, ReceiveID).then(function(data) {
				if (!data) {
					data = [];
				}
				//					Messages[MarkID] = data;
				q.resolve(data);
			});
			//			}
			return q.promise;
		};

		function addMessage(item) {
			var q = $q.defer();
			$Sqlite.AddMessages(item).then(function() {
				q.resolve();
			}, function() {
				q.reject();
			});
			return q.promise;
		};
	}
]);