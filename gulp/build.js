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
 * - `gulp build` - for building the project
 * - `gulp build:debug` - for building the project in debug mode, gps and heading sensor faked
 * - `gulp zland-assets` - copies assets from corresponding modules in node_modules folder to www-directory
 * - `gulp merge-zland-configs` - merge all .zland-configs into the config of this project
 *
 *
 */

'use strict';

var gulp = require('gulp');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');
var path = require('path');
var del = require('del');
var handlebars = require('handlebars');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


gulp.task('merge-zland-configs', function(done) {
  var config;
  // read the general zland config into which the configs will be merged
  fs.readFileAsync(__dirname + '/../config/config.json', 'utf8')
  .then(function(content) {
    config = JSON.parse(content);
  })
  // read bower components dir
  .then(function() {
    return fs.readdirAsync(process.cwd() + '/node_modules');
  })
  // filter zland folder from bower dir
  .then(function(bowerFolders) {
    return _.filter(bowerFolders, function(name, i) {
        return name.indexOf('zland') === 0;
    });
  })
  // read .zland file from all folders and append folder name
  .then(function(zlandFolders) {
    var i, promises = [];
    for (i in zlandFolders) {
      promises.push((function(folder) {
        return new Promise(function(resolve, reject) {
          fs.readFileAsync(__dirname + '/../node_modules/' + zlandFolders[i] + '/.zland', 'utf8')
          .then(function(content) {
            var zlandConfig = JSON.parse(content);
            zlandConfig.folder = folder;
            resolve(zlandConfig);
          })
          .catch(function(e) {
            reject(e);
          });
        });
      })(zlandFolders[i]));
    }
    return promises;
  })
  // merge all .zland configs into general config, then write general config
  .spread(function() {
    var i, zlandConfigs = [];
    for (i in arguments) {
      zlandConfigs.push(arguments[i]);
    }
    config.configs = zlandConfigs;
    return fs.writeFileAsync(__dirname + '/../config/config.json', JSON.stringify(config, null, 2), 'utf8');
  })
  .then(function() {
    done();
  })
  .catch(function(e) {
    throw new Error('Error while config merge: ' + e.stack);
  });
});

gulp.task('zland-assets', function() {
  return gulp.src('node_modules/zland-*/www/assets/**/*.*')
    .pipe($.rename(function(path) {
      path.dirname = path.dirname.replace(/zland.*?\//, '');
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('build', ['inject-maps-key', 'set-config-to-production', 'build-webpack']);

gulp.task('build:debug', ['inject-maps-key', 'set-config-to-debug', 'build-webpack:debug']);
