const { snake, exec, cmt, dels, cps, outFS, log, goodReg, comp } = require('lethal-build')(__dirname);

snake(
	exec('tsc'),
	cps([['lib/exp.js', 'types/exp.js']]),
	exec('npx webpack'),
	outFS([
		[1, cmt('lib/index.ts')],
		[1, '!function(exp){'],
		[0, 'types/packed.js'],
		[1, '}(typeof module==="undefined"?false:module)']
	], 'index.js'),
	dels(RegExp(`${goodReg(comp('types'))}[\\/\\\\].*js$`)),
	log('OK.')
);
