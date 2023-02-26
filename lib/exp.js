var imp = require('.');
if (exp === false) {
	var mod = [
		'calc',
		'rpnify',
	];
	for (var i = mod.length; i >= 0; --i) window[mod[i]] = imp[mod[i]];
	for (var i in imp.tool) window[i] = imp.tool[i];
	window.setcalc = imp;
} else exp.exports = imp;
