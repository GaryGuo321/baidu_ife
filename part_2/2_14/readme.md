数组sort()的用法：

1. arr.sort()
	数组元素会转换成字符串来比较
	排列方法是按照ASCII码来排序，而不是按照元素本身大小来排序，而且是一位一位的比较
	比如：abc abd bcf acf
	（1）比较 a和a和b和a b比a大，那么确定bcf在最后
	（2）比较 b和b和c比较 c比b大，确定acf是倒数第二个
	（3）比较 c和d c比d小 确定abc比abd小
	所以排列的顺序是：abc abd acf bcf

2. arr.sort(compare)
	sort方法还可以接受参数，参数是一个函数，并且函数需要有两个参数
	函数中可以对这两个参数的比较方式进行规定
	如果比较返回正数：则参数换位置
	如: 
	if(a>b){
		return 1;
	}
	表示如果a>b则a和b对调

	如果比较返回0或负数：则参数不动


动态创建DOM：

document.createElement('p'); 创建元素节点
document.createTextNode(text) 创建文本节点

创建后这两个节点并不再节点树中，需要我们手动加入到DOM树中
parent.appendChild(child) 把节点加入到DOM树

appendChild不会像innerHTML那么粗暴
innerHTML会把标签内的所有内容覆盖，替换上新的内容
appendChild就显得相对温柔，只会在标签内容的最后面加上内容，并不会覆盖原本的内容


innerHTML和innerText的区别：

<div id="box">hello <span>world!</span></div>
document.getElementById('box').innnerHTML = hello <span>world!</span>
document.getElementById('box').innerText = hello world!
看出innerHTML有多粗放了吧。。。