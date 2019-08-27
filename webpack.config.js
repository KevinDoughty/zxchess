var webpack = require("webpack");
var path = require("path");

// var modulesPlugins = [
// 	new webpack.LoaderOptionsPlugin({ minimize: true }),
// 	new webpack.optimize.UglifyJsPlugin({
// 		compress: false,
// 		mangle: false,
// 		beautify: true,
// 		comments: true,
// 		sourceMap: true
// 	})
// ];
// if (process.env.WEBPACK_ENV === "build") modulesPlugins = [
// 	new webpack.LoaderOptionsPlugin({ minimize: true }),
// 	new webpack.optimize.UglifyJsPlugin({
// 		compress: true,
// 		mangle: true,
// 		beautify: false,
// 		comments: false,
// 		sourceMap: false
// 	})
// ];
var plugins = [
	new webpack.LoaderOptionsPlugin({ minimize: true }),
];

module.exports = [
	{
		entry: "./source/index.js",
		output: {
			path: __dirname + "/dist/",
			filename: "zxchess.js",
			library: "ZXChess",
			libraryTarget: "umd"
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: "babel-loader",
					exclude: /node_modules/,
					//options: { presets: [ ["es2015", { modules: false }] ] } // .babelrc is different for mocha, so this is specified there.

				}
			]
		},
		plugins: plugins
	},
	{
	entry: "./example/index.js",
	output: {
		path: __dirname + "/example/",
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				//options: { presets: [ ["es2015", { modules: false }] ] } // .babelrc is different for mocha, so this is specified there.

			}
		]
	},
	plugins: plugins
}
];
