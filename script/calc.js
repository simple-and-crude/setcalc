window.calc = (function () {
	calc.width = 1;
	/**@type {{[fn:string]:(...p:any[])=>any}} */
	var operaSet = {};
	calc.operaSet = operaSet;
	var operaTxt = {};
	calc.operaTxt = operaTxt;
	var nodeList = [];
	calc.nodeList = nodeList;
	/**@type {(o:string,f:string|(...p:any[])=>any)=>void} */
	calc.setOpera = function (o, f) {
		if (typeof f === 'string') {
			var node = document.createElement('script');
			node.innerHTML = 'calc.setOpera("' + o.split('"').join('\\"') + '",' + f + ');'
				+ 'document.head.removeChild(calc.nodeList[' + (nodeList.push(node) - 1) + ']);';
			document.head.appendChild(node);
			operaTxt[o] = f;
		} else operaSet[o] = f;
	};
	/**@type {{[p:string]:any}} */
	var valueSet = {};
	calc.valueSet = valueSet;
	var valueTxt = {};
	calc.valueTxt = valueTxt;
	calc.setValue = function (o, c) {
		valueTxt[o] = c;
		valueSet[o] = rpnify.ths(' ' + rpnify.rep(c, '\n', ' ') + ' ').slice(1, -1).split(' ');
	};
	var usedVal;
	function analyse(n) {
		var sign, j, stack = 0, e, h = '<span class="redSp">解析错误!</span> ', f = {};
		usedVal = [];
		for (j = 0; j < n.length; ++j) n[j] && (n[j][0] === 'C'
			? (sign = n[j].slice(2)) !== '~' && typeof valueSet[sign] === 'undefined'
				? (e = h + '变量 "' + sign + '" 未定义', j = n.length)
				: (++stack, f[sign] || (f[sign] = true, usedVal.push(sign)))
			: typeof operaSet[sign = n[j].slice(2)] === 'undefined'
				? (e = h + '运算 "' + sign + '" 未定义', j = n.length)
				: typeof operaSet[sign] !== 'function'
					? (e = h + '运算 "' + sign + '" 不是一个函数', j = n.length)
					: (stack -= 2) < 0
						? (e = h + '运算 "' + sign + '" 缺少操作数', j = n.length)
						: ++stack
		);
		return e || stack === 1 ? e : h + '共缺少 ' + stack + ' 处运算';
	}
	var col, row, vStack = [];
	/**@type {(expr:string)=>any} */
	function calc(expr) {
		if (!expr) return [];
		var o = rpnify(expr).split(' '), e, r = [], w = calc.width, p1, p0, sign;;
		if (e = analyse(o)) return [e];
		for (col = calc.width - 1; col >= 0; --col) vStack[col] = [];
		for (row = 0; row < o.length; ++row) {
			sign = o[row].slice(2);
			if (o[row][0] === 'C') for (col = calc.width - 1; col >= 0; --col)
				vStack[col].push(sign === '~' ? sign : valueSet[sign][col]);
			else for (col = 0; col < calc.width; ++col) p1 = vStack[col].pop(),
				p0 = vStack[col].pop(), vStack[col].push(operaSet[sign](p0 === '~' ? p1 : p0, p1));
		}
		for (col = calc.width - 1; col >= 0; --col) r[col] = vStack[col][0];
		while (sign = usedVal.pop()) calc.setValue(sign, valueTxt[sign]);
		return calc.width = w, r;
	}
	/**@type {(any:any)=>any is ArrayLike} */
	function isArrlike(any) {
		return typeof any === 'object' && isFinite(any.length);
	}
	calc.isArrlike = isArrlike;
	var VARR = [];
	/**@type {<T,L extends number>(x:T,n:L)=>T[]&{length:L}} */
	function filledArr(x, n) {
		var y = [x], z = n % 2 ? (n--, [y]) : [];
		while (n > 0) n /= 2, y = y.concat(y), n % 2 && (z.push(y), n--);
		return VARR.concat.apply([], z);
	}
	/**@type {(rtns:any[])=>void} */
	calc.cmplxRtn = function (param) {
		var rtns = arguments.length > 1 ? arguments : param, l = rtns.length - 1;
		for (var i = 0, k = [col, 0]; i < l; ++i)
			k.push(vStack[col].concat([rtns[i]]));
		for (var j = usedVal.length - 1; j >= 0; --j)
			VARR.splice.apply(valueSet[usedVal[j]], [col, 0].concat(filledArr(valueSet[usedVal[j]][col], l)));
		return VARR.splice.apply(vStack, k), calc.width += l, col += l, rtns[l];
	};
	return calc;
})();