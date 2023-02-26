/**
 * |简·陋| 并列计算器
 * @version 1.10226.0
 * @license GPL-3.0-or-later
 * @link https://github.com/simple-and-crude/setcalc
 */
declare module '.';

import * as rpnify from './rpnify';
import * as calc from './calc';
import * as tool from './tool';
import def from './calc';
export {
	rpnify,
	calc,
	tool,
	def as default,
};
