// 用于判断动画是否结束
var tree = false;
// 根节点
var root = document.getElementsByClassName('one')[0];
// 用于接收排序好的元素
var arr = [];
// 动画
function arrEach(arr, className) {
	arrLength = arr.length;
	if (!tree) {
		tree = true;
		for (var i = 0; i < arrLength; i++) {
			~ function(i) {
				arr[i].timer1 = setTimeout(function() {
					operate.addClass(arr[i], className);
					if (i == (arrLength - 1)) {
						tree = false;
					}
				}, i * 500);
				arr[i].timer2 = setTimeout(function() {
					operate.removeClass(arr[i], className);
				}, (i + 1) * 500);
			}(i)
		}
	}
}

// 前序遍历
function frontEach(T) {
	if (T == null) {
		return;
	}
	arr.push(T);
	frontEach(operate.firstChild(T));
	frontEach(operate.lastChild(T));
}
// 中序遍历
function middleEach(T) {
	if (T == null) {
		return;
	}
	middleEach(operate.firstChild(T));
	arr.push(T);
	middleEach(operate.lastChild(T));
}
// 后序遍历
function endEach(T) {
	if (T == null) {
		return;
	}
	var child = operate.childNodes(T);
	endEach(operate.firstChild(T));
	endEach(operate.lastChild(T));
	arr.push(T);
}

// 事件
function typeBind(ele, type, callback, className) {
	if (!tree) {
		eventUnit.addHandler(ele, type, function(e) {
			var event = eventUnit.getEvent(e);
			eventUnit.preventDafault();
			arr = [];
			callback(root);
			arrEach(arr, className);
		});
	}
}
// 绑定
function init(id, type, callback, style) {
	var btn = document.getElementById(id);
	this.typeBind(btn, type, callback, style);
}

window.onload = function() {
	init('btn1', 'click', frontEach, 'color');
	init('btn2', 'click', middleEach, 'color');
	init('btn3', 'click', endEach, 'color');
};