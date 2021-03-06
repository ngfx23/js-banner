CustomBanner.defaultParameter = {
	width: 500,
	height: 300,

	minWidth: 100,
	minHeight: 100,

	bannerShowArea: document.body,

	ImageUrl: "img/1.jpg",
	ImageIndex: 2,

	moveOrientation: "horizontal", // horizontal verical
	bannerTime: 3,
	showAllBtnType: "image", // figure point image text none

	haslrBtn: true
}

function CustomBanner(opts) {
	var options = this.constructor.defaultParameter;
	this.opts = EventUtil.extend(options, opts);

	this.init();

	this.showPosition = 0;
}

CustomBanner.prototype = {
	constructor: CustomBanner,

	// 初始化
	init: function() {
		var _self = this,
			opts = _self.opts

		_self._create();

		_self.setStatus();

	},

	// 创建轮播器
	_create: function() {
		var _self = this,
			opts = _self.opts;

		opts.bannerShowArea.classList = 'banner-outer';

		// 创建轮播器的包围层 
		var BannerWarpper = document.createElement('div');
		BannerWarpper.className = 'banner-warpper';
		opts.bannerShowArea.appendChild(BannerWarpper);
		_self.BannerWarpper = BannerWarpper;

		// 创建放置图片的ul
		var BannerImages = document.createElement('ul');
		EventUtil.addClassName(BannerImages, "banner-images");
		BannerWarpper.appendChild(BannerImages);
		_self.BannerImages = BannerImages;

		// 创建查看前一张的按钮 
		var preBtn = document.createElement('div');
		EventUtil.addClassName(preBtn, "lrbtn", "left-btn");
		BannerWarpper.appendChild(preBtn);
		_self.preBtn = preBtn;

		// 创建后一张的按钮 
		var nextBtn = document.createElement('div');
		EventUtil.addClassName(nextBtn, "lrbtn", "right-btn");
		BannerWarpper.appendChild(nextBtn);
		_self.nextBtn = nextBtn;

		// 创建放置图片的ul
		var showAllBtn = document.createElement('ul');
		EventUtil.addClassName(showAllBtn, "show-all-btn");
		BannerWarpper.appendChild(showAllBtn);
		_self.showAllBtn = showAllBtn;

	},

	// 设置轮播器的状态
	setStatus: function() {
		var _self = this,
			opts = _self.opts;

		opts.bannerShowArea.style.width = opts.width + "px";
		opts.bannerShowArea.style.height = opts.height + "px";

		_self.setOrientation();

		_self.setPreAndNextBtn();

		_self.mouseEvent();

	},

	// 把新建的  所有图片路径 加到数组里
	_setToInstance: function(ImageUrl) {

		if (!this.constructor.allInstance || (typeof this.constructor.allInstance) == 'undefined') {
			this.constructor.allInstance = [];
		}
		this.constructor.allInstance.push(ImageUrl);
	},

	// 添加轮播图片
	onAddImage: function(imgUrl) {
		var _self = this,
			opts = _self.opts,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0,
			imageLis = document.createDocumentFragment();;

		var imageLi = document.createElement("li");
		_self.BannerImages.appendChild(imageLi);

		var imgHref = document.createElement('a');
		imageLi.appendChild(imgHref);

		var img = document.createElement('img');
		img.src = imgUrl;
		imgHref.appendChild(img);

		_self._setToInstance(imgUrl);

		_self.setShowAllBtn(imgUrl);

		if (opts.moveOrientation == "horizontal") {
			_self.show(_self.showPosition);
		} else if (opts.moveOrientation == "verical") {

		}

	},

	// 移除轮播图片
	removeImage: function(imgPosition) {
		var _self = this,
			opts = _self.opts,
			allInstance = this.constructor.allInstance,
			imgLis = _self.BannerImages.getElementsByTagName('li'),
			btnLis = _self.showAllBtn.getElementsByTagName('li');

		for (var i = 0, len = allInstance.length; i < len; i++) {

			if (i == imgPosition) {
				var s = allInstance.splice(i, 1);
				console.info(_self.BannerImages);
				_self.BannerImages.removeChild(imgLis[i]);
				_self.showAllBtn.removeChild(btnLis[i]);
			}
			if (opts.showAllBtnType == "figure") {
				_self.setFiguraBtn();
			}

		}

		if (imgPosition == _self.showPosition) {
			if (imgPosition == allInstance.length) {
				imgPosition = 0;
			}
			_self.showPosition = imgPosition;
			_self.show(imgPosition)
		} else if (imgPosition < _self.showPosition) {
			_self.hide(_self.showPosition - 1)
			if (_self.showPosition == allInstance.length) {
				_self.showPosition = 0;
			}
			_self.show(_self.showPosition)
		}

	},

	// 设置图片轮播的方向
	setOrientation: function() {
		var _self = this,
			opts = _self.opts;

		console.info(this.constructor.allInstance)

		switch (opts.moveOrientation) {
			case "horizontal":
				_self.bannerHorizoncal();
				_self.tInterval = setInterval(function() {
					_self.moveRight();
				}, opts.bannerTime * 1000);
				break;
			case "verical":
				_self.bannerVertical();
								_self.tInterval = setInterval(function() {
									_self.moveTop();
								}, opts.bannerTime * 1000);
				break;
			default:
				break;
		}
	},

	// 图片垂直方向上移动
	bannerVertical: function() {
		var _self = this,
			opts = _self.opts

		EventUtil.addClassName(_self.BannerImages, 'banner-images-v');
	},

	// 图片水平方向上移动
	bannerHorizoncal: function() {
		var _self = this,
			opts = _self.opts

		EventUtil.addClassName(_self.BannerImages, 'banner-images-h');
	},

	// 轮播器向左滑动
	moveLeft: function() {
		var _self = this,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0

		if (len < 0) {
			return
		}

		_self.hide(_self.showPosition);

		if (_self.showPosition <= 0) {
			_self.showPosition = len;
		}

		_self.showPosition--;

		_self.show(_self.showPosition);

	},

	// 轮播器向右滑动
	moveRight: function() {
		var _self = this,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0

		if (len > 0) {
			_self.hide(_self.showPosition);

			if (_self.showPosition >= len - 1) {
				_self.showPosition = -1;
			}

			_self.showPosition++;

			_self.show(_self.showPosition);
		}

	},

	// 轮播器向上滑动
	moveTop: function() {
		var _self = this,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0

		//		_self.scrollHide(_self.showPosition);
		//
		if (_self.showPosition >= len - 1) {
			_self.showPosition = -1;
		}
		if (_self.showPosition <= 0) {
			_self.showPosition = len;
		}

		_self.showPosition++;

		_self.scrollShow(_self.showPosition);
	},

	// 轮播器向下滑动
	moveBottom: function() {
		var _self = this,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0

		console.info(_self.showPosition)

		_self.scrollHide(_self.showPosition);

		if (_self.showPosition <= 0) {
			_self.showPosition = len;
		}

		_self.showPosition--;

		_self.scrollShow(_self.showPosition);
	},

	// 显示图片
	show: function(n) {
		var _self = this

		var imgLi = _self.BannerImages.getElementsByTagName('li')[n],
			btnLi = _self.showAllBtn.getElementsByTagName('li')[n];

		EventUtil.addClassName(imgLi, 'active');
		EventUtil.addClassName(btnLi, 'active');
	},

	// 隐藏图片
	hide: function(n) {
		var _self = this

		var imgLi = _self.BannerImages.getElementsByTagName('li')[n],
			btnLi = _self.showAllBtn.getElementsByTagName('li')[n];

		imgLi.classList.remove('active');
		btnLi.classList.remove('active');
	},

	scrollShow: function(n) {
		var _self = this,
			opts = _self.opts,
			imgLi = _self.BannerImages.getElementsByTagName('li')[n],
			btnLi = _self.showAllBtn.getElementsByTagName('li')[n];
		switch (opts.moveOrientation) {
			case 'verical':
				setTimeout(function(){
					_self.BannerImages.style.top = _self.BannerImages.style.top - 
									opts.height / (opts.bannerTime)  + "px";
				},opts.bannerTime * 1000);
				break;
			default:
				break;
		}
		EventUtil.addClassName(btnLi, 'active');
	},

	scrollHide: function(n) {
		var _self = this,
			opts = _self.opts,
			imgLi = _self.BannerImages.getElementsByTagName('li')[n],
			btnLi = _self.showAllBtn.getElementsByTagName('li')[n];

		switch (opts.moveOrientation) {
			case 'verical':
				distance = opts.bannerShowArea.clientHeight;
				imgLi.classList.remove('active');
				break;
			default:
				break;
		}
		btnLi.classList.remove('active');
	},

	// 左右按钮
	setPreAndNextBtn: function() {
		var _self = this,
			opts = _self.opts,
			height = _self.preBtn.clientHeight,
			len = _self.constructor.allInstance ? this.constructor.allInstance.length : 0;

			_self.preBtn.style.top = (opts.height / 2 - height / 2) + "px";
			_self.nextBtn.style.top = (opts.height / 2 - height / 2) + "px";

			switch (opts.moveOrientation) {
				case "horizontal":
						EventUtil.event.addHandler(_self.preBtn, 'click', function() {
							_self.moveLeft();
						});
						EventUtil.event.addHandler(_self.nextBtn, 'click', function() {
							_self.moveRight();
						});
					break;
				default:
					break;
			}
	},

	// 鼠标移入和移除 图片轮播器事件
	mouseEvent: function() {
		var _self = this,
			opts = _self.opts,
			len = _self.constructor.allInstance ? this.constructor.allInstance.length : 0;

		switch (opts.moveOrientation) {
			case "horizontal":
					EventUtil.event.addHandler(opts.bannerShowArea, 'mouseover', function() {
						clearInterval(_self.tInterval);
					});
					EventUtil.event.addHandler(opts.bannerShowArea, 'mouseout', function() {
						_self.tInterval = setInterval(function() {
							_self.moveRight();
						}, opts.bannerTime * 1000);
					});
				break;
			default:
				break;
		}
	},

	// showAllBtn
	setShowAllBtn: function(imgUrl) {
		var _self = this,
			opts = _self.opts,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0,
			btnLis = document.createDocumentFragment();;

		var btnLi = document.createElement("li");
		_self.showAllBtn.appendChild(btnLi);

		switch (opts.showAllBtnType) {
			case "point":
				_self.setPointBtn();
				break;
			case "figure":
				_self.setFiguraBtn();
				break;
			case "image":
				_self.setImageBtn({
					currentLi: btnLi,
					imageUrl: 　imgUrl
				});
				break;
			case "text":
				_self.setTextBtn();
				break;
			case "none":
				break;
			default:
				break;
		}

		_self.showAllBtnEvent();

	},

	// showAllBtn按钮点击事件
	showAllBtnEvent: function() {
		var _self = this,
			opts = _self.opts,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0,
			imgLis = _self.BannerImages.getElementsByTagName('li'),
			btnLis = _self.showAllBtn.getElementsByTagName('li');

		switch (opts.moveOrientation) {
			case "horizontal":
				if (len > 0) {
					for (var i = 0; i < len; i++) {
						btnLis[i].index = i;
						btnLis[i].onclick = function() {
							_self.hide(_self.showPosition)
							_self.show(this.index);
							_self.showPosition = this.index;
						}
					}
				}
				break;
			default:
				break;
		}
	},

	// 点按钮
	setPointBtn: function() {
		var _self = this;

		EventUtil.addClassName(_self.showAllBtn, "point-type");
	},

	// 数字按钮
	setFiguraBtn: function() {
		var _self = this,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0,
			lis = _self.showAllBtn.getElementsByTagName('li');
		for (var i = 1; i <= len; i++) {
			lis[i - 1].innerHTML = i;
		}
		EventUtil.addClassName(_self.showAllBtn, "figure-type");
	},

	// 图片按钮
	setImageBtn: function(param) {
		var _self = this,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0;

		var imgbtn = document.createElement('img');
		//		imgbtn.src = this.constructor.allInstance[len-1];
		imgbtn.src = param.imageUrl;
		param.currentLi.appendChild(imgbtn);

		EventUtil.addClassName(_self.showAllBtn, "image-type");
	},

	// 文本按钮
	setTextBtn: function() {
		var _self = this,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0,
			lis = _self.showAllBtn.getElementsByTagName('li');

		for (var i = 1; i <= len; i++) {
			var textbtn = document.createElement('span');
			textbtn.innerHTML = "我是第" + i + "张图片";
			lis[i - 1].appendChild(textbtn);
		}

		EventUtil.addClassName(_self.showAllBtn, "text-type");
	},

}