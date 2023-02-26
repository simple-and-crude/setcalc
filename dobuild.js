const { snake, exec, dels, cps, outFS, log } = require('lethal-build')(__dirname);

snake(
	exec('tsc'),
	cps([['lib/exp.js', 'build/exp.js']]),
	exec('webpack'),
	outFS([
		[1, '!function(exp){'],
		[0, 'build/packed.js'],
		[1, '}(typeof module==="undefined"?false:module)']
	], 'build/index.js'),
	dels([
		'build/calc.js',
		'build/tool.js',
		'build/rpnify.js',
		'build/exp.js',
		'build/packed.js',
	]),
	log('OK.')
);
