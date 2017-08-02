const path = require('path');
const autoprefixer = require('autoprefixer');

const config = require('./webpack.shared.config').config;
const srcPath = require('./webpack.shared.config').srcPath;
const nodeModulesPath = require('./webpack.shared.config').nodeModulesPath;
const reactVirtualizedPath = path.resolve(nodeModulesPath, 'react-virtualized');

config.devtool = 'source-map';

config.module.rules.push({
  test: /\.(scss|css)$/,
  include: [srcPath, reactVirtualizedPath],
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        minimize: false
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => {
          return [autoprefixer];
        },
        sourceMap: true
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }
  ]
});

module.exports = config;
