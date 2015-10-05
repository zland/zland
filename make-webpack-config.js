/*!
 * Copyright 2015 Florian Biewald
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @filedescription
 * function for building a webpack config object
 * zland modules are injected dynamically using configs of config/config.json 
 */

'use strict';

var webpack = require('webpack'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash');

module.exports = function(moduleConfigs, webpackSettings) {
  var zlandModuleAliases = {},
      i,
      moduleConfig,
      aliases,
      webpackConfig;

  for (i in moduleConfigs) {
    moduleConfig = moduleConfigs[i];
    zlandModuleAliases[moduleConfig.resolveAlias] =
      __dirname + '/node_modules/' + moduleConfig.folder;
  }

  webpackConfig = {
    output: {
      filename: 'main.js',
      path: __dirname + '/www/build',
      publicPath: 'build/'
    },

    context: __dirname,

    watch: true,
    watchOptions: {
      aggregateTimeout: 500
    },

    entry: './www/bootstrap',

    stats: {
      colors: true,
      reasons: true
    },

    resolve: {
      moduleDirectories: ['node_modules'],
      extensions: ['', '.js', '.coffee', '.scss', '.css', '.json', '.jsx'],
      alias: _.merge({
        // 'styles': __dirname + '/src/styles',
        // 'mixins': __dirname + '/src/mixins',
        // 'components': __dirname + '/src/components/',
        'react': __dirname + '/node_modules/react/dist/react-with-addons',
        'reactlib': __dirname + '/node_modules/react/lib',

        'underscore': __dirname + '/node_modules/underscore/underscore.js',
        'jquery': __dirname + '/node_modules/jquery/dist/jquery.js',
        bluebird: __dirname + '/node_modules/bluebird/js/browser/bluebird.min',
        'bootstrap': __dirname + '/node_modules/bootstrap',
        'fontawesome': __dirname + '/node_modules/font-awesome',
        'moment': __dirname + '/node_modules/moment/min/moment.min',
        'jquery-translate3d': __dirname + '/node_modules/jquery-translate3d/jquery-translate3d.js',
        'whenjs': __dirname + '/node_modules/when',
        'crypto-js': __dirname + '/node_modules/crypto-js',
        'assets': __dirname + '/www/assets',
        'configuration': __dirname + '/config/config',

        'react-router': __dirname + '/node_modules/react-router/umd/ReactRouter',
        'sensorservice': __dirname + '/node_modules/zland-core/services/DebugService',
        'spotfactories': __dirname + '/www/spotfactories',
        'canvasstores': __dirname + '/www/canvasstores',
        'CanvasView': __dirname + '/www/CanvasView',
        'Routes': __dirname + '/www/Routes',
        'initfiles': __dirname + '/www/initfiles'

        // zland module configs will be merged

      }, zlandModuleAliases)
    },
    module: {
      preLoaders: [],
      loaders: [{
          test: /\.coffee$/,
          loader: "coffee-loader"
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg).*$/,
        loader: 'url-loader?limit=8192'
      }, {
        test: /\.(json).*$/,
        loader: 'json-loader'
      }, {
        test: /\.(jsx).*$/,
        loader: 'jsx-loader'
      },

      {
        test: /\.scss$/,
        loader: "style!css!sass?" +
            "includePaths[]=" +
              (path.resolve(__dirname, "./node_modules")) + '&' +
            "includePaths[]=" +
              __dirname
      }]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ProvidePlugin({
          "bootstrap": "bootstrap",
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery",
          "_": "underscore"
      })
    ]
  };

  return _.merge(webpackConfig, webpackSettings);
};
