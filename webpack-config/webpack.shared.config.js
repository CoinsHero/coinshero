const path = require('path');
const url = require('url');

const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const webpackUtils = require('./webpack.utils');

process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const configFilePath = path.resolve(`./webpack-config/env-configs/${process.env.NODE_ENV}.js`);
const configFile = require(configFilePath);
const siteURL = url.parse(configFile.ORIGINS.COINS_HERO);

const YAML = require('yamljs');

const stats = process.env.STATS || false;
const port = process.env.NODE_PORT || siteURL.port;
const hostAddress = process.env.HOST_ADDRESS || siteURL.hostname;
const hostProtocol = process.env.HOST_PROTOCOL || siteURL.protocol.slice(0, siteURL.protocol.length - 1);

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
const buildPath = path.resolve(currentDirectory, 'dist');
const faviconPath = `${srcPath}/assets/favicons/coinshero-favicon.png`;

const resourceHintsMetaTags = webpackUtils.buildResourceHintsMetaTags(configFile.RESOURCE_HINTS_ORIGINS, publicPath);

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
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader'
          },
          {
            loader: 'svgo-loader',
            options: require('./svgo.plugins')
          }
        ]
      },
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
    new CopyPlugin([{ from: faviconPath, to: path.basename(faviconPath) }]),
    // For more moment locales change `en` with `en|fr|hu`
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),

    // Async loaded vendors chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'application',
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
  ]
};

// Adds the favicon according to the title of the site.
// We do that in order to enable the right name in the Add To Home Screen option in mobile browsers:
// https://developers.google.com/web/updates/2017/02/improved-add-to-home-screen
// You can see it in the manifest.webapp file in the output of the favicon plugin folder
const localeFilePath = path.resolve('./src/locale/global.yml');
const globalFile = YAML.load(localeFilePath);

config.plugins.push(new FaviconsWebpackPlugin({
  logo: faviconPath,
  title: globalFile.APP_NAME
}));

const versionDate = new Date().toString();

// This is taken from the i18n.js file, when updated here it should also be updated there
const locales = ['he', 'en'];
const languages = [];

locales.forEach((locale) => {
  languages.push({
    code: locale,
    localeURL: locale === 'en' ? configFile.ORIGINS.COINS_HERO : configFile.ORIGINS.COINS_HERO + `/${locale}/`
  });
});

const HreflangLinkTags = webpackUtils.buildHreflangLinkTags(languages);

languages.forEach((language) => {
  const localeFilePath = path.resolve(`./src/locale/${language.code}.yml`);
  const file = YAML.load(localeFilePath);
  const htmlConfig = {
    resourceHintsMetaTags,
    inject: true,
    version: versionDate,
    title: file.SITE_TITLE,
    description: file.SITE_DESCRIPTION,
    keywords: file.SITE_KEYWORDS,
    locale: language.code,
    localeURL: language.localeURL,
    template: indexHtmlPath,
    favicon: faviconPath,
    HreflangLinkTags,
    imageType: path.extname(faviconPath).substring(1),
    imageHttp: `${configFile.ORIGINS.COINS_HERO}/${path.basename(faviconPath)}`,
    imageHttps: `${configFile.ORIGINS.COINS_HERO}/${path.basename(faviconPath)}`
  };

  if (language.code !== 'en') {
    htmlConfig.filename = `${language.code}/index.html`;
  }

  config.plugins.push(new HtmlWebpackPlugin(htmlConfig));
});

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
  port,
  nodeModulesPath
};
