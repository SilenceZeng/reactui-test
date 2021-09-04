const bathConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = Object.assign({}, bathConfig, {
  mode: 'production',
  entry: {
    example: './example.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'doc'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'example.html',
      filename: 'index.html',
    }),
  ],
});
