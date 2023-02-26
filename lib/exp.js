var imp = require('.');
if (exp === false) {
	window.calc = imp;
	window.rpnify = imp.rpnify;
	for (var i in imp.tool) window[i] = imp.tool[i];
} else exp.exports = imp;
