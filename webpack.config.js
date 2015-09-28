var path = require('path');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: {
    javascript: './app.js',
    html: './index.html'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
