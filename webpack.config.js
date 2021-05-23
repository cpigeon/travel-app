const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    }),
 ]
}
