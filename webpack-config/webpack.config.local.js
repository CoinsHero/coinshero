const autoprefixer = require('autoprefixer');

const config = require('./webpack.shared.config').config;
const srcPath = require('./webpack.shared.config').srcPath;

config.devtool = 'source-map';

config.module.rules.push({
  test: /\.(scss|css)$/,
  include: [srcPath],
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
        }
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
