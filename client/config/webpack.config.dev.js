var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var combineLoaders = require("webpack-combine-loaders");
var paths = require('./paths');

module.exports = {
  devtool: 'eval',
  entry: [
    require.resolve('webpack-dev-server/client'),
    require.resolve('webpack/hot/dev-server'),
    // 'babel-polyfill',
    require.resolve('./polyfills'),
    path.join(paths.appSrc, 'index.tsx')
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx', '.json', '.scss'],
    alias: {
      // This `alias` section can be safely removed after ejection.
      // We do this because `babel-runtime` may be inside `react-scripts`,
      // so when `babel-plugin-transform-runtime` imports it, it will not be
      // available to the app directly. This is a temporary solution that lets
      // us ship support for generators. However it is far from ideal, and
      // if we don't have a good solution, we should just make `babel-runtime`
      // a dependency in generated projects.
      // See https://github.com/facebookincubator/create-react-app/issues/255
      'babel-runtime/regenerator': require.resolve('babel-runtime/regenerator')
    },
    root: [
      path.join(__dirname, '../src'),
      paths.ownNodeModules
    ]
  },
  resolveLoader: {
    root: paths.ownNodeModules,
    moduleTemplates: ['*-loader']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: paths.appSrc
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: combineLoaders([
          {
            loader: "typed-css-modules",
            includePaths: [paths.appSrc],
            exclude: /node_modules/
          }, {
            loader: "sass",
            includePaths: [paths.appSrc]
          }
        ])
      }
    ],
    loaders: [
      {
        // Typescript loader
        test: /\.tsx?$/,
        loader: combineLoaders([{
            loader: "babel",
            query: require('./babel.dev')
        }, {
            loader: "ts"
        }])
      },
      {
        test: /\.js$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'babel',
        query: require('./babel.dev')
      },
      {
        test: /\.scss$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: combineLoaders([
          {
            loader: 'style'
          }, {
            loader: "css",
            query: {
              camelCase: true,
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64:5]"
            }
          }, {
            loader: "typed-css-modules",
            includePaths: ["src"],
            exclude: /node_modules/
          }, {
            loader: "postcss"
          }, {
            loader: "sass",
            includePaths: ["src"]
          }
        ])
      },
      {
        test: /\.json$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'json'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'file'
      },
      {
        test: /\.(mp4|webm)$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'url?limit=10000'
      }
    ]
  },
  ts: {
    configFileName: path.join(__dirname, 'tsconfig.json')
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      favicon: paths.appFavicon
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    // Note: only CSS is currently hot reloaded
    new webpack.HotModuleReplacementPlugin()
  ],
  watchOptions: {
    poll: 1000
  }
};
