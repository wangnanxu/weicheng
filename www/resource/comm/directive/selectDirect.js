angular.module('SelectDirect', []) //创建一个模块，注入SelectDirect到app中
.directive('onSelectFinish', [		//指令名字  在html标签上使用，  on-select-finish

	function() {
		return {
			restrict: 'A',//指令类型 A 属性方式
			link: function(scope, element, attr) {
				element.ready(function() {	//在添加了on-select-finish的标签准备好加载完成之后
					element[0].childNodes[0].remove();	//删除select的第一个空白的option
				});
			}
		}
	}
]);