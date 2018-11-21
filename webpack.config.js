  const path = require('path')

  module.exports = {
    entry: {
      entry: __dirname + '/src/index.js'
    },
    output: {
      filename: '[name].bundle.js'
    },
    optimization: {
      minimize: true
    }
  }