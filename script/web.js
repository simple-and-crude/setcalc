/// <reference path="../global.d.ts" />
(function () {
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?6fe5d31c4f1a083a69e4a99cbed79158";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})();
onload = function () {
	var moveFn = [], upFn = [], o = document.getElementsByName('BMove'), p = [], l = [];
	function runFn(list, x, y) { for (var i = list.length - 1; i >= 0; --i) list[i](x, y); }
	onmousemove = function (event) { runFn(moveFn, event.clientX, event.clientY); };
	addEventListener('touchmove', function (event) { runFn(moveFn, (event = event.changedTouches[0]).pageX, event.pageY); })
	onmouseup = function (event) { runFn(upFn, event.clientX, event.clientY); };
	addEventListener('touchend', function (event) { runFn(upFn, (event = event.changedTouches[0]).pageX, event.pageY); });
	// onresize = function (event) {
	// 	for (var i = o.length - 1; i >= 0; --i) o[i].style.width = 'auto', o[i].style.height = '0.3cm', o[i].style.left = '0', o[i].style.top = '';
	// };
	for (var i = o.length - 1; i >= 0; --i) l.push(o[i]);
	for (var i = l.length - 1; i >= 0; --i) p.push(l[i].parentNode), (function (n, i, d) {
		var nmoving = true, clickX;
		function start(x) { nmoving = false, clickX = n.parentNode.clientWidth - x, n.style.background = 'rgba(0,0,0,0.4)'; }
		l[i].onmousedown = function (event) { start(event.clientX); };
		l[i].addEventListener('touchstart', function (event) { start(event.changedTouches[0].pageX); });
		moveFn.push(function (x) {
			if (nmoving) return;
			var k = x + clickX, t = 0;
			n.parentNode.style.width = k + 'px', n.parentNode.style.width = 2 * k - n.parentNode.clientWidth + 'px';
			for (var j = p.length - 1; j >= d; --j) t += p[j].clientWidth;
			for (var j = d - 1; j >= 1; --j) p[j].style.left = t + 'px', p[j].style.maxWidth = innerWidth - t + 'px', t += p[j].clientWidth;
			p[0].style.left = t + 'px';
		});
		upFn.push(function () { nmoving = true, n.style.background = ''; });
	})(l[i], i, l.length - 1 - i);
	cookie.de(document.cookie);
	for (var name in calc.operaSet) newNode('Ope', name);
	for (var name in calc.valueSet) newNode('Val', name);
	IValBar.getElementsByTagName('input')[0].value = calc.width;
	wcWidth(1);
};
function newNode(w, name) {
	var node = document.createElement('div');
	node.className = "IBlkOut";
	node.id = "IFun_" + w + "_" + name;
	node.innerHTML = '<!-- div class="IBlkSdw"></div -->'
		+ '<div class="IBlk" onclick="goReg(\'' + w + '\',this)">'
		+ name + '</div>';
	var firn = document.getElementById('IAdd' + w);
	firn.parentNode.insertBefore(node, firn);
}
/**@type {(w:'Ope'|'Val',n?:HTMLDivElement)=>void} */
function goReg(w, n) {
	if (n) {
		n.parentNode.parentNode.removeChild(n.parentNode);
		n = n.innerHTML;
		IFunName.value = n;
		IFunCode.value = calc[w === 'Ope' ? 'operaTxt' : 'valueTxt'][n];
	} else {
		IFunName.value = IFunCode.value = '';
	}
	IFunHov.style.display = 'block';
	IFunTip.innerHTML = w === 'Ope' ? '运算' : '变量';
	IFunTip.w = w;
	IFunTip.ori = n;
	w === 'Ope' ? (
		IFunTip.set = calc.operaSet,
		IFunTip.bar = IOpeBar
	) : (
		IFunTip.set = calc.valueTxt,
		IFunTip.bar = IValBar
	);
}
/**@type {(name:string)=>void} */
function regFun_cn(name) {
	if (name && typeof IFunTip.set[name] !== "undefined"
		&& !document.getElementById('IFun_' + IFunTip.w + '_' + name)
	) newNode(IFunTip.w, name);
}
function regFunCanc() {
	regFun_cn(IFunTip.ori);
	IFunHov.style.display = 'none';
}
function regFunSure() {
	var name = IFunName.value,
		code = IFunCode.value;
	if (IFunTip.w === 'Ope') {
		delete calc.operaSet[IFunTip.ori];
		delete calc.operaTxt[IFunTip.ori];
	} else {
		delete calc.valueSet[IFunTip.ori];
		delete calc.valueTxt[IFunTip.ori];
	}
	name && calc[IFunTip.w === 'Ope' ? 'setOpera' : 'setValue'](name, code);
	regFun_cn(name);
	var t = cookie.en();
	document.cookie = t[0];
	document.cookie = t[1];
	IFunHov.style.display = 'none';
}
function wcWidth(n) {
	document.cookie = 'w=' + (IValWidth.value = calc.width = parseInt(n)) + ';SameSite=Lax';
}
function doCalc() {
	var l = IExpr.value.split('\n'), r = '';
	for (var i = 0; i < l.length; i++) r += calc.default(l[i]).join(' ') + '\n';
	IExprRslt.innerHTML = r;
	wcWidth(calc.width);
}
function reset() {
	cookie.de('w=4;o=%2B!-(a%2Cb)%3D%3EparseFloat(a)%2BparseFloat(b)-*!-(a%2Cb)%3D%3EparseFloat(a)*parseFloat(b)-!!!-!'
		+ '-(a%2Cb)%3D%3EparseFloat(a)!!!-parseFloat(b)-%2F!-(a%2Cb)%3D%3EparseFloat(a)%2FparseFloat(b)-or!-(a%2Cb)%3D'
		+ '%3EparseInt(a)%7C%7CparseInt(b)-and!-(a%2Cb)%3D%3EparseInt(a)%26%26parseInt(b)-not!-(a)%3D%3E!!!!parseInt(a'
		+ ')!!!-1%2B1-xor!-(a%2Cb)%3D%3E!!!!(parseInt(a)!!!-parseInt(b))!!!-1%2B1; v=A!-1%201%200%200-B!-1%200%201%200'
	);
	var t = cookie.en();
	document.cookie = t[0];
	document.cookie = t[1];
	document.cookie = 'w=4;SameSite=Lax';
	location.href = location.href;
}
function goOut(n) {
	IOutHov.style.display = 'block';
	if (n) {
		IOutCode.value = cookie.en(true).join(';');
		IOutBtn1.style.display = 'block';
		IOutBtn2.style.display = 'none';
		IOutTip.innerText = '出';
		IOutOpe.innerText = '复制下方';
	} else {
		IOutCode.value = '';
		IOutBtn1.style.display = 'none';
		IOutBtn2.style.display = 'block';
		IOutTip.innerText = '入';
		IOutOpe.innerText = '粘贴';
	}
}
function outSure() {
	cookie.de(IOutCode.value);
	var t = cookie.en();
	document.cookie = t[0];
	document.cookie = t[1];
	document.cookie = 'w=4;SameSite=Lax';
	location.href = location.href;
}
function outCanc() {
	IOutHov.style.display = 'none';
}
/**@type {(any:any)=>any is ArrayLike} */
var isArrlike = calc.isArrlike;
function pushValue(n, l) {
	if (!l) { for (var i in n) { if (isArrlike(n[i])) l = n[i].length; else l = 1; break; } }
	for (var i in n) isArrlike(n[i])
		? calc.valueSet[i].splice.apply(calc.valueSet[i], [calc.lining, 0].concat(n[i]))
		: calc.valueSet[i].splice(calc.lining, 0, n[i]);
	wcWidth(calc.width + l);
}
function clearOaV() {
	document.cookie = 'o=';
	document.cookie = 'v=';
	location.href = location.href;
}
var cmplxRtn = calc.cmplxRtn;