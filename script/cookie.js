window.cookie = (function () {
	/**@type {(n:string[][],s:string)=>string[]} */
	function hat(n, s) {
		var r = [''];
		for (var i = n.length - 1; i >= 0; --i) {
			r[0] = n[i].pop() + s + r[0];
			r = n[i].concat(r);
		}
		r[r.length - 1] = r[r.length - 1].slice(0, -1);
		return r;
	}
	/**@type {<A,B>(a:A[],f:(n:A)=>B)=>B[]} */
	function map(a, f) {
		var r = [];
		for (var i = 0; i < a.length; i++) r.push(f(a[i], i, a));
		return r;
	}
	/**@type {(n:string[])=>string} */
	function enc(n) {
		return map(n, function (n) {
			return n.split('!').join('!!').split('-').join('!-');
		}).join('-');
	}
	/**@type {(n:string)=>string[]} */
	function dec(n) {
		return n ? hat(map(n.split('!!'), function (n) {
			return hat(map(n.split('!-'), function (n) {
				return n.split('-');
			}), '-');
		}), '!') : [];
	}
	var TAIL = ';SameSite=Lax;Max-age=' + 60 * 60 * 24 * 365 * 50;
	return {
		en: function (n) {
			var o = [], v = [];
			for (var i in calc.operaSet) o.push(enc([i, calc.operaTxt[i]]));
			for (var i in calc.valueSet) v.push(enc([i, calc.valueSet[i].join(' ')]));
			return ['o=' + encodeURIComponent(enc(o)) + (n ? '' : TAIL), 'v=' + encodeURIComponent(enc(v)) + (n ? '' : TAIL)];
		},
		de: function (n) {
			var a = n.split(';'), r = {}, t;
			for (var i = a.length - 1; i >= 0; --i) t = a[i].indexOf('='), r[a[i].slice(0, t).split(' ').join('')] = a[i].slice(t + 1);
			map(dec(decodeURIComponent(r['o'] || '')), function (n) { n = dec(n), calc.setOpera(n[0], n[1]); });
			map(dec(decodeURIComponent(r['v'] || '')), function (n) { n = dec(n), calc.valueTxt[n[0]] = n[1]; });
			for (var i in calc.valueTxt) calc.valueSet[i] = calc.valueTxt[i].split(' ');
			calc.width = parseInt(r['w']);
		},
		hat: hat,
		map: map,
		dec: dec,
		enc: enc
	};
})();