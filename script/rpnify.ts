/**
 * 逆波兰化模块
 * @version 1.10226.0
 * @license GPL-3.0-or-later
 * @link https://github.com/simple-and-crude/setcalc
 */
declare module './rpnify';

/**@see {@link Function.prototype.apply|`Function#apply`} */
export function apply<T extends any[], R>(k: any, fn: (...args: T) => R, n: T): R {
	switch (n.length) {
		case 0: return (fn as Function).call(k);
		case 1: return (fn as Function).call(k, n[0]);
		case 2: return (fn as Function).call(k, n[0], n[1]);
		case 3: return (fn as Function).call(k, n[0], n[1], n[2]);
		default: return fn.apply(k, n);
	}
}
/**把 {@link b|`b`} 中的 {@link f|`f`} 都替换成 {@link t|`t`} */
export function rep(b: string, f: string, t: string) {
	return b.indexOf(f) !== -1 ? b.split(f).join(t) : b;
}
/**批量替换 */
export function reps(b: string, f: string[], t: string[]): string {
	if (f.length) return reps(rep(b, f.pop()!, t.pop()!), f, t);
	else return b;
}
/**把 {@link expr|`expr`} 中连续的空格都合并 */
export function ths(expr: string): string {
	if (expr.indexOf('   ') === -1) return rep(expr, '  ', ' ');
	else return ths(rep(expr, '  ', ' '));
}
/**整理格式 */
export function fmt(expr: string) {
	return ths(' ' + (
		reps(expr, [
			')', '(',
			' )', '( ',
			'\n', '\r', '\t', '\b',
			'~',
		], [
			') ', ' (',
			')', '(',
			' ', ' ', ' ', ' ',
			' ~ ',
		])
	) + ' ');
}
/**
 * 以空格为分割符拆分表达式
 *
 * 若有括号，则以数组形式存储 {@link ori|逆波兰} 后的括号中的各元素
 */
function spl(expr: string) {
	const a: (string | string[])[] = [];
	let f = expr.length;
	let l = 0;
	for (let i = f - 1; i >= 0; --i) l
		? expr[i] === '('
			? --l || (a.push(ori(expr.slice(i-- + 1, f + 1))), f = i)
			: expr[i] === ')' && l++
		: expr[i] === ')'
			? (f = i - 1, l++)
			: expr[i] === ' ' && (a.push(expr.slice(i + 1, f)), f = i);
	return a.reverse();
}
/**得到 {@link expr|`expr`} 解析后的逆波兰元素数组 */
function ori(expr: string): string[] {
	const a = spl(fmt(expr));
	a.pop();
	const r = typeof a[0] === 'string' ? ['C_' + a[0]] : a[0];
	for (let i = 1; i < a.length; i += 2)
		(typeof a[i + 1] === 'string'
			? r.push('C_' + a[i + 1])
			: apply(r, r.push, a[i + 1] as string[])
		), r.push('O_' + a[i]);
	return r;
}
/**逆波兰化 */
export function rpnify(expr: string) {
	return ori(expr).join(' ');
}
export default rpnify;
