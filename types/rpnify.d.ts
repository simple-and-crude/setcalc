/**
 * 逆波兰化模块
 * @version 1.10226.0
 * @license GPL-3.0-or-later
 * @link https://github.com/simple-and-crude/setcalc
 */
declare module './rpnify';
/**@see {@link Function.prototype.apply|`Function#apply`} */
export declare function apply<T extends any[], R>(k: any, fn: (...args: T) => R, n: T): R;
/**把 {@link b|`b`} 中的 {@link f|`f`} 都替换成 {@link t|`t`} */
export declare function rep(b: string, f: string, t: string): string;
/**批量替换 */
export declare function reps(b: string, f: string[], t: string[]): string;
/**把 {@link expr|`expr`} 中连续的空格都合并 */
export declare function ths(expr: string): string;
/**整理格式 */
export declare function fmt(expr: string): string;
/**逆波兰化 */
export declare function rpnify(expr: string): string;
export default rpnify;
