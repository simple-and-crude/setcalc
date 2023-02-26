/**@type {import('webpack').Configuration} */
const a = {
	entry: __dirname + '/types/exp.js',
	mode: 0 ? 'development' : 'production',
	output: {
		path: __dirname + '/types',
		filename: 'packed.js'
	},

};
module.exports = a;