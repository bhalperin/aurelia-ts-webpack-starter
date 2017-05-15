const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { AureliaPlugin, ModuleDependenciesPlugin } = require("aurelia-webpack-plugin");
const optimize = webpack.optimize;

module.exports = {
	entry: {
		main: "./src/main.ts",
		vendor: [ "aurelia-bootstrapper" ]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		chunkFilename: "[name].[chunkhash].js"
	},
	resolve: {
		extensions: [".ts", ".js"],
		modules: ["src", "node_modules"].map(x => path.resolve(x))
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				enforce: "pre",
				test: /.ts$/,
				use: "source-map-loader"
			},
			{
				test: /\.less$/i,
				use: [{
					loader: "css-loader",
					options: {
						sourceMap: true
					}
				},
				{
					loader: "less-loader",
					options: {
						sourceMap: true
					}
				}]
			},
			{
				test: /\.ts$/i,
				use: "awesome-typescript-loader"
			},
			{
				test: /\.html$/i,
				use: "html-loader"
			}
		]
	},
	plugins: [
		new optimize.CommonsChunkPlugin({
			names: [ "vendor", "manifest" ]
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		}),
    	new AureliaPlugin()
	],
	devServer: {
		port: 3333
	}
};