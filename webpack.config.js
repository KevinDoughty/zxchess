var webpack = require("webpack");
var path = require("path");

var modulesPlugins = [
	new webpack.LoaderOptionsPlugin({ minimize: true }),
	new webpack.optimize.UglifyJsPlugin({
		compress: false,
		mangle: false,
		beautify: true,
		comments: true,
		sourceMap: true
	})
];
if (process.env.WEBPACK_ENV === "build") modulesPlugins = [
	new webpack.LoaderOptionsPlugin({ minimize: true }),
	new webpack.optimize.UglifyJsPlugin({
		compress: true,
		mangle: true,
		beautify: false,
		comments: false,
		sourceMap: false
	})
];
// module.exports = {
// 	entry: "./index.js",
// 	output: {
// 	path: __dirname,
// 		filename: "bundle.js"
// 	},
// 	module: {
// 		loaders: [
// 			{ test: /\.css$/, loader: "style!css" }
// 		]
// 	}
// };


module.exports = [
	{
		entry: "./source/index.js",
		output: {
			path: __dirname,
			filename: "zxchess.js",
			library: "ZXChess",
			libraryTarget: "umd"
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: "babel-loader",
					exclude: /node_modules/,
					query: {
						presets: [
							["es2015", { "modules": false }]
						]
					}
				}
			]
		},
		plugins: modulesPlugins
	}
];