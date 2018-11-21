  const path = require('path')

  module.exports = (env, options) => {
    return {
      entry: {
        entry: __dirname + '/src/index.js'
      },
      output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].bundle.js'
      },
      optimization: {
        minimize: options.mode == 'production'
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /(node_modules|dist|lib)/,
          use: {
            loader: 'babel-loader'
          }
        }]
      }
    }
  }