const bathConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, bathConfig, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'AUI',
      template: 'index.html',
    }),
  ],
});
