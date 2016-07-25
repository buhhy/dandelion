'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpack = require('webpack');
var tsxPath  = 'app/assets';
var jsPath = 'target/web/public/main';
var path = require('path');
var srcPath = path.join(__dirname, tsxPath);
var outputPath = path.join(__dirname, jsPath);

module.exports = {
  entry: {
    app: path.join(srcPath, 'index.tsx')
  },
  output: {
    path: path.resolve(outputPath),
    publicPath: 'assets/',
    filename: '[name].js',
    pathInfo: true
  },
  devtool: 'source-map',
  resolve: {
    // alias: {},
    // root: srcPath,
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    // modulesDirectories: ['node_modules', tsxPath]
  },
  module: {
    // noParse: [],
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
            "style-loader",
            [
              "css-loader?modules&importLoaders=1&" +
                  "localIdentName=[name]_[local]_[hash:base64:5]",
              "postcss-loader",
              "sass-loader"
            ])
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'babel'
      // },
      // {
      //   test: /\.scss$/,
      //   include: /\/app\/assets/,
      //   loader: 'style!css!sass'
      // }
    ],
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ],
    postcss: function () {
      return [ require('autoprefixer'), require('precss') ];
    }
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
    //new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   output: { comments: false }
    // }),
    // new webpack.NoErrorsPlugin()
  ]
};
