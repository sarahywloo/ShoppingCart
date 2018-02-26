var path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: './src/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  watch: true,
  module: {
    loaders: [
      {
        test:/\.js$/,
        // exclude:/node_modules\/(?!(module1|module2)\/).*/,
        // loader: 'echo-loader',
        loader: 'babel-loader',
        query: {
          presets: ['es2016', 'react', 'stage-1']
        }
      }
    ]
  },
  resolve: {
    // root: __dirname + '/src'
  }
}