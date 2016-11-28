var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../../shared/schema.json');

console.log('Babel Relay Plugin re-loading schema.json');

module.exports = getbabelRelayPlugin(schema.data);
