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

'use strict';

var configs = require(__dirname + '/../config/config.json').configs;
var handlebars = require('handlebars');
var exec = require('./exec');
var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function ZlandFile() {
  this.fileContent = null;
}

ZlandFile.prototype = {
  forEachConfigArray: function(key, func) {
    for (var i in configs) {
      var config = configs[i];
      if (config[key]) {
        config[key].forEach(func.bind(undefined, config));
      }
    }
    return Promise.resolve();
  },

  forEachConfig: function(func) {
    for (var i in configs) {
      func(configs[i]);
    }
    return Promise.resolve();
  },

  compileCoreTemplate: function(file, func) {
    var fileTemplate = fs.readFileSync(__dirname + '/../node_modules/zland-core/filetemplates/' + file, 'utf8');
    this.fileContent = func(handlebars.compile(fileTemplate));
    return Promise.resolve();
  },

  toFile: function(wwwPath) {
    var promise = Promise.resolve();
    if (wwwPath.indexOf('/') !== -1) {
      var file = path.basename(wwwPath);
      var filePath = wwwPath.substr(0, wwwPath.lastIndexOf('/'));
      filePath = path.join(__dirname + '/../www', filePath);

      if (!fs.existsSync(filePath)) {
        promise = promise.then(function() {
          return exec('mkdir -p ' + filePath);
        });
      }
    }
    return promise.then((function() {
      return fs.writeFileAsync(path.join(__dirname + '/../www/', wwwPath), this.fileContent, 'utf8');
    }).bind(this));
  }
};

module.exports = ZlandFile;
