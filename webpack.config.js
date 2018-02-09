let path = require('path');
let webpack = require('webpack');
module.exports = {
	entry: {
		entry: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname,'dist'),
		filename:'bundle.js'
	},
	module: {
		rules: [{
			test: require.resolve('jquery'),
			loader: 'expose-loader?jQuery!expose-loader?$!expose-loader?scrollable'
		},{
			test: require.resolve("popper.js"),
			loader: "expose-loader?Popper"
		},{
			test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
			loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
		}, {
			test:/\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		},{
			test:/\.less$/,
			use:[{
				loader: "style-loader" // creates style nodes from JS strings
			}, {
				loader: "css-loader" // translates CSS into CommonJS
			}, {
				loader: "less-loader" // compiles Less to CSS}
			}]
		}]
	},
	plugins: [
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	jQuery: 'jquery',
		// 	'window.jQuery': 'jquery',
		// 	Popper: ['popper.js', 'default']
		// })
	],
	devServer: {
		contentBase:path.resolve(__dirname,'dist'),
		host:'localhost',
		compress:true,
		port:8080
	}
};