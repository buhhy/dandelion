'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var combineLoaders = require("webpack-combine-loaders");

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
    root: srcPath, // Allows using absolute paths for Typescript module imports.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    // modulesDirectories: ['node_modules', tsxPath]
  },
  module: {
    // noParse: [],
    loaders: [
      {
        // Typescript loader
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }, {
        // Sass loader
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
            "style-loader",
            combineLoaders([
              {
                loader: "css-loader",
                query: {
                  camelCase: true,
                  modules: true,
                  sourceMap: true,
                  importLoaders: 1,
                  localIdentName: "[name]_[local]_[hash:base64:5]"
                }
              }, {
                loader: "postcss-loader"
              }, {
                loader: "sass-loader",
                includePaths: ["apps/assets"]
              }
            ]))
      }, {
        // Asset loader
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file'
      }, {
        // Image loader
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader:'file'
      }, {
        // Html loader
        test: /\.html$/,
        loader: 'html-loader'
      }
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
