'use strict';

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
let config;

if (process.env.NODE_ENV === 'local') {
  config = require('../webpack-config/webpack.config.local');
} else {
  config = require('../webpack-config/webpack.config.environments');
}

const execSync = require('child_process').execSync;
const opn = require('opn');

const port = process.env.NODE_PORT || 443;

// We're doing it because as part of the caching solution for the manifest described here:
// https://github.com/webpack/webpack/tree/master/examples/chunkhash
// For the dev server the `chunkhash` in `filename` doesn't work, so we have to set it to `hash` here instead.
// The default in the shared config is set tot he right value for the non dev server builds, so here we're correcting it
// for dev server.
config.output.filename = '[name]-[hash].js';


// HMR (Hot Module Replacement) support
config.entry.application.unshift('webpack/hot/only-dev-server');
config.entry.application.unshift(`webpack-dev-server/client?${config.output.publicPath}`);

// HMR (Hot Module Replacement) plugins
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NamedModulesPlugin());

const compiler = webpack(config);

/**
 * Opens the app in the browser
 * @returns {void}
 */
function openBrowser() {
  if (process.platform === 'darwin') {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "Google Chrome"');
      execSync(
        'osascript ' +
                path.resolve(__dirname, './openChrome.applescript ') +
                config.output.publicPath
      );
      return;
    } catch (err) {
      // Ignore errors.
    }
  }

  // Fallback to opn
  // (It will always open new tab)
  opn(config.output.publicPath);
}

const getDevServerOptions = require('../webpack-config/devServerOptions');
const devServerOptions = getDevServerOptions({
  port,
  publicPath: config.output.publicPath
});

new WebpackDevServer(compiler, devServerOptions).listen(port, 'localhost', (err, result) => {
  if (err) {
    console.log(err);
  }

  openBrowser();
});
