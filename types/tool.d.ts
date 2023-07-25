/**
 * 实用工具模块
 * @version 1.10226.0
 * @license GPL-3.0-or-later
 * @link https://github.com/simple-and-crude/setcalc
 */
declare module './tool';
/**判断是否是 {@link ArrayLike|`ArrayLike`} */
export declare function isArrlike(n: any): n is ArrayLike<any>;
/**你尽管写运算函数，它已经给你把 JSON 的编码解码打包好了 */
export declare function jsonPack(fn: (a: any, b?: any) => any): (a: string, b?: string) => string;
/**得到一个长 {@link len|`len`} 的充满 {@link n|`n`} 的拷贝的数组 */
export declare function copyObjs<T, L extends number>(n: T, len: L): T[];
/**拷贝对象 */
export declare function copyObj<T>(n: T): T;
/**删掉 {@link arr|`arr`} 里 `===` 于 {@link n|`n`} 的元素 */
export declare function weedArr<T, N extends T>(arr: readonly T[], n: N): Exclude<T, N>[];
