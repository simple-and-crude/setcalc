/**
 * 实用工具模块
 * @version 1.10226.0
 * @license GPL-3.0-or-later
 * @link https://github.com/simple-and-crude/setcalc
 */
declare module './tool';

import { isArrlike } from './calc';

const { stringify, parse } = JSON;
/**你尽管写运算函数，它已经给你把 JSON 的编码解码打包好了 */
export function jsonPack(fn: (a: any, b?: any) => any) {
	return (a: string, b?: string) => stringify(b && b !== '~' ? fn(parse(a), parse(b)) : fn(parse(a)));
}
/**得到一个长 {@link len|`len`} 的充满 {@link n|`n`} 的拷贝的数组 */
export function copyObjs<T, L extends number>(n: T, len: L) {
	const r: T[] = [];
	for (let i = len - 1; i >= 0; --i) r.push(copyObj(n));
	return r;
}
/**拷贝对象 */
export function copyObj<T>(n: T) {
	if (typeof n !== 'object') return n;
	if (isArrlike(n)) {
		const r = [];
		for (let i = 0; i < n.length; i++) r.push(n[i]);
		return r as T;
	} else {
		const r: any = {};
		for (const i in n) r[i] = typeof n[i] === 'object' ? copyObj(n[i]) : n[i];
		return r as T;
	}
}
/**删掉 {@link arr|`arr`} 里 `===` 于 {@link n|`n`} 的元素 */
export function weedArr<T, N extends T>(arr: readonly T[], n: N) {
	const r = [];
	for (let i = 0; i < arr.length; ++i) arr[i] === n || r.push(arr[i]);
	return r as Exclude<T, N>[];
}

// function EasyMCQ() { }
// EasyMCQ.prototype = {
// 	/**@type {(n:number[],v?:string)=>EasyMCQ} */
// 	same: function (n, v) {
// 		for (var t = this, i = n.length - 1; i >= 0; --i) v
// 			? typeof this[n[i]] === 'undefined'
// 				? this[n[i]] = v
// 				: this[n[i]] !== v && (t = new EasyMCQ(), i = -1)
// 			: (v = this[n[i]]);
// 		return t;
// 	}
// };
// /**@type {(n:EasyMCQ)=>string} */
// EasyMCQ.encode = function (n) {
// 	var str = '';
// 	for (var i in n) i && (str += i + ':' + n[i] + ',');
// 	return str.slice(0, -1);
// };
// /**@type {(n:string)=>EasyMCQ} */
// EasyMCQ.decode = function (n) {
// 	var a = n.split(','), r = new EasyMCQ();
// 	for (var i = a.length - 1; i >= 0; --i) {
// 		var v = a[i].indexOf(':'), o = a[i].slice(0, v), v = a[i].slice(v + 1);
// 		r[o] = v;
// 	}
// 	return r;
// };
// /**@type {(m:number,f:(e:EasyMCQ,i:number,r:EasyMCQ[])=>EasyMCQ)=>(n:string)=>string} */
// EasyMCQ.f = function (m, f) {
// 	return function (n) {
// 		return cmplxRtn(map(copyObjs(EasyMCQ.decode(n), m), function (e, i, r) {
// 			return EasyMCQ.encode(f(e, i, r));
// 		}));
// 	};
// };

const mem: { [n: string]: string[]; } = {};
/**@see {@link String.prototype.at|`String#at`} */
function limb(n: string, i: number) {
	return (mem[n] || (mem[n] = n.split('')))[i];
}
