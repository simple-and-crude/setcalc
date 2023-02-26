/**@type {(f:(a:any,b:any)=>any)=>(a:string,b:string)=>string} */
function jsonPack(f) {
	return function (a, b) {
		return JSON.stringify(f(JSON.parse(a), b !== '~' ? JSON.parse(b) : b));
	}
}
/**@type {<T,L extends number>(n:T,c:L)=>T[]&{length:L}} */
function copyObjs(n, c) {
	var r = [];
	for (var i = c - 1; i >= 0; --i) r.push(copyObj(n));
	return r;
}
/**@type {<T>(n:T)=>T} */
function copyObj(n) {
	if (typeof n !== 'object') return n;
	var r = Array.isArray(n) ? [] : {};
	for (var i in n)
		r[i] = typeof n[i] === 'object' ? copyObj(n[i]) : n[i];
	return r;
}
var map = cookie.map;
function weedArr(o, w) {
	for (var i = 0, r = []; i < o.length; ++i) o[i] === w || r.push(o[i]);
	return r;
}

function EasyMCQ() { }
EasyMCQ.prototype = {
	/**@type {(n:number[],v?:string)=>EasyMCQ} */
	same: function (n, v) {
		for (var t = this, i = n.length - 1; i >= 0; --i) v
			? typeof this[n[i]] === 'undefined'
				? this[n[i]] = v
				: this[n[i]] !== v && (t = new EasyMCQ(), i = -1)
			: (v = this[n[i]]);
		return t;
	}
};
/**@type {(n:EasyMCQ)=>string} */
EasyMCQ.encode = function (n) {
	var str = '';
	for (var i in n) i && (str += i + ':' + n[i] + ',');
	return str.slice(0, -1);
};
/**@type {(n:string)=>EasyMCQ} */
EasyMCQ.decode = function (n) {
	var a = n.split(','), r = new EasyMCQ();
	for (var i = a.length - 1; i >= 0; --i) {
		var v = a[i].indexOf(':'), o = a[i].slice(0, v), v = a[i].slice(v + 1);
		r[o] = v;
	}
	return r;
};
/**@type {(m:number,f:(e:EasyMCQ,i:number,r:EasyMCQ[])=>EasyMCQ)=>(n:string)=>string} */
EasyMCQ.f = function (m, f) {
	return function (n) {
		return cmplxRtn(map(copyObjs(EasyMCQ.decode(n), m), function (e, i, r) {
			return EasyMCQ.encode(f(e, i, r));
		}));
	}
};

/**@type {(n:string,i:number)=>string[]} */
var limb = (function () {
	var mem = {};
	return function (n, i) {
		return (mem[n] || (mem[n] = n.split('')))[i];
	};
})();