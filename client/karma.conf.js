/*eslint-env node */
var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('./webpack.dev');
webpackConfig.devtool = 'cheap-module-source-map';

module.exports = function (config) {
  var configuration = {
    browsers: ['Chrome'], // ['Chrome'] run in Chrome, 'PhantomJS'
    singleRun: true,
     // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon'],
    files: [
      'src/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    webpack: {
      module: {
        rules: [{
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        },{
            test: /\.json$/,
            use: ['json-loader']
          }
        ,
        {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
        },
        {
            test: /\.styl$/,
            use: [
              'style-loader',
              'css-loader',
              'stylus-loader'
            ]
        }
        ]
       },
       plugins: [
         //new webpack.IgnorePlugin(/jsdom$/),
         new webpack.DefinePlugin( {
             __VERSION__: JSON.stringify('1.0')
         } )
      ],
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      resolve: webpackConfig.resolve
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      reporters: [
         {
             type: 'text-summary'
         },
         {
             type: 'html',
             dir: 'coverage/'
         }
     ]
    },
    customLaunchers: {
        Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },
  };

  if (process.env.TRAVIS) {
      configuration.browsers = ['Chrome_travis_ci'];
  }
  config.set(configuration)
};
