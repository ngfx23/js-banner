CustomBanner.defaultParameter = {
	width: 500,
	height: 300,

	minWidth: 100,
	minHeight: 100,

	bannerShowArea: document.body,

	ImageUrl: "img/1.jpg",
	ImageIndex: 2,

	moveOrientation: "horizontal",
	bannerTime: 3,
	showAllBtnType: "point", // figure point image text none

	haslrBtn: true
}

function CustomBanner(opts) {
	var options = this.constructor.defaultParameter;
	this.opts = EventUtil.extend(options, opts);

	this.init();
}

CustomBanner.prototype = {
	constructor: CustomBanner,

	// 初始化
	init: function() {
		var _self = this

		_self._create();

		_self.addImage();

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

		_self.setPreAndNextBtn();

	},

	// 把新建的  所有图片路径 加到数组里
	_setToInstance: function(ImageUrl) {
		if (!this.constructor.allInstance) {
			this.constructor.allInstance = [];
		}
		this.constructor.allInstance.push(ImageUrl);
		console.info(this.constructor.allInstance)
	},

	// 添加轮播图片
	addImage: function() {
		//		var _self = this,
		//			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0,
		//			imageLis = document.createDocumentFragment();;
		//		
		//		for (var i = 0; i < len; i++) {
		//			var imageLi = document.createElement("li");
		//			imageLis.appendChild(imageLi);
		//			
		//			var imgHref = document.createElement('a');
		//			imageLi.appendChild(imgHref);
		//			
		//			var img = document.createElement('img');
		//			img.src = this.constructor.allInstance[i];
		//			imgHref.appendChild(img);
		//			
		//		}
		//		_self.BannerImages.appendChild(imageLis);

	},

	onAddImage: function(imgUrl) {
		var _self = this,
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

	},

	// 移除轮播图片
	removeImage: function() {

	},

	// 设置图片轮播的方向
	setOrientation: function() {

	},

	// 图片水平方向上移动
	bannerVertical: function() {

	},

	// 图片垂直方向上移动
	bannerHorizoncal: function() {

	},

	// 图片移动方向
	moveLeft: function() {

	},

	moveRight: function() {

	},

	moveTop: function() {

	},

	moveBottom: function() {

	},

	// 显示
	show: function() {

	},

	// 显示
	hide: function() {

	},

	// 左右按钮
	setPreAndNextBtn: function() {
		var opts = this.opts,
			height = this.preBtn.clientHeight;
		this.preBtn.style.top = (opts.height / 2 - height / 2) + "px";
		this.nextBtn.style.top = (opts.height / 2 - height / 2) + "px";
	},

	// showAllBtn
	setShowAllBtn: function(imgUrl) {
		var _self = this,
			opts = _self.opts,
			len = this.constructor.allInstance ? this.constructor.allInstance.length : 0,
			btnLis = document.createDocumentFragment();;

		//for (var i = 0; i < len; i++) {
		var btnLi = document.createElement("li");
		//	btnLis.appendChild(btnLi);
		//}
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