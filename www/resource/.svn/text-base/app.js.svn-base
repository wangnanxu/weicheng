angular.module('starter', ['ionic','FtActionSheet','ionic-cache-src','WeChatModel', 'ngAnimate','photoSwipeModel','AudioModel', 'CameraModel', 'CMATModel', 'ngDirect', 'hideTabsDirect', 'sqliteModel', 'modalModel', 'chineseFilter', 'ngSanitize', 'ngMessages', 'ion-alpha-scroll', 'JsonModel', 'TabsModel', 'loaclstorage', 'commFunModel', 'commPageModel', 'loginModel', 'weiXinModel', 'mailListModel', 'foundModel', 'userModel'])

.run(function($ionicPlatform, $Sqlite,$ionicNavBarDelegate, $ionicHistory, $ionicPopup, $location, $state, $rootScope, $JsonServ, $q, $LoaclStorage) {
	$ionicPlatform.ready(function() {

		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}
	});
	//定义获取当前语言的方法
	$rootScope.GetLanguage = function() {
		//localStorage中获取language的值，为当前语言
		var _currentLanguage = $LoaclStorage.get("language", "");
		//如果没有获取到当前语言，默认为简体中文
		if (_currentLanguage == "") {
			_currentLanguage = "chinese";
		}
		//$rootScope.currentLanguage保存当前语言变量
		$rootScope.currentLanguage = _currentLanguage;
		//异步定义
		var q = $q.defer();
		//获取到语言json文件中的内容，_currentLanguage为文件名
		$JsonServ.get(_currentLanguage).then(function(data) {
			//获取到所有语言内容，赋值给$rootScope.Language全局变量
			$rootScope.Language = data;
			//异步返回
			q.resolve();
		});
		return q.promise;
	};
	//默认执行获取语言方法
	$rootScope.GetLanguage();
	$Sqlite.createDB();
	//退出程序方法
	$rootScope.ExitApp = function() {
		//获取退出程序显示语言内容
		var language = $rootScope.Language.quit;
		//定义确认弹出框confirm
		var confirmPopup = $ionicPopup.confirm({
			title: '<strong>' + language.title + '</strong>', //弹出信息title
			template: language.template, //弹出信息文字内容
			okText: language.quit, //弹出信息确认按钮
			cancelText: language.cancel //弹出信息取消按钮
		});
		//选择确认按钮或者取消按钮后执行方法
		confirmPopup.then(function(res) {
			//选择确认按钮，res为true
			if (res) {
				//退出程序方法
				ionic.Platform.exitApp();
			}
			//选择取消按钮，res为false
			else {}
		});
	};
	//ionic对默认手机返回键操作
	$ionicPlatform.registerBackButtonAction(function(e) {
		e.preventDefault();
		//当前所在路由为/login登录界面,弹出退出确认框
		if ($location.path() == '/login') {
			$rootScope.ExitApp();
		}
		//当前所在路由为/direct,已有账号直接登录界面,返回/login登录界面
		else if ($location.path() == '/direct') {
			$state.go("login");
		}
		//其他路由返回上一路由
		else {
			$ionicHistory.goBack();
		}
		return false;
	}, 101);
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	//以下$ionicConfigProvider配置Android和iOS界面配置
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('bottom');

	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');

	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

	$ionicConfigProvider.platform.ios.views.transition('ios');
	$ionicConfigProvider.platform.android.views.transition('android');
	//路由配置
	$stateProvider

	// setup an abstract state for the tabs directive
		.state('login', {
			url: '/login',
			cache: false,
			templateUrl: 'resource/login/loginFrontPage/loginFrontPage.html',
			controller: 'LoginFrontPageCtrl'
		})
		.state('account', {
			url: '/account',
			cache: false,
			templateUrl: 'resource/login/accountLogin/accountLogin.html',
			controller: 'AccountLoginCtrl'
		})
		.state('direct', {
			url: '/direct',
			cache: false,
			templateUrl: 'resource/login/directLogin/directLogin.html',
			controller: 'DirectLoginCtrl'
		})
		.state('regist', {
			url: '/regist',
			cache: false,
			templateUrl: 'resource/login/registAccount/registAccount.html',
			controller: 'RegistAccountCtrl'
		})
		.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: 'resource/tabs.html',
			controller: 'tabsCtrl'
		})
		.state('tab.weixin', {
			url: '/weixin',
			cache: false,
			views: {
				'tab-weixin': {
					templateUrl: 'resource/weixin/weixin.html',
					controller: 'WeiXinCtrl'
				}
			}
		})
		.state('weixincontact', {
			url: '/weixin/:contactId/:contactName',
			cache: true,
			templateUrl: 'resource/weixin/weixincontact.html',
			controller: 'WXContactCtrl'
		})
		.state('tab.maillist', {
			url: '/maillist',
			views: {
				'tab-maillist': {
					templateUrl: 'resource/mailList/mailList.html',
					controller: 'MailListCtrl'
				}
			}
		})
		.state('tab.found', {
			url: '/found',
			views: {
				'tab-found': {
					templateUrl: 'resource/found/found.html',
					controller: 'FoundCtrl'
				}
			}
		})
		.state('friends', {
			url: '/friends',
			templateUrl: 'resource/found/friends.html',
			controller: 'FriendsCtrl'
		})
		.state('tab.user', {
			url: '/user',
			views: {
				'tab-user': {
					templateUrl: 'resource/user/user.html',
					controller: 'UserCtrl'
				}
			}
		})
		.state('message', {
			url: '/message',
			cache: false,
			templateUrl: 'resource/commPage/message/message.html',
			controller: 'MessageCtrl'
		})
		.state('addfriend', {
			url: '/addfriend',
			cache: false,
			templateUrl: 'resource/commPage/addFriend/addFriend.html',
			controller: 'AddFriendCtrl'
		})
		.state('groudchat', {
			url: '/groudchat',
			cache: false,
			templateUrl: 'resource/commPage/groupChat/groupChat.html',
			controller: 'GroupChatCtrl'
		})
		.state('reserch', {
			url: '/reserch',
			cache: false,
			templateUrl: 'resource/commPage/reserch/reserch.html',
			controller: 'ReserchCtrl'
		})
		.state('sweepcode', {
			url: '/sweepcode',
			cache: false,
			templateUrl: 'resource/commPage/sweepCode/sweepCode.html',
			controller: 'SweepCodeCtrl'
		})

	// 默认路由配置
	$urlRouterProvider.otherwise('/login');

});