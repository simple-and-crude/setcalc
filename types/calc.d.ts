/**
 * 并列计算模块
 * @version 1.1107.1
 * @license GPL-3.0-or-later
 * @link https://github.com/simple-and-crude/setcalc
 */
declare module './calc';
/**运算 */
export type CalcFn = (a: string, b?: string) => string;
/**列宽 */
export declare let width: number;
/**运算表 */
export declare const operaSet: {
    [fn: string]: CalcFn;
};
/**运算源代码表 */
export declare const operaTxt: {
    [fn: string]: string;
};
/**创建运算使用的脚本元素 */
export declare const nodeList: HTMLScriptElement[];
/**设置运算 */
export declare function setOpera(o: string, f: string | CalcFn): void;
/**变量表 */
export declare const valueSet: {
    [p: string]: string[];
};
/**变量源文本表 */
export declare const valueTxt: {
    [p: string]: string;
};
/**设置变量 */
export declare function setValue(o: string, c: string): void;
/**并列计算 */
export declare function doCalc(expr: string): string[];
export default doCalc;
/**产生多个计算分支 */
export declare function cmplxRtn<T extends string>(params: readonly T[]): T;
export declare function cmplxRtn<T extends string>(...params: T[]): T;
