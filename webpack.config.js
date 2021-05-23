const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/client/index.js',
  output: {
   path: path.resolve(__dirname, './dist'),
   filename: 'bundle.js'
 },

}
