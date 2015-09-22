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
 * This file initializes zland and launches the app on cordova deviceready event
 * (or immediately if its build for browser)
 */

'use strict';

require('bootstrap/dist/css/bootstrap.css');
require('map/sass/style');
require('fontawesome/css/font-awesome.min');

//
// /**
//  * enable this to see whats happening with playground
//  * and google map
//  */
// // require('core/mapCalculate').getHeight = function() {
// //   return 400;
// // };
// // require('core/mapCalculate').getWidth = function() {
// //   return 400;
// // };
// // require('core/mapCalculate').getTop = function() {
// //   return 40;
// // };
// // require('core/mapCalculate').getLeft = function() {
// //   return 40;
// // };
//
//
var Router = require('react-router');
var React = require('react');


var onDeviceReady = function() {
  var Config = require('core/Config');
  Config.set(require('configuration'));
  require('initfiles');


  var Routes = require('Routes');

  require('debugConsole/stores/LogStore');

  Router.run(Routes, Router.HashLocation, function(Root) {
    React.render(<Root/>, document.body);
  });
};

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  window.device = {
    uuid: 1234,
    platform: 'browser'
  };
  onDeviceReady();
}
