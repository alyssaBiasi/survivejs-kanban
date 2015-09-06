var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var Clean = require('clean-webpack-plugin');
var pkg = require('../package.json');
var pageRenderer = require('../src/js/util/pageRenderer');
var App = require('../src/js/components/App.jsx');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname) + '/../';

var commonConfig = {
  entry: path.resolve(ROOT_PATH, 'src/js/main.jsx'),
  output: {
    path: path.resolve(ROOT_PATH, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss|css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
        include: path.resolve(ROOT_PATH, 'src/scss')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
    new HtmlwebpackPlugin({
      title: 'survivejs - Kanban App',
      template: 'src/index.html'
    })
  ]
};

var startConfig = {
  devtool: 'eval-source-map',
  devServer: {
    colors: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 9100
  },
  module: {
    loaders: [
      {
        text: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.resolve(ROOT_PATH, 'src/js')
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

var buildConfig = {
  devtool: 'source-map',
  entry: {
    app: path.resolve(ROOT_PATH, 'src/js/main.jsx'),
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: path.resolve(ROOT_PATH, 'public'),
    filename: 'bundle.[chunkhash].js'
  },
  module: {
    loaders: [
      {
        text: /\.jsx?$/,
        loaders: ['babel'],
        include: path.resolve(ROOT_PATH, 'src/js')
      }
    ]
  },
  plugins: [
    new Clean(['public']),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash].js'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new HtmlwebpackPlugin({
      title: 'survivejs - Kanban App',
      templateContent: pageRenderer(App)
    })
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(commonConfig, startConfig);
} else if(TARGET === 'build') {
  module.exports = merge(commonConfig, buildConfig);
}

