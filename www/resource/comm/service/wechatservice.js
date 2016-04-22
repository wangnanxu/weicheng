angular.module("WeChatModel", []).factory('$WechatServ', [
	function() {
		var service = {
			share: share
		}
		return service;
		/*	文字：send-text
		 * 	检测是否安装微信：check-installed
		 * 	图片：send-photo
		 * 	连接：send-link
		 * 	音乐：send-music
		 * 	视频：send-video
		 * 	应用：send-app
		 * 	：send-nongif
		 * 	gif:send-gif
		 * 	文件：send-file
		 * 	：auth
		 */
		function share(id,text) {
			var params = {
				scene: Wechat.Scene.TIMELINE
			};

			if (id == 'send-text') {
				if(text){
					params.text =text;
				}
				else{
					params.text = "人文的东西并不是体现在你看得到的方面，它更多的体现在你看不到的那些方面，它会影响每一个功能，这才是最本质的。但是，对这点可能很多人没有思考过，以为人文的东西就是我们搞一个很小清新的图片什么的。”综合来看，人文的东西其实是贯穿整个产品的脉络，或者说是它的灵魂所在。";	
				}

			} else {
				params.message = {
					title: "[TEST]" + id,
					description: "[TEST]Sending from test application",
					thumb: "www/img/res1thumb.png",
					mediaTagName: "TEST-TAG-001",
					messageExt: "这是第三方带的测试字段",
					messageAction: "<action>dotalist</action>",
					media: {}
				};

				Wechat.setOptions({
					appId: 'wx193ab692584cb695' //'wx0c5bd30aa791c589'
				});

				switch (id) {
					case 'check-installed':
						Wechat.isInstalled(function(installed) {
							alert("Wechat installed: " + (installed ? "Yes" : "No"));
						});
						return;

					case 'send-photo':
						params.message.thumb = "www/img/res1thumb.png";
						params.message.media.type = Wechat.Type.IMAGE;
						params.message.media.image = "www/img/res1.jpg";
						break;

					case 'send-link':
						params.message.thumb = "www/img/res2.png";
						params.message.media.type = Wechat.Type.LINK;
						params.message.media.webpageUrl = "http://tech.qq.com/zt2012/tmtdecode/252.htm";
						break;

					case 'send-music':
						params.message.thumb = "www/img/res3.jpg";
						params.message.media.type = Wechat.Type.MUSIC;
						params.message.media.musicUrl = "http://y.qq.com/i/song.html#p=7B22736F6E675F4E616D65223A22E4B880E697A0E68980E69C89222C22736F6E675F5761704C69766555524C223A22687474703A2F2F74736D7573696334382E74632E71712E636F6D2F586B30305156342F4141414130414141414E5430577532394D7A59344D7A63774D4C6735586A4C517747335A50676F47443864704151526643473444442F4E653765776B617A733D2F31303130333334372E6D34613F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D30222C22736F6E675F5769666955524C223A22687474703A2F2F73747265616D31342E71716D757369632E71712E636F6D2F33303130333334372E6D7033222C226E657454797065223A2277696669222C22736F6E675F416C62756D223A22E4B880E697A0E68980E69C89222C22736F6E675F4944223A3130333334372C22736F6E675F54797065223A312C22736F6E675F53696E676572223A22E5B494E581A5222C22736F6E675F576170446F776E4C6F616455524C223A22687474703A2F2F74736D757369633132382E74632E71712E636F6D2F586C464E4D313574414141416A41414141477A4C36445039536A457A525467304E7A38774E446E752B6473483833344843756B5041576B6D48316C4A434E626F4D34394E4E7A754450444A647A7A45304F513D3D2F33303130333334372E6D70333F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D3026616D703B73747265616D5F706F733D35227D";
						params.message.media.musicDataUrl = "http://stream20.qqmusic.qq.com/32464723.mp3";
						break;

					case 'send-video':
						params.message.thumb = "www/img/res7.jpg";
						params.message.media.type = Wechat.Type.VIDEO;
						params.message.media.videoUrl = "http://v.youku.com/v_show/id_XNTUxNDY1NDY4.html";
						break;

					case 'send-app':
						params.message.thumb = "www/img/res2.jpg";
						params.message.media.type = Wechat.Type.APP;
						params.message.media.extInfo = "<xml>extend info</xml>";
						params.message.media.url = "http://weixin.qq.com";
						break;

					case 'send-nongif':
						params.message.thumb = "www/img/res5thumb.png";
						params.message.media.type = Wechat.Type.EMOTION;
						params.message.media.emotion = "www/resources/res5.jpg";
						break;

					case 'send-gif':
						params.message.thumb = "www/img/res6thumb.png";
						params.message.media.type = Wechat.Type.EMOTION;
						params.message.media.emotion = "www/resources/res6.gif";
						break;

					case 'send-file':
						params.message.thumb = "www/resources/res2.jpg";
						params.message.media.type = Wechat.Type.FILE;
						params.message.media.file = "www/img/iphone4.pdf";
						break;

					case 'auth':
						Wechat.auth("snsapi_userinfo", function(response) {
							// you may use response.code to get the access token.
							alert(JSON.stringify(response));
						}, function(reason) {
							alert("Failed: " + reason);
						});
						return;

					default:
						$ionicPopup.alert({
							title: 'Not supported!',
							template: 'Keep patient, young man.'
						});
						return;
				}
			}

			Wechat.share(params, function() {
				alert("Success");
			}, function(reason) {
				alert("Failed: " + reason);
			});
		}
	}
]);