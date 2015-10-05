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
 * webpack config with production settings
 */

'use strict';

var webpack = require('webpack');

module.exports = {

  cache: true,
  debug: false,
  devtool: false,

  resolve: {
    alias: {
      'sensorservice': __dirname + '/node_modules/zland-core/services/CordovaService'
    }
  }

  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin(),
  //   new webpack.ProvidePlugin({
  //       "bootstrap": "bootstrap",
  //       $: "jquery",
  //       jQuery: "jquery",
  //       "window.jQuery": "jquery",
  //       "Backbone": "backbone",
  //       "window.Backbone": "backbone",
  //       "_": "underscore"
  //   })
    // enable later
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false
    //   }
    // })
  // ]
};
