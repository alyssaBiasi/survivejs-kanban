var path = require('path');

const ROOT_PATH = path.resolve(__dirname);

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    logLevel: config.LOG_INFO,
    reporters: ['dots'],

    // list of files / patterns to load in the browser
    files: [ 'spec/**/*-spec.js' ],
    exclude: [ ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './spec/**/*-spec.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: [
          {
            text: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules|bower_components/
          },
          {
            test: /\.scss|css$/,
            loader: 'style!css!sass',
            include: path.resolve(ROOT_PATH, 'src/scss')
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};

