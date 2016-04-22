photoSwipeModel.factory('$PhotoSwipe', function($http, $q) {
	var q = $q.defer();
	var gallery;
	var service = {
		show: show
	};
	return service;

	function show(pictures, index) {
		var pswpElement = document.querySelectorAll('.pswp')[0];

		var _length = pictures.length;
		var items = [];
		for (var i = 0; i < _length; i++) {
			var img = new Image();
			img.src = pictures[i];
			items.push({
				src: img.src,
				w: img.width,
				h: img.height
			})
		}
		var options = {
			history: false,
			focus: false,

			showAnimationDuration: 0,
			hideAnimationDuration: 0

		};
		gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
		gallery.goTo(index);
		return q.promise;
	}
})

//function OpenPhotoSwipeAdd(_index) {
//	var pswpElement = document.querySelectorAll('.pswp')[0];
//
//	var items = NewGetImages();
//
//	// define options (if needed)
//	var options = {
//		// history & focus options are disabled on CodePen        
//		history: false,
//		focus: false,
//
//		showAnimationDuration: 0,
//		hideAnimationDuration: 0
//
//	};
//
//	gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
//	gallery.init();
//	gallery.goTo(parseInt(_index));
//};
//
//function DeletePictureAdd() {
//	var _index = gallery.getCurrentIndex();
//	var _id = gallery.items[_index].id;
//	gallery.items.splice(_index, 1);
//	$("#" + _id).remove();
//	if (gallery.items.length > 0) {
//		gallery.invalidateCurrItems();
//		gallery.updateSize(true);
//	} else {
//		gallery.close();
//	}
//	gallery.goTo(gallery.getCurrentIndex());
//}