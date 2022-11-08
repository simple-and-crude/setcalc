window.rpnify = (function () {
	/**@type {(b:string,f:string,t:string)=>string} */
	function rep(b, f, t) {
		return b.split(f).join(t);
	}
	/**@type {(expr:string)=>string} */
	function ths(expr) {
		return expr.indexOf('   ') === -1 ? rep(expr, '  ', ' ') : ths(rep(expr, '  ', ' '));
	}
	/**@type {(expr:string)=>string} */
	function fmt(expr) {
		return ths(rep(rep(rep(rep(ths(rep(expr, '\n', ' ')), ' )', ')'), '( ', '('), ')', ') '), '(', ' ('));
	}
	/**@type {(expr:string)=>string[]} */
	function spl(expr) {
		for (var f = expr.length, i = f - 1, l = 0, a = []; i >= 0; --i) l
			? expr[i].indexOf('(')
				? expr[i].indexOf(')') || l++
				: --l || (a.push(ori(expr.slice(i-- + 1, f + 1))), f = i)
			: expr[i].indexOf(')')
				? expr[i].indexOf(' ') || (a.push(expr.slice(i + 1, f)), f = i)
				: (f = i - 1, l++);
		return a.reverse();
	}
	/**@type {(expr:string)=>string[]} */
	function ori(expr) {
		var a = spl(ths(fmt(' ' + expr.split('~').join(' ~ ') + ' ')));
		a.pop();
		var r = typeof a[0] === 'string' ? ['C_' + a[0]] : a[0];
		for (var i = 1; i < a.length; i += 2) (typeof a[i + 1] === 'string'
			? r.push('C_' + a[i + 1])
			: r = r.concat(a[i + 1])
		), r.push('O_' + a[i]);
		return r;
	}
	/**@type {(expr:string)=>string} */
	function rpnify(expr) {
		return expr = ori(expr).join(' ');
	}
	rpnify.rep = rep;
	rpnify.ths = ths;
	rpnify.fmt = fmt;
	return rpnify;
})();