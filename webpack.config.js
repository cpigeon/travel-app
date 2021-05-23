const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
   path: path.resolve(__dirname, './dist'),
   filename: 'bundle.js'
 },

 plugins: [
   new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: './index.html',
    }),
 ]
}
