var webpack = require("webpack");
var path = require("path");

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
