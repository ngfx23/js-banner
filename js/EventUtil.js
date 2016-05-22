var EventUtil = {
		event: {
			addHandler: function(element, type, handler) {
				if (element.addEventListener) {
					element.addEventListener(type, handler, false);
				} else if (element.attachEvent) {
					element.attachEvent("on" + type, handler);
				} else {
					element["on" + type] = handler;
				}
			},
			removeHandler: function(element, type, handler) {
				if (element.removeEventListener) {
					element.removeEventListener(type, handler, false);
				} else if (element.detachEvent) {
					element.detachEvent("on" + type, handler);
				} else {
					element["on" + type] = null;
				}
			},
			getEvent: function(event) {
				return event ? event : window.event;
			},
			getTarget: function(event) {
				return event.target || event.srcElement;
			},
			stopPropagation: function(event) {
				if (event.stopPropagation) {
					event.stopPropagation();
				} else {
					event.cancelBubble = true;
				}
			},
			preventDefault: function(event) {
				if (event.preventDefault) {
					event.preventDefault();
				} else {
					event.returnValue = false;
				}
			},
			getMousePoint: function(event) {
				
				var point = {
					x : event.pageX,
					y : event.pageY
				}
				
				if (point.x === undefined) {
					point.x = event.clientX + (document.body.scrollLeft ||
						document.documentElement.scrollLeft);
				}
				if (point.y === undefined) {
					point.y = event.clientY + (document.body.scrollTop ||
						document.documentElement.scrollTop);
				}
				
				return point;
			},
	},
	extend: function() {
		var result = {};
		for (var i = 0, len = arguments.length; i < len; i++) {
			for (var j in arguments[i]) {
				if (arguments[i].hasOwnProperty(j)) {
					result[j] = arguments[i][j];
				}
			}
		}
		return result;
	},
	deepCopy : function() {
		var result = {};
		
		// 循环传来的值
		for (var i = 0, len = arguments.length; i < len; i++) {
			copy(arguments[i]);
		}
        
		function copy(value) {
			for (var j in value) {
				// 如果val是对象的话，就进行递归
				a = (typeof value[j]) === 'object' ? arguments.callee(value[j]) : value[j];
				
				if (a != "undefined") {
					result[j] = a;
				}
			}
		}
		
		return result;
	},
	addClassName : function(element){
		if (typeof element.classList !== 'undefined') {
					for (var i = 1, len = arguments.length; i < len; i++) {
						element.classList.add(arguments[i]);
					}
				} else {
						//首先，取得类名字符串并拆分成数组
					var classNames = element.className.split(/\s+/);
					for (var i = 1, len = arguments.length; i < len; i++) {
						classNames.push(arguments[i]);
					}
					element.className = classNames.join(" ");
					
				}
	},
	removeClassName : function(element){
		for (var i = 1, len = arguments.length; i < len; i++) {
			console.info(element.classList.size)
			for (var j = 0 , k = element.classList; j < k; j++) {
				console.info(element.classList[j])
				if(element.classList[j] == arguments[i]){
					element.classList.remove(arguments[i]);
				}
			}
			
		}
	}
};