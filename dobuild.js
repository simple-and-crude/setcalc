const { snake, exec, dels, cps, outFS, log } = require('lethal-build')(__dirname);

snake(
	exec('tsc'),
	cps([['lib/exp.js', 'types/exp.js']]),
	exec('webpack'),
	outFS([
		[1, '!function(exp){'],
		[0, 'types/packed.js'],
		[1, '}(typeof module==="undefined"?false:module)']
	], 'index.js'),
	dels([
		'types/calc.js',
		'types/tool.js',
		'types/rpnify.js',
		'types/exp.js',
		'types/index.js',
		'types/packed.js',
	]),
	log('OK.')
);
