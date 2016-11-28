module.exports = {
  babelrc: false,
  cacheDirectory: false,  // changes to babel-relay-plugin and schema.json don't take effect with cache
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
    './babelRelayPlugin'
  ].map(require.resolve)
};
