/**
 * |简·陋| 并列计算器
 * @version 1.1107.1
 * @license GPL-3.0-or-later
 * @link https://github.com/simple-and-crude/setcalc
 */
declare module '.';

import * as rpnify from './rpnify';
import * as tool from './tool';
import def from './calc';
export * from './calc';
export {
	rpnify,
	tool,
	def as default,
};
