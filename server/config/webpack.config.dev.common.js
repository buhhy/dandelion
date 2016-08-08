var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var combineLoaders = require("webpack-combine-loaders");
var paths = require('./paths');

var fast = false;

var nodeModules = {};
fs.readdirSync(paths.ownNodeModules)
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = function (which) {
    return {
      entry: [
        // 'babel-polyfill',
        require.resolve('./polyfills'),
        path.join(__dirname, '../' + which)
      ],
      target: 'node',
      devtool: !fast ? 'source-map' : '#eval-source-map',
      output: {
        // Next line is not used in dev but WebpackDevServer crashes without it:
        path: paths.appBuild,
        pathinfo: true,
        filename: which + '.js',
        publicPath: '/'
      },
      resolve: {
        extensions: ['', '.js', '.ts', '.tsx', '.json'],
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
            path.join(__dirname, '..'),
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
            exclude: /node_modules/,
            loader: 'eslint'
          }
        ],
        loaders: [
          {
            // Typescript loader
            test: /\.tsx?$/,
            loader: 'ts'
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: require('./babel.dev')
          },
          {
            test: /\.json$/,
            loader: 'json'
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
      externals: nodeModules,
      plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.BannerPlugin('require("source-map-support").install();', {
          raw: true,
          entryOnly: false
        })
      ],
      watchOptions: {
        poll: 1000
      }
    };
};
