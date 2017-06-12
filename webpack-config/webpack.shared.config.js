const path = require('path');

const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const InterpolateLoaderOptionsPlugin = require('interpolate-loader-options-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackUtils = require('./webpack.utils');

process.env.NODE_ENV = process.env.NODE_ENV || 'local';
const stats = process.env.STATS || false;
const port = process.env.NODE_PORT || 443;
const hostAddress = process.env.HOST_ADDRESS;
const hostProtocol = process.env.HOST_PROTOCOL || 'https';
let publicPath = `${hostProtocol}://${hostAddress}`;

// We do not add the port by default cause otherwise our PR website demo solution will be broken cause the S3 folder name
// is part of the 'domain' name
if (port && port !== '443') {
  publicPath = `${publicPath}:${port}`;
}

publicPath = `${publicPath}/`;

// Paths
const currentDirectory = path.resolve(__dirname, '..');
const srcPath = path.resolve(currentDirectory, 'src');
const chunksPath = path.resolve(srcPath, 'chunks');
const nodeModulesPath = path.resolve(currentDirectory, 'node_modules');
const indexHtmlPath = path.resolve(currentDirectory, 'index.html');
const indexHtmlTitle = 'Coins Market';
const buildPath = path.resolve(currentDirectory, 'dist');

const configFilePath = path.resolve(`./webpack-config/env-configs/${process.env.NODE_ENV}.js`);

const resourceHintsMetaTags = webpackUtils.buildResourceHintsMetaTags(require(configFilePath).RESOURCE_HINTS_ORIGINS, publicPath);

const config = {
  entry: {
    application: [path.join(chunksPath, 'application-chunk')]
  },
  output: {
    // Next line is not used in local but WebpackDevServer crashes without it:
    path: buildPath,
    pathinfo: true,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    libraryTarget: 'umd',
    publicPath
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      config: configFilePath
    }
  },
  resolveLoader: {
    modules: [nodeModulesPath]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [srcPath],
        loader: 'babel-loader',
        options: {
          cacheDirectory: process.env.NODE_ENV === 'local'
        }
      },
      {
        test: /\.ya?ml$/,
        use: [
          {
            loader: 'json-loader'
          },
          {
            loader: 'yaml-loader'
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 1000
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: '@adsk/bim360-svg-store-transform-loader'
      //     },
      //     {
      //       loader: 'svgo-loader',
      //       options: require('./svgo.plugins')
      //     }
      //   ]
      // },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new CleanPlugin(['dist'], {root: currentDirectory}),
    // For more moment locales change `en` with `en|fr|hu`
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),

    // Async loaded vendors chunk
    new webpack.optimize.CommonsChunkPlugin({
      async: 'vendors',
      children: true,
      minChunks: (module, count) => {
        return module.resource &&
          webpackUtils.isVendor(module.resource) &&
          !webpackUtils.isPolyfill(module.resource);
      }
    }),
    // For better caching - https://github.com/webpack/webpack/tree/master/examples/chunkhash
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: indexHtmlTitle,
      resourceHintsMetaTags,
      inject: true,
      template: indexHtmlPath,
      favicon: srcPath + '/assets/favicons/coinsmarket-favicon.png'
    }),
    new ScriptExtHtmlWebpackPlugin({
      prefetch: {
        test: webpackUtils.shouldPrefetch(),
        // Loads only chunks that were created dynamically
        chunks: 'async'
      }
    }),
    // We're inlining some chunks for couple since they are very small (~ 1KB) and it's a waste to make a round trip just for them.
    // The loading of the 'manifest' chunk is part of the caching improvement described
    // in: https://github.com/webpack/webpack/tree/master/examples/chunkhash
    new InlineChunkWebpackPlugin({
      inlineChunks: ['manifest'],
      quiet: true
    })
    // new InterpolateLoaderOptionsPlugin({
    //   loaders: [{
    //     name: 'svgo-loader',
    //     // 25 is the index of the cleanupIDs plugin in the plugins array.
    //     include: ['plugins.25.cleanupIDs.prefix']
    //   }]
    // })
  ]
};

if (webpackUtils.isWatching()) {
  const Dashboard = require('webpack-dashboard');
  const DashboardPlugin = require('webpack-dashboard/plugin');
  const dashboard = new Dashboard();
  config.plugins.push(new DashboardPlugin(dashboard.setData));
}

if (stats) {
  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'web-analyze.html',
    openAnalyzer: true,
    generateStatsFile: true,
    statsFilename: 'webpack-stats.json',
    logLevel: 'info'
  }));
}

module.exports = {
  config,
  srcPath,
  port
};
