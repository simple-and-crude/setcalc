const { snake, exec, cmt, dels, cps, outFS, log } = require('lethal-build')(__dirname);

snake(
	exec('tsc'),
	cps([['lib/exp.js', 'types/exp.js']]),
	exec('webpack'),
	outFS([
		[1, cmt('lib/index.ts')],
		[1, '!function(exp){'],
		[0, 'types/packed.js'],
		[1, '}(typeof module==="undefined"?false:module)']
	], 'index.js'),
	dels(/types[\/\\].*js$/),
	log('OK.')
);
