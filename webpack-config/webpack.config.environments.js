const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./webpack.shared.config').config;
const srcPath = require('./webpack.shared.config').srcPath;
const nodeModulesPath = require('./webpack.shared.config').nodeModulesPath;
const reactVirtualizedPath = path.resolve(nodeModulesPath, 'react-virtualized');

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compressor: {
    screw_ie8: true,
    warnings: false
  },
  mangle: {
    screw_ie8: true
  },
  output: {
    comments: false,
    screw_ie8: true
  },
  sourceMap: false
}));

// Support for ExtractTextPlugin
config.plugins.push(new ExtractTextPlugin({
  filename: '[name]-[contenthash].css',
  allChunks: true
}));
config.plugins.push(new webpack.DefinePlugin({
  // Why we're using `produciton` for NODE_ENV no matter what?
  // When using Uglify, some packages (Like Redux & React) have special optimization for their code but only if we're
  // using NODE_ENV=produciton. That's why for all the deployments we're setting NODE_ENV=production.
  'process.env.NODE_ENV': JSON.stringify('production')
}));
config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

config.module.rules.push({
  test: /\.(scss|css)$/,
  include: [srcPath, reactVirtualizedPath],
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: false,
          minimize: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => {
            return [autoprefixer];
          },
          sourceMap: false
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: false
        }
      }
    ]
  })
});

module.exports = config;
