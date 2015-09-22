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
 * @filedescription build zland files.
 * As of now all of the resulting files are located in the www folder
 * - CanvasView.jsx
 * - initfiles.js
 * - Routes.jsx
 * - spotfactories/Generators.js and spotfactories/ComponentFactories.js
 * - canvasstores/Stores.js and canvasstores/getStoreValues.js (TODO: evaluate if this is still necessary)
 */

'use strict';

var gulp = require('gulp'),
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs')),
    _ = require('lodash'),
    path = require('path'),
    del = require('del'),
    handlebars = require('handlebars'),
    ZlandFile = require('./ZlandFile'),
    zlandConfig = require(__dirname + '/../config/config.json');

gulp.task('create-canvasview', ['merge-zland-configs', 'clean:canvasview'], function(done) {
  var header = [],
      content = [];

  header.push("var React = require('react')");

  var zlandFile = new ZlandFile();
  zlandFile.forEachConfigArray('canvasViews', function(config, view) {
    // if debug isnt activated skip views made for debug
    if (!zlandConfig.debug && config.debug) {
      return;
    }
    var variable = path.basename(view);
    header.push("var " + variable + " = require('" + path.join(config.resolveAlias, view) + "')");
    content.push("<" + variable + "/>");
  })
  .then(function() {
    return zlandFile.compileCoreTemplate('CanvasView.jsx', function(tpl) {
      return tpl({
        header: header.join(";\n") + ';',
        content: content.join("\n")
      });
    })
  })
  .then(function() {
    return zlandFile.toFile('CanvasView.jsx');
  })
  .then(done);
});

gulp.task('create-initfiles', ['merge-zland-configs', 'clean:initfiles'], function(done) {
  var content = [];

  var zlandFile = new ZlandFile();
  zlandFile.forEachConfigArray('initFiles', function(config, file) {
    content.push("require('" + path.join(config.resolveAlias, file) + "')");
  })
  .then(function() {
    return zlandFile.compileCoreTemplate('Empty.js', function(tpl) {
      return tpl({
        content: content.join(";\n") + ';'
      });
    });
  })
  .then(function() {
    return zlandFile.toFile('initfiles.js');
  })
  .then(done);
});

gulp.task('create-routes', ['merge-zland-configs', 'clean:canvasview'], function(done) {
  var header = [],
      content = [];

  var zlandFile = new ZlandFile();
  zlandFile.forEachConfigArray('routes', function(config, route) {
    var handler = path.basename(route.handler);
    header.push("var " + handler + " = require('" + path.join(config.resolveAlias, route.handler) + "')");
    content.push('<Route path="' + route.path + '" handler={' + handler + '}/>');
  })
  .then(function() {
    return zlandFile.compileCoreTemplate('Routes.jsx', function(tpl) {
      return tpl({
        header: header.join(";\n") + ';',
        content: content.join("\n")
      });
    })
  })
  .then(function() {
    return zlandFile.toFile('Routes.jsx');
  })
  .then(done);
});

gulp.task('create-spotfactories', ['merge-zland-configs', 'clean:spotfactories'], function(done) {
  var generators = [];
  var componentFactories = [];

  var zlandFile = new ZlandFile();
  zlandFile.forEachConfig(function(config) {
    if (config.spot) {
      generators.push("'" + config.spot.name + "': require('" + path.join(config.resolveAlias, config.spot.generator) + "')");
      componentFactories.push("'" + config.spot.name + "': require('" + path.join(config.resolveAlias, config.spot.componentFactory) + "')");
    }
  })
  .then(function() {
    return zlandFile.compileCoreTemplate('Object.js', function(tpl) {
      return tpl({
        content: generators.join(",\n")
      });
    })
  })
  .then(function() {
    return zlandFile.toFile('spotfactories/Generators.js')
  })
  .then(function() {
    return zlandFile.compileCoreTemplate('Object.js', function(tpl) {
      return tpl({
        content: componentFactories.join(",\n")
      });
    })
  })
  .then(function() {
    return zlandFile.toFile('spotfactories/ComponentFactories.js');
  })
  .then(done);
});


gulp.task('create-canvasstores', ['merge-zland-configs', 'clean:canvasstores'], function(done) {

  var stores = [];
  var storeValuesHeader = [];
  var storeValues = [];

  var zlandFile = new ZlandFile();
  zlandFile.forEachConfig(function(config) {
    var prop, storeValueSettings, store;
    if (config.canvasStores) {
      config.canvasStores.forEach(function(store) {
        stores.push("require('" + path.join(config.resolveAlias, store) + "')");
      })
    }

    if (config.canvasStoreValues) {
      for (prop in config.canvasStoreValues) {
        storeValueSettings = config.canvasStoreValues[prop];
        store = path.basename(storeValueSettings.store);
        storeValuesHeader.push('var ' + store + " = require('" + path.join(config.resolveAlias, storeValueSettings.store) + "');");
        storeValues.push("'" + prop + "': " + store + '.' + storeValueSettings.method);
      }
    }
  })
  .then(function() {
    return zlandFile.compileCoreTemplate('Array.js', function(tpl) {
      return tpl({content: stores.join(",\n")});
    });
  })
  .then(function() {
    return zlandFile.toFile('canvasstores/Stores.js')
  })
  .then(function() {
    return zlandFile.compileCoreTemplate('Function.js', function(tpl) {
      storeValuesHeader = _.uniq(storeValuesHeader);
      return tpl({
        content: 'return {' + storeValues.join(",\n") + '}',
        header: storeValuesHeader.join("\n")
      });
    })
  })
  .then(function() {
    return zlandFile.toFile('canvasstores/getStoreValues.js');
  })
  .then(done);
});

gulp.task('clean:spotfactories', function(done) {
  del(['www/spotfactories'], done);
});

gulp.task('clean:canvasstores', function(done) {
  del(['www/canvasstores'], done);
});

gulp.task('clean:canvasview', function(done) {
  del(['www/CanvasView.jsx'], done);
});

gulp.task('clean:initfiles', function(done) {
  del(['www/initfiles.js'], done);
});

gulp.task('create-zland-files', ['create-canvasstores', 'create-spotfactories', 'create-canvasview', 'create-routes', 'create-initfiles'])
