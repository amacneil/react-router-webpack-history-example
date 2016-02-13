var path = require('path');
var node_modules = path.join(__dirname, 'node_modules');
var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.js');
var pathToReactRouter = path.resolve(node_modules, 'react-router/umd/ReactRouter.min.js');
var pathToUnderscore = path.resolve(node_modules, 'underscore/underscore-min.js');

var config = {
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
    noParse: [],
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap' }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
      alias: {
        "react-dom": pathToReactDOM,
        "react-router": pathToReactRouter
      }
  }
};

var deps = [
  'jquery/dist/jquery.min.js',
  'bootstrap/dist/js/bootstrap.min.js',
  'bootbox/bootbox.min.js',
  'react/dist/react.min.js',
  'redux/dist/redux.min.js',
  'moment/min/moment.min.js',
  'underscore/underscore-min.js'
];
deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;