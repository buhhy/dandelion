var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../../shared/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
