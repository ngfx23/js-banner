/*=================================Figure===========================================*/
/* 水平轮播器 */
var banner = new CustomBanner({
	bannerShowArea: document.getElementById('imageBanner'),
});

/* 添加图片 */
var n = 1;
var addFigurehBtn = document.getElementById('addFigurehBtn');
EventUtil.event.addHandler(addFigurehBtn, 'click', function() {
	banner.onAddImage("img/" + n + ".jpg");
	n++;
	if (n == 6) {
		n = 1;
	}
})

/* 根据位置将图片移除 */
var removeFigurehBtn = document.getElementById('removeFigurehBtn');
EventUtil.event.addHandler(removeFigurehBtn, 'click', function() {
	var imgPosition = document.getElementById('removeFigureh').value;
	banner.removeImage(imgPosition);
});

/* 垂直轮播器 */
var imgBanner1 = new CustomBanner({
	bannerShowArea: document.getElementById('imgBanner1'),
	moveOrientation: "verical",
});
var n1 = 1;
var addFigurevBtn = document.getElementById('addFigurevBtn');
EventUtil.event.addHandler(addFigurevBtn, 'click', function() {
	imgBanner1.onAddImage("img/" + n1 + ".jpg");
	n1++;
	if (n1 == 6) {
		n1 = 1;
	}
});
/* 根据位置将图片移除 */
var removeFigurevBtn = document.getElementById('removeFigurevBtn');
EventUtil.event.addHandler(removeFigurevBtn, 'click', function() {
	var imgPosition = document.getElementById('removeFigurev').value;
	imgBanner1.removeImage(imgPosition);
});

/*=================================Point===========================================*/
/* 水平轮播器 */
var imageBanner2 = new CustomBanner({
	bannerShowArea: document.getElementById('imageBanner2'),
	indicatorType: "point",
});

/* 添加图片 */
var n2 = 1;
var addPointhBtn = document.getElementById('addPointhBtn');
EventUtil.event.addHandler(addPointhBtn, 'click', function() {
	imageBanner2.onAddImage("img/" + n2 + ".jpg");
	n2++;
	if (n2 == 6) {
		n2 = 1;
	}
})

/* 根据位置将图片移除 */
var removePointhBtn = document.getElementById('removePointhBtn');
EventUtil.event.addHandler(removePointhBtn, 'click', function() {
	var imgPosition = document.getElementById('removePointh').value;
	imageBanner2.removeImage(imgPosition);
});

/* 垂直轮播器 */
var imgBanner3 = new CustomBanner({
	bannerShowArea: document.getElementById('imgBanner3'),
	moveOrientation: "verical",
	indicatorType: "point",
});
var n3 = 1;
var addPointvBtn = document.getElementById('addPointvBtn');
EventUtil.event.addHandler(addPointvBtn, 'click', function() {
	imgBanner3.onAddImage("img/" + n3 + ".jpg");
	n3++;
	if (n3 == 6) {
		n3 = 1;
	}
});
/* 根据位置将图片移除 */
var removePointvBtn = document.getElementById('removePointvBtn');
EventUtil.event.addHandler(removePointvBtn, 'click', function() {
	var imgPosition = document.getElementById('removePointv').value;
	imgBanner3.removeImage(imgPosition);
});


/*=================================Image===========================================*/
/* 水平轮播器 */
var imageBanner4 = new CustomBanner({
	bannerShowArea: document.getElementById('imageBanner4'),
	indicatorType: "image",
});

/* 添加图片 */
var n4 = 1;
var addImagehBtn = document.getElementById('addImagehBtn');
EventUtil.event.addHandler(addImagehBtn, 'click', function() {
	imageBanner4.onAddImage("img/" + n4 + ".jpg");
	n4 ++;
	if (n4 == 6) {
		n4 = 1;
	}
})

/* 根据位置将图片移除 */
var removeImagehBtn = document.getElementById('removeImagehBtn');
EventUtil.event.addHandler(removeImagehBtn, 'click', function() {
	var imgPosition = document.getElementById('removeImageh').value;
	imageBanner4.removeImage(imgPosition);
});

/* 垂直轮播器 */
var imgBanner5 = new CustomBanner({
	bannerShowArea: document.getElementById('imgBanner5'),
	moveOrientation: "verical",
	indicatorType: "image",
});
var n5 = 1;
var addImagevBtn = document.getElementById('addImagevBtn');
EventUtil.event.addHandler(addImagevBtn, 'click', function() {
	imgBanner5.onAddImage("img/" + n5 + ".jpg");
	n5 ++;
	if (n5 == 6) {
		n5 = 1;
	}
});
/* 根据位置将图片移除 */
var removeImagevBtn = document.getElementById('removeImagevBtn');
EventUtil.event.addHandler(removeImagevBtn, 'click', function() {
	var imgPosition = document.getElementById('removeImagev').value;
	imgBanner5.removeImage(imgPosition);
});

/*=================================Text===========================================*/
/* 水平轮播器 */
var imageBanner6 = new CustomBanner({
	bannerShowArea: document.getElementById('imageBanner6'),
	indicatorType: "text",
});

/* 添加图片 */
var n6 = 1;
var addTexthBtn = document.getElementById('addTexthBtn');
EventUtil.event.addHandler(addTexthBtn, 'click', function() {
	imageBanner6.onAddImage("img/" + n6 + ".jpg");
	n6 ++;
	if (n6 == 6) {
		n6 = 1;
	}
})

/* 根据位置将图片移除 */
var removeTexthBtn = document.getElementById('removeTexthBtn');
EventUtil.event.addHandler(removeTexthBtn, 'click', function() {
	var imgPosition = document.getElementById('removeTexth').value;
	imageBanner6.removeImage(imgPosition);
});

/* 垂直轮播器 */
var imgBanner7 = new CustomBanner({
	bannerShowArea: document.getElementById('imgBanner7'),
	moveOrientation: "verical",
	indicatorType: "text",
});
var n7 = 1;
var addTextvBtn = document.getElementById('addTextvBtn');
EventUtil.event.addHandler(addTextvBtn, 'click', function() {
	imgBanner7.onAddImage("img/" + n7 + ".jpg");
	n7 ++;
	if (n7 == 6) {
		n7 = 1;
	}
});
/* 根据位置将图片移除 */
var removeTextvBtn = document.getElementById('removeTextvBtn');
EventUtil.event.addHandler(removeTextvBtn, 'click', function() {
	var imgPosition = document.getElementById('removeTextv').value;
	imgBanner7.removeImage(imgPosition);
});