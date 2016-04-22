angular.module("sqliteModel", ['ngCordova']).factory('$Sqlite', ['$q', '$cordovaSQLite', '$http',
	function($q, $cordovaSQLite, $http) {
		var db = null;
		var table = [];
		if (!window.openDatabase) {
			alert('该浏览器不支持数据库');
			return false;
		} else {
			db = window.openDatabase('bcdb', '1.0', 'bcdb', 30000);
			var service = {
				createDB: createDB,
				GetMessages: GetMessages,
				AddMessages: AddMessages,
				AddContacts: AddContacts,
				GetContacts: GetContacts,
				UpdateContacts: UpdateContacts
			};
			return service;
		}
		//查找数据
		function select(tablename, condition, param) {
			var q = $q.defer();
			var where = "";
			if (param.length > 0) {
				where = " where " + condition;
			}
			var query = "select * from " + tablename + where;
			$cordovaSQLite.execute(db, query, param).then(function(response) {
				var _length = response.rows.length;
				if (_length == 0) {
					q.resolve([]);
				} else {
					var _data = [];
					for (var i = 0; i < _length; i++) {
						_data.push(response.rows.item(i))
					}
					q.resolve(_data);
				}
			}, function(err) {
				q.reject(err); //成功返回
			});
			return q.promise;
		};
		//插入数据
		function insert(tablename, field, param) {
			var q = $q.defer();
			var _length = field.length;
			var _array = []
			for (var i = 0; i < _length; i++) {
				_array.push("?");
			}
			var query = "insert into " + tablename + "(" + field.join(',') + ") values (" + _array.join(',') + ")";
			$cordovaSQLite.execute(db, query, param).then(function(response) {
				q.resolve(response);
			}, function(err) {
				q.reject(err); //成功返回
			});
			return q.promise;
		};
		//修改数据
		function update(tablename, field, param, condition, cparam) {
			var q = $q.defer();
			var _length = field.length;
			var _array = [];
			for (var i = 0; i < _length; i++) {
				_array.push(field[i] + "=?");
			}
			var _length = cparam.length;
			for (var i = 0; i < _length; i++) {
				param.push(cparam[i]);
			}
			var query = "update " + tablename + " set " + _array.join(",") + " where " + condition;
			$cordovaSQLite.execute(db, query, param).then(function(response) {
				q.resolve(response);
			}, function(err) {
				console.log(err.message);
				q.reject(err); //成功返回
			});
			return q.promise;
		};
		//插入或修改数据
		function saveOrupadte(tablename, field, param, condition, cparam) {
			var q = $q.defer();
			select(tablename, condition, cparam).then(function(data) {
				if (data.length > 0) {
					update(tablename, field, param, condition, cparam);
				} else {
					insert(tablename, field, param)
				}
			})
			return q.promise;
		};
		//创建数据库
		function createDB() {
			var q = $q.defer();
			$http.get('json/sqlite.json')
				.success(function(data, status, header, config) {
					var _length = data.length;
					for (var i = 0; i < _length; i++) {
						var query = "CREATE TABLE IF NOT EXISTS " + data[i].tableName + " (" + data[i].tablePrama.join(',') + ")";
						$cordovaSQLite.execute(db, query, []).then(function(res) {
							console.log("cerate: " + res.insertId);
						}, function(err) {
							console.error(err);
						});
					}

				}).error(function() {});
		};
		
		function GetMessages(SendID, ReceiveID) {
			var q = $q.defer();
			SendID = SendID.toString();
			ReceiveID = ReceiveID.toString();
			select("Messages", "(SendID=? and ReceiveID=?) or (SendID=? and ReceiveID=?) ", [SendID, ReceiveID, ReceiveID, SendID]).then(function(data) {
				q.resolve(data)
			})
			return q.promise;
		};

		function AddMessages(item) {
			var q = $q.defer();
			item.ReceiveID = item.ReceiveID.toString();
			item.SendID = item.SendID.toString();
			insert("Messages", ["SendID", "Img", "Content","AudioTime","Type","Time", "ReceiveID"], [item.SendID, item.Img, item.Content,item.AudioTime,item.Type, item.Time, item.ReceiveID]).then(function(data) {
				q.resolve(data)
			})
			return q.promise;
		};

		function AddContacts(item) {
			var q = $q.defer();
			item.ID = item.ID.toString();
			var filed = ["ID", "Img", "Account", "Name", "NickName", "Address", "IsCurrent", "CurrentContent", "CurrentTime"];
			var param = [item.ID, item.Img, item.Account, item.Name, item.NickName, item.Address, false, "", ""];
			var condition = "ID=?";
			var cparam = [item.ID];
			saveOrupadte("Contacts", filed, param, condition, cparam).then(function(data) {
				q.resolve(data)
			})
			return q.promise;
		};
		
		function GetContacts(IsCurrent) {
			var q = $q.defer();
			var _filed = "";
			var _prarm = [];
			if (IsCurrent) {
				_filed = "IsCurrent=?";
				_prarm = [true];
			}
			select("Contacts", _filed, _prarm).then(function(data) {
				q.resolve(data)
			})
			return q.promise;
		};

		function UpdateContacts(item) {
			var q = $q.defer();
			item.ID = item.ID.toString();
			var filed = [];
			var param = [];
			for (var o in item) {
				filed.push(o);
				param.push(item[o]);
			}
			var condition = "ID=?";
			var cparam = [item.ID];
			update("Contacts", filed, param, condition, cparam).then(function(data) {
				if (data.rowsAffected == 1) {
					q.resolve(true);
				} else {
					q.reject(false);
				}

			})
			return q.promise;
		};
	}
]);