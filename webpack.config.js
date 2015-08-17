var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);

var commonConfig = {
  entry: path.resolve(ROOT_PATH, 'src/js/main'),
  output: {
    path: path.resolve(ROOT_PATH, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.resolve(ROOT_PATH, 'src/scss')
      }
    ]
  },
  plugins: [
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
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(commonConfig, startConfig);
}

