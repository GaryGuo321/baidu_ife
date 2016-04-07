//polyfill代码
function polyfill() {
	// Object.create的polyfill代码
	if (!Object.create) {
		Object.create = function(o) {
			function F() {};
			F.prototype = o;
			return new F();
		}
	}
	// indexOf兼容
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(x) {
			var result = -1;
			if (this.length == 0) {
				return result;
			}
			for (var i = 0; i < this.length; i++) {
				if (this[i] === x) {
					result = i;
					break;
				}
			}
			return result;
		}
	}
	// getElementsByClassName兼容
	if (!document.getElementsByClassName) {
		document.getElementsByClassName = function(c_name, ele) {
			//用于输出找到的匹配的DOM元素
			var arr = [];
			// 查找元素,并计算数组长度
			var allTag = (ele || document).getElementsByTagName('*');
			var tagLength = allTag.length;
			// 对传进来的c_name参数进行分割,并计算数组长度
			var cNameList = c_name.split(' ');
			var cNameLength = cNameList.length;
			// 对所有的tag元素进行遍历
			for (var i = 0; i < tagLength; i++) {
				// 对每一个tag的class属性进行分割,并计算数组长度
				var classList = allTag[i].className.split(' ');
				var listLength = classList.length;
				// 定义一个空数组
				var judge = [];
				for (var t = 0; t < cNameLength; t++) {
					// 如果cNamelist可以在classList中找到，就给judge push一个true 
					if (classList.indexOf(cNameList[t]) !== -1) {
						judge.push(true);
					}
				}
				// 判断judge是否相等cNameLength，如果相等，表示是我们需要的元素
				if (judge.length === cNameLength) {
					arr.push(allTag[i]);
				}
			}
			return arr;
		}
	}
}
//事件绑定
var eventUnit = {
	/*
	传入要绑定事件的元素，要绑定的事件名，事件处理函数
	*/
	//绑定事件
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			//传入false指定冒泡，传入true指定捕获
			//DOM 2级事件处理程序
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			//DOM 0级事件处理程序
			element["on" + type] = handler;
		}
	},
	//跨浏览器事件对象
	//返回对event的引用方式
	getEvent: function(event) {
		return event ? event : window.event;
	},
	//获取目标元素
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	//阻止默认事件的发生
	preventDafault: function() {
		if (event.preventDafault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	//解除绑定事件
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	//阻止事件冒泡
	stopPropagation: function() {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};
//DOM操作
var operate = {
	// 查看节点类型
	nodeType: function(node) {
		if (node.nodeType === 1) {
			return 'Element Node';
		} else if (node.nodeType === 2) {
			return 'Attribute Node';
		} else if (node.nodeType === 3) {
			return 'Text Node';
		} else {
			return null;
		}
	},
	// 把nodeList数组对象转换成真正的数组
	toArray: function(list) {
		var arr = [];
		var length = list.length;
		if (!Array.prototype.slice) {
			for (var i = 0; i < length; i++) {
				arr.push(list[i]);
			}
		} else {
			arr = Array.prototype.slice(list);
		}
		return arr;
	},
	// 获取文本／修改文本
	text: function(ele, texts) {
		if (texts) {
			ele.firstChild.nodeValue = texts;
			return ele.firstChild.nodeValue;
		} else {
			return ele.firstChild.nodeValue;
		}
	},
	// 获取全部子元素
	childNodes: function(ele) {
		var arr = [];
		var allNodes = ele.childNodes;
		var nodesLength = allNodes.length;
		for (var i = 0; i < nodesLength; i++) {
			if (allNodes[i].nodeType === 1) {
				arr.push(allNodes[i]);
			}
		}
		return arr;
	},
	// 获取第一个子元素
	firstChild: function(ele) {
		var arr = this.childNodes(ele);
		return arr[0];
	},
	// 获取最后一个子元素
	lastChild: function(ele) {
		var arr = this.childNodes(ele);
		var length = arr.length;
		return arr[length - 1];
	},
	// 获取第n个子元素
	nthChild: function(ele, n) {
		var arr = this.childNodes(ele);
		var length = arr.length;
		if (n < (length + 1)) {
			return arr[n - 1];
		} else {
			return null;
		}
	},
	// 获取上一个兄弟元素
	previousSibling: function(ele, parent) {
		var arr = this.childNodes(parent);
		var length = arr.length;
		for (var i = 0; i < length; i++) {
			if (ele === arr[i]) {
				if (i === 0) {
					return null;
				} else {
					return arr[i - 1];
				}
			}
		}
	},
	// 获取下一个兄弟元素
	nextSibling: function(ele, parent) {
		var arr = this.childNodes(parent);
		var lengths = arr.length;
		for (var i = 0; i < lengths; i++) {
			if (ele === arr[i]) {
				if (i === (length - 1)) {
					return null;
				} else {
					return arr[i + 1];
				}
			}
		}
	},
	// 获取其余全部兄弟元素
	allSibling: function(ele, parent) {
		var arr = this.childNodes(parent);
		var length = arr.length;
		for (var i = 0; i < length; i++) {
			if (ele === arr[i]) {
				arr.splice(i, 1);
				break;
			}
		}
		return arr;
	},
	// 获取父元素
	parentNode: function(ele) {
		return ele.parentNode;
	},
	// insertAfter方法：
	insertAfter: function(newElement, targetElement) {
		var parent = targetElement.parentNode;
		if (parent.lastChild == targetElement) {
			parent.appendChild(newElement);
		} else {
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	},
	// addClass方法(不覆盖)
	addClass: function(ele, name) {
		if (!ele.className) {
			ele.className = name;
		} else {
			newClassName = ele.className;
			newClassName += " ";
			newClassName += name;
			ele.className = newClassName;
		}
	},
	// addClass方法(覆盖)
	addCoverClass: function(ele, name) {
		ele.className = name;
	},
	// removeClass方法
	removeClass: function(ele, name) {
		if (!name) {
			ele.className = "";
		} else {
			var allClass = ele.className.split(" ");
			var num = allClass.indexOf(name);
			if (num != -1) {
				allClass.splice(num, 1);
				allClass = allClass.join(" ");
				ele.className = allClass;
			}
		}
	}
};
//cookie
var cookieUtil = {
	//获取cookie的值
	get: function(name) {
		var cookieName = encodeURIComponent(name) + '=',
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
		if (cookieStart > -1) {
			//取得name ＝ value;的位置
			var cookieEnd = document.cookie.indexOf(';', cookieStart); //从存在的name那里开始找，找到；符号为止
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			} //如果没有找到；表示此cookie是最后一个
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
		}
		return cookieValue;
	},
	// 设置cookie的值
	set: function(name, value, expires, path, domain, secure) {
		// var exdate = new Date();
		// exdate.setDate(exdate.getDate() + expires);
		var cookieText = encodeURIComponent(name) + '=' +
			encodeURIComponent(value);
		if (expires instanceof Date) {
			cookieText += ';expires=' + expires.toGMTString();
		}
		if (path) {
			cookieText += ';path=' + path;
		}
		if (domain) {
			cookieText += ';domain=' + domain;
		}
		if (secure) {
			cookieText += ';secure';
		}
		document.cookie = cookieText;
	},
	// 消除cookie
	unset: function(name, path, domain, secure) {
		this.set(name, '', new Date(0), domain, path, secure);
	}
};
//动画
//ele : 要执行动画的元素
//json : 动画属性，接收对象的格式，如果设置透明度要设置成100单位的。即0.5要设置成50
// 格式：{
// 	height: 500,
// 	opacity: 50
// }
//speedType : true 缓冲 false 匀速
//time : 完成动画的时间，这个有点bug
//callback : 如果要进行链式运动则传入callback
function myAnimate(ele, json, time, speedType, callback) {
	var times = time / 10;
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		var flag = true; //用于判断运动状态是否全都完成
		//利用for...in进行同时动画
		for (var attr in json) {
			// 1 取值
			if (attr == 'opacity') {
				var preValue = Math.round(parseFloat(getStyle(ele, attr)) * 100);
			} else {
				var preValue = parseInt(getStyle(ele, attr));
			}
			// 2 速度计算
			if (speedType) {
				//缓冲运动
				var speed = (json[attr] - preValue) / 10;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			} else {
				//匀速运动
				if (json[attr] > preValue) {
					var speed = 10;
				} else {
					var speed = -10;
				}
			}
			// 3 检测停止

			if (preValue != json[attr]) {
				flag = false;
			}
			//进行动画操作
			if (attr == 'opacity') {
				ele.style.opacity = (preValue + speed) / 100;
				ele.style.filter = 'alpha(opacity=' + preValue + speed + ')';
			} else {
				ele.style[attr] = preValue + speed + "px";
			}
		}
		//判断动画停止
		if (flag) {
			clearInterval(ele.timer);
			if (callback) {
				callback();
			}
		}
	}, times);
}
// 获取css样式表的值
// ele : 要获取属性的元素
// attr : 想要获取的属性
function getStyle(ele, attr) {
	//能力检测
	if (ele.currentStyle) {
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele, false)[attr];
	}
}
//加载完后要执行的函数
//window.onload的包装函数;
//如果有需要使用到window.onload函数的时候，就调用：addLoad(func);
function addLoad(fn) {
	//把函数之前的window.onload赋值给oldOnload
	var oldOnload = window.onload;
	//添加新的window.onload或者覆盖旧的window.onload
	if (typeof window.onload != 'function') {
		window.onload = fn;
	} else {
		window.onload = function() {
			oldOnload();
			fn();
		}
	}
}

addLoad(polyfill);