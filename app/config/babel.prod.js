module.exports = {
  babelrc: false,
  passPerPreset: true,  // got this from relay-starter-kit. reason?
  presets: [
    'babel-preset-es2015',
    'babel-preset-es2016',
    'babel-preset-stage-0',
    'babel-preset-react',
  ].map(require.resolve),
  plugins: [
    'babel-plugin-syntax-trailing-function-commas',
    'babel-plugin-transform-class-properties',
    'babel-plugin-transform-object-rest-spread',
    'babel-plugin-transform-react-constant-elements',
    './babelRelayPlugin'
  ].map(require.resolve).concat([
    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: false,
      polyfill: false,
      regenerator: true
    }]
  ])
};
