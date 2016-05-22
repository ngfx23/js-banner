CustomBanner.defaultParameter = {
	width: 500, // 轮播器宽度
	height: 300, // 轮播器高度

	minWidth: 200,  // 轮播器最小宽度
	minHeight: 200, // 轮播器最小高度

	bannerShowArea: document.body, // 轮播器区域

	ImageUrl: "img/1.jpg",
	ImageIndex: 2,

	moveOrientation: "horizontal", // horizontal verical 轮播器图片滚动方向
	bannerTime: 3, // 轮播器定时滚动时间间隔（单位：秒）
	indicatorType: "figure", // figure point image text none 轮播器小按钮类型

	haslrBtn: true // 轮播器是否显示左右按钮 
}

function CustomBanner(opts) {
	var options = this.constructor.defaultParameter;
	this.opts = EventUtil.extend(options, opts);

	this.init();

	this.showPosition = 0;
	
	this.srcArray = [];
}

CustomBanner.prototype = {
	constructor: CustomBanner,

	// 初始化
	init: function() {
		var _self = this,
			opts = _self.opts
			
		_self.opts.width = Math.max(opts.minWidth, opts.width);
		_self.opts.height = Math.max(opts.minHeight, opts.height);
		
		_self._create();

		_self.setStatus();

	},

	// 创建轮播器
	_create: function() {
		var _self = this,
			opts = _self.opts;

//		opts.bannerShowArea.classList.add('banner-outer');

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
		var indicatorBtn = document.createElement('ul');
		EventUtil.addClassName(indicatorBtn, "show-all-btn");
		BannerWarpper.appendChild(indicatorBtn);
		_self.indicatorBtn = indicatorBtn;

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
		this.srcArray.push(ImageUrl);
	},

	// 添加轮播图片
	onAddImage: function(imgUrl) {
		var _self = this,
			opts = _self.opts,
			len = this.srcArray ? this.srcArray.length : 0,
			imageLis = document.createDocumentFragment();;

		// 添加轮播器存放图片的li
		var imageLi = document.createElement("li");
		imageLi.style.height = opts.height + "px";
		_self.BannerImages.appendChild(imageLi);

		// 添加轮播器存放图片的连接
		var imgHref = document.createElement('a');
		imageLi.appendChild(imgHref);

		// 添加轮播器图片
		var img = document.createElement('img');
		img.src = imgUrl;
		imgHref.appendChild(img);

		// 将添加的图片添加到数组中
		_self._setToInstance(imgUrl);

		// 给添加的图片添加一个小按钮
		_self.setindicatorBtn(imgUrl);

		// 根据图片播放的方向 显示第一张图片和对应的小按钮
		if (opts.moveOrientation == "horizontal") {
			_self.show(_self.showPosition);
		} else if (opts.moveOrientation == "verical") {
			_self.scrollShow(_self.showPosition);
		}

	},

	// 移除轮播图片
	removeImage: function(imgPosition) {
		var _self = this,
			opts = _self.opts,
			allInstance = _self.srcArray,
			imgLis = _self.BannerImages.getElementsByTagName('li'),
			btnLis = _self.indicatorBtn.getElementsByTagName('li');

		for (var i = 0, len = _self.srcArray.length; i < len; i++) {
			// 找到轮播器图片的位置等于摇椅处图片的位置，删除该图片和图片对应的小按钮
			if (i == imgPosition) {
				var s = allInstance.splice(i, 1);
				console.info(_self.BannerImages);
				_self.BannerImages.removeChild(imgLis[i]);
				_self.indicatorBtn.removeChild(btnLis[i]);
			}
			// 当小按钮的类型为数字是，重新设置小按钮
			if (opts.indicatorType == "figure") {
				_self.setFiguraBtn();
			}

		}

		// 当移除图片的位置刚好等于图片播放的位置，图片播放的位置不变
		if (imgPosition == _self.showPosition) {
			if (imgPosition == allInstance.length) {
				imgPosition = 0;
			}
			_self.showPosition = imgPosition;
			_self.show(imgPosition)
		} else if (imgPosition < _self.showPosition) { // 当图片移除的位置小于图片播放的位置
			// 隐藏图片播放位置-1的图片
			_self.hide(_self.showPosition - 1)
			// 图片播放的位置刚好等于轮播器图片的数量，将图片播放位置置于0
			if (_self.showPosition == allInstance.length) {
				_self.showPosition = 0;
			}
			// 显示图片
			_self.show(_self.showPosition)
		}

	},

	// 设置图片轮播的方向
	setOrientation: function() {
		var _self = this,
			opts = _self.opts;

		switch (opts.moveOrientation) {
			case "horizontal": // 图片水平播放
				_self.bannerHorizoncal();
				// 设置图片定时播放
				_self.tInterval = setInterval(function() {
					_self.moveRight();
				}, opts.bannerTime * 1000);
				break;
			case "verical": // 图片垂直播放
				_self.bannerVertical();
				// 设置图片定时播放
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
		// 给存放图片的ul添加样式
		EventUtil.addClassName(_self.BannerImages, 'banner-images-v');
	},

	// 图片水平方向上移动
	bannerHorizoncal: function() {
		var _self = this,
			opts = _self.opts
		// 给存放图片的ul添加样式
		EventUtil.addClassName(_self.BannerImages, 'banner-images-h');
	},

	// 轮播器向左滑动
	moveLeft: function() {
		var _self = this,
			len = _self.srcArray ? _self.srcArray.length : 0
    
		if (len < 0) {
			return
		}
		
		// 隐藏当前位置的图片 
		_self.hide(_self.showPosition);
        // 图片位置小于0，就将图片位置置于最大图片位置
		if (_self.showPosition <= 0) {
			_self.showPosition = len;
		}
		// 图片显示位置减1
		_self.showPosition--;
		// 显示当前位置的图片
		_self.show(_self.showPosition);

	},

	// 轮播器向右滑动
	moveRight: function() {
		var _self = this,
			len = _self.srcArray ? _self.srcArray.length : 0

		if (len > 0) {
			// 隐藏当前位置的图片 
			_self.hide(_self.showPosition);
			 // 图片位置大于（最大图片位置-1），就将图片位置置于-1
			if (_self.showPosition >= len - 1) {
				_self.showPosition = -1;
			}
			// 图片显示位置加1
			_self.showPosition++;
			// 显示当前位置的图片
			_self.show(_self.showPosition);
		}

	},

	// 轮播器向上滑动
	moveTop: function() {
		var _self = this,
			len = _self.srcArray ? _self.srcArray.length : 0
		// 隐藏当前位置的图片 
		_self.scrollHide(_self.showPosition);
		// 图片显示位置加1
		_self.showPosition++;
		 // 图片位置大于（最大图片位置-1），就将图片位置置于0
		if (_self.showPosition > (len - 1)) {
			_self.showPosition = 0;
		}
		// 显示当前位置的图片
		_self.scrollShow(_self.showPosition);
	},

	// 显示图片
	show: function(n) {
		var _self = this

		var imgLi = _self.BannerImages.getElementsByTagName('li')[n],
			btnLi = _self.indicatorBtn.getElementsByTagName('li')[n];
		
		// 给当前显示的图片和对应的按钮加样式
		EventUtil.addClassName(imgLi, 'active');
		EventUtil.addClassName(btnLi, 'active');
	},

	// 隐藏图片
	hide: function(n) {
		var _self = this

		var imgLi = _self.BannerImages.getElementsByTagName('li')[n],
			btnLi = _self.indicatorBtn.getElementsByTagName('li')[n];

		// 移除当前显示的图片和对应的按钮加样式
		imgLi.classList.remove('active');
		btnLi.classList.remove('active');
	},

	scrollShow: function(n) {
		var _self = this,
			opts = _self.opts,
			len = _self.srcArray ? _self.srcArray.length : 0,
			imgLi = _self.BannerImages.getElementsByTagName('li')[n],
			btnLi = _self.indicatorBtn.getElementsByTagName('li')[n];
			
		switch (opts.moveOrientation) {
			case 'verical':
				// 轮播器的高度
				distance = opts.bannerShowArea.clientHeight;
				// 设置存放轮播器图片的ul的top
				var top = parseInt(_self.BannerImages.style.top) || 0;
				// 设置轮播器图片滚动的top变化和动画效果
				_self.animate(_self.BannerImages, {
					top: top
				}, {
					top: (-n * distance) - top
				}, 1000, _self.Quad);
				break;
			default:
				break;
		}
		// 给显示图片对应的小按钮加上样式
		if(len > 0){
		EventUtil.addClassName(btnLi, 'active');
		}
	},
	
	// 垂直播放 轮播器图片的动画
	animate: function(o, start, alter, dur, fx) {
		var curTime = 0;
		var t = setInterval(function() {
			if (curTime >= dur) {
				clearInterval(t);
			}
			for (var i in start) {
				o.style[i] = fx(start[i], alter[i], curTime, dur) + "px";
			}
			curTime += 50;
		}, 50);
		return t;
	},

	// 动画的计算
	Quad: function(start, alter, curTime, dur) {
		return start + Math.pow(curTime / dur, 2) * alter;
	},

	// 垂直播放 隐藏上一个对应小按钮的样式
	scrollHide: function(n) {
		var _self = this,
			len = _self.srcArray ? _self.srcArray.length : 0,
			btnLi = _self.indicatorBtn.getElementsByTagName('li')[n];
		
		if(len > 0){
			btnLi.classList.remove('active');
		}
		
	},

	// 左右按钮
	setPreAndNextBtn: function() {
		var _self = this,
			opts = _self.opts,
			height = _self.preBtn.clientHeight,
			len = _self.srcArray ? _self.srcArray.length : 0;
			
			if(!opts.haslrBtn){return}

			// 给左右按钮设置top值，让它相对于轮播器高度居中
			_self.preBtn.style.top = (opts.height / 2 - height / 2) + "px";
			_self.nextBtn.style.top = (opts.height / 2 - height / 2) + "px";

			// 根据图片播放方向，设置左右按钮的事件
			switch (opts.moveOrientation) {
				case "horizontal": // 水平播放，左右按钮的点击事件
						EventUtil.event.addHandler(_self.preBtn, 'click', function() {
							_self.moveLeft();
						});
						EventUtil.event.addHandler(_self.nextBtn, 'click', function() {
							_self.moveRight();
						});
					break;
				case "verical": // 垂直播放，左右按钮隐藏
						_self.preBtn.style.display = "none";
						_self.nextBtn.style.display = "none";
				break;
				default:
					break;
			}
	},

	// 鼠标移入和移除 图片轮播器事件
	mouseEvent: function() {
		var _self = this,
			opts = _self.opts,
			len = _self.srcArray ? _self.srcArray.length : 0;

		//  根据图片播放方向，设置鼠标移入和移出轮播器的事件
		switch (opts.moveOrientation) {
			case "horizontal": // 水平
					EventUtil.event.addHandler(opts.bannerShowArea, 'mouseover', function() {
						clearInterval(_self.tInterval);
					});
					EventUtil.event.addHandler(opts.bannerShowArea, 'mouseout', function() {
						_self.tInterval = setInterval(function() {
							_self.moveRight();
						}, opts.bannerTime * 1000);
					});
				break;
			case "verical": // 垂直
				EventUtil.event.addHandler(opts.bannerShowArea, 'mouseover', function() {
					clearInterval(_self.tInterval);
				});
				EventUtil.event.addHandler(opts.bannerShowArea, 'mouseout', function() {
					_self.tInterval = setInterval(function() {
						_self.moveTop();
					}, opts.bannerTime * 1000);
				});
				break;
			default:
				break;
		}
	},

	// indicatorBtn
	setindicatorBtn: function(imgUrl) {
		var _self = this,
			opts = _self.opts,
			len = _self.srcArray ? _self.srcArray.length : 0,
			btnLis = document.createDocumentFragment();;

		// 根据添加的图片，添加对应的小图标Li
		var btnLi = document.createElement("li");
		_self.indicatorBtn.appendChild(btnLi);

		// 根据小图标类型，设置样式
		switch (opts.indicatorType) {
			case "point": // 点按钮
				_self.setPointBtn();
				break;
			case "figure": // 数字按钮
				_self.setFiguraBtn();
				break;
			case "image": // 图片按钮
				_self.setImageBtn({
					currentLi: btnLi,
					imageUrl: 　imgUrl
				});
				break;
			case "text": // 文本按钮
				_self.setTextBtn();
				break;
			case "none": // 不设置按钮
				break;
			default:
				break;
		}

		_self.indicatorBtnEvent();

	},

	// indicatorBtn按钮点击事件
	indicatorBtnEvent: function() {
		var _self = this,
			opts = _self.opts,
			len = _self.srcArray ? _self.srcArray.length : 0,
			imgLis = _self.BannerImages.getElementsByTagName('li'),
			btnLis = _self.indicatorBtn.getElementsByTagName('li');

		// 根据图片移动方向，设置图片小按钮的显示方式
		switch (opts.moveOrientation) {
			case "horizontal": // 水平
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
			case "verical": // 垂直
				if (len > 0) {
					for (var i = 0; i < len; i++) {
						btnLis[i].index = i;
						btnLis[i].onclick = function() {
							_self.scrollHide(_self.showPosition)
							_self.scrollShow(this.index);
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

		EventUtil.addClassName(_self.indicatorBtn, "point-type");
	},

	// 数字按钮
	setFiguraBtn: function() {
		var _self = this,
			len = _self.srcArray ? _self.srcArray.length : 0,
			lis = _self.indicatorBtn.getElementsByTagName('li');
		for (var i = 1; i <= len; i++) {
			lis[i - 1].innerHTML = i;
		}
		EventUtil.addClassName(_self.indicatorBtn, "figure-type");
	},

	// 图片按钮
	setImageBtn: function(param) {
		var _self = this,
			len = _self.srcArray ? _self.srcArray.length : 0;

		var imgbtn = document.createElement('img');
		//		imgbtn.src = _self.srcArray[len-1];
		imgbtn.src = param.imageUrl;
		param.currentLi.appendChild(imgbtn);

		EventUtil.addClassName(_self.indicatorBtn, "image-type");
	},

	// 文本按钮
	setTextBtn: function() {
		var _self = this,
			len = _self.srcArray ? _self.srcArray.length : 0,
			lis = _self.indicatorBtn.getElementsByTagName('li');

		for (var i = 1; i <= len; i++) {
			lis[i - 1].innerHTML = "我是第" + i + "张图片";
		}

		EventUtil.addClassName(_self.indicatorBtn, "text-type");
	},

}