/**
 * 并列计算模块
 * @version 1.1107.1
 * @license GPL-3.0-or-later
 * @link https://github.com/simple-and-crude/setcalc
 */
declare module './calc';

import rpnify, { ths, rep, apply, reps } from './rpnify';

/**运算 */
export type CalcFn = (a: string, b?: string) => string;
/**列宽 */
export let width = 1;
/**运算表 */
export const operaSet: { [fn: string]: CalcFn; } = {};
/**运算源代码表 */
export const operaTxt: { [fn: string]: string; } = {};
/**创建运算使用的脚本元素 */
export const nodeList: HTMLScriptElement[] = [];
/**设置运算 */
export function setOpera(o: string, f: string | CalcFn) {
	if (typeof f === 'string') {
		const node = document.createElement('script');
		node.innerHTML = `
			calc.setOpera("${rep(o, '"', '\\"')}", ${f});
			document.head.removeChild(calc.nodeList[${nodeList.push(node) - 1}]);
		`;
		document.head.appendChild(node);
		operaTxt[o] = f;
	} else operaSet[o] = f;
};
/**变量表 */
export const valueSet: { [p: string]: string[]; } = {};
/**变量源文本表 */
export const valueTxt: { [p: string]: string; } = {};
/**设置变量 */
export function setValue(o: string, c: string) {
	valueTxt[o] = c;
	valueSet[o] = ths(` ${reps(c, ['\n', '\r', '\t', '\b'], [' ', ' ', ' ', ' '])} `).slice(1, -1).split(' ');
};
/**表达式访问的所有变量名 */
let usedVal: string[];
/**判断表达式是否合法，并把表达式访问的所有变量名放到 {@link usedVal|`usedVal`} 里 */
function analyse(n: string[]) {
	let stack = 0;
	let flag: { [sign: string]: true; } = {};
	usedVal = [];
	for (let j = 0; j < n.length; ++j) {
		let sign = n[j].slice(2);
		if (n[j][0] === 'C') {
			if (sign !== '~' && typeof valueSet[sign] === 'undefined') return `变量 "${sign}" 未定义`;
			++stack;
			sign === '~' || flag[sign] || (flag[sign] = true, usedVal.push(sign));
		} else {
			if (typeof operaSet[sign] === 'undefined') return `运算 "${sign}" 未定义`;
			if (typeof operaSet[sign] !== 'function') return `运算 "${sign}" 不是一个函数`;
			if ((stack -= 2) < 0) return `运算 "${sign}" 缺少操作数`;
			++stack;
		}
	}
	if (stack !== 1) return `共缺少 ${stack} 处运算`;
	return '';
}
/**列标记 */
let col: number;
/**行标记 */
let row: number;
/**运算栈 */
const vStack: string[][] = [];
/**并列计算 */
export function doCalc(expr: string) {
	if (!expr) return [];
	const parsedExpr = rpnify(expr).split(' ');
	const rslt: string[] = [];
	const oriWidth = width;
	let sign: string;
	if (sign = analyse(parsedExpr)) return [`<span class="redSp">解析错误!</span> ${sign}`];
	for (col = width - 1; col >= 0; --col) vStack[col] = [];
	for (row = 0; row < parsedExpr.length; ++row) {
		sign = parsedExpr[row].slice(2);
		for (col = 0; col < width; ++col) {
			if (parsedExpr[row][0] === 'C') vStack[col].push(sign === '~' ? sign : valueSet[sign][col]);
			else {
				let p1 = vStack[col].pop() as string;
				let p0 = vStack[col].pop() as string;
				vStack[col].push(operaSet[sign](p0 === '~' ? p1 : p0, p1));
			}
		}
	}
	for (col = width - 1; col >= 0; --col) rslt.push(vStack[col][0]);
	while (sign = usedVal.pop() as string) setValue(sign, valueTxt[sign]);
	width = oriWidth;
	return rslt;
}
export default doCalc;
/**空数组 */
const VARR: any[] = [];
/**以 {@link x|`x`} 填充一个长度为 {@link n|`n`} 的数组 */
function filledArr<N extends any[], T>(x: T, n: number, pre: readonly [...N]) {
	let y = [x];
	const z = n % 2 ? (n--, [pre, y]) : [pre];
	while (n > 0) n /= 2, y = y.concat(y), n % 2 && (z.push(y), n--);
	return apply([], VARR.concat, z) as [...N, ...T[]];
}
/**产生多个计算分支 */
export function cmplxRtn<T extends string>(params: readonly T[]): T;
export function cmplxRtn<T extends string>(...params: T[]): T;
export function cmplxRtn(param: readonly any[]) {
	const rtns = arguments.length > 1 ? arguments : param;
	const len = rtns.length - 1;
	const k: [number, number, ...string[][]] = [col, 0];
	let stackMine: string[];
	for (let i = 0; i < len; ++i) stackMine = vStack[col].slice(), stackMine.push(rtns[i]), k.push(stackMine);
	for (let j = usedVal.length - 1; j >= 0; --j) apply(valueSet[usedVal[j]], VARR.splice, filledArr(valueSet[usedVal[j]][col], len, [col, 0]));
	apply(vStack, VARR.splice, k);
	width += len;
	col += len;
	return rtns[len];
};
