var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
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
      template: 'src/index.html',
      inject: 'body'
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

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(commonConfig, startConfig);
}

