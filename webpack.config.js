/**@type {import('webpack').Configuration} */
const a = {
	entry: __dirname + '/build/exp.js',
	mode: 'development',
	output: {
		path: __dirname + '/build',
		filename: 'packed.js'
	},

};
module.exports = a;