// TODO: we can split this file into several files (pre-eject, post-eject, test)
// and use those instead. This way we don't need to branch here.

var path = require('path');

// True when used as a dependency, false after ejecting
var isInNodeModules = (
  'node_modules' ===
  path.basename(path.resolve(path.join(__dirname, '..', '..')))
);

// Are we developing create-react-app locally?
var isInCreateReactAppSource = (
  process.argv.some(arg => arg.indexOf('--debug-template') > -1)
);

function resolve(relativePath) {
  return path.resolve(__dirname, relativePath);
}

if (isInCreateReactAppSource) {
  // create-react-app development: we're in ./config/
  module.exports = {
    appBuild: resolve('../build'),
    appHtml: resolve('../template/index.html'),
    appFavicon: resolve('../template/favicon.ico'),
    appPackageJson: resolve('../package.json'),
    appSrc: resolve('../template/src'),
    appNodeModules: resolve('../node_modules'),
    ownNodeModules: resolve('../node_modules')
  };
} else if (isInNodeModules) {
  // before eject: we're in ./node_modules/react-scripts/config/
  module.exports = {
    appBuild: resolve('../../../build'),
    appHtml: resolve('../../../index.html'),
    appFavicon: resolve('../../../favicon.ico'),
    appPackageJson: resolve('../../../package.json'),
    appSrc: resolve('../../../src'),
    appNodeModules: resolve('../..'),
    // this is empty with npm3 but node resolution searches higher anyway:
    ownNodeModules: resolve('../node_modules')
  };
} else {
  // after eject: we're in ./config/
  module.exports = {
    appBuild: resolve('../build'),
    appHtml: resolve('../index.html'),
    appFavicon: resolve('../favicon.ico'),
    appPackageJson: resolve('../package.json'),
    appSrc: resolve('../src'),
    appNodeModules: process.env.NODE_PATH,
    ownNodeModules: process.env.NODE_PATH
  };
}
