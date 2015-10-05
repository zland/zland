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
 * - `gulp serve` - serve in files in the browser with production settings
 * - `gulp serve:debug` - serve in files in the browser with debug settings
 * - `gulp set-config-to-debug` - sets debug flag in config/config.json true
 * - `gulp set-config-to-production` - sets debug flag in config/config.json false
 * - `gulp webpack` - launch webpack in watch mode
 * - `gulp webpack:debug` - launch webpack in watch mode with debug settings
 * - `gulp build-webpack` - webpack build files
 * - `gulp build-webpack:debug` - webpack build files in debug mode
 */

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var util = require('util');
var browserSync = require('browser-sync');
var gutil = require("gulp-util");
var webpack = require("webpack");
var makeWebpackConfig = require('../make-webpack-config.js');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function setToDebug(enabled, done) {
  var config = require('../config/config');
  config.debug = enabled;
  fs.writeFileAsync(__dirname + '/../config/config.json', JSON.stringify(config, null, 2), 'utf8')
  .then(function() {
    done();
  });
}

function launchWebpack(env, callback, watch) {
  watch = watch || false;

  fs.readFileAsync(__dirname + '/../config/config.json')
  .then(JSON.parse)
  .then(function(config) {
    return new Promise(function(resolve, reject) {
      var webpackConfig = makeWebpackConfig(
        config.configs,
        require('./../webpack-' + env + '-settings')
      );
      webpackConfig.watch = watch;

      webpack(webpackConfig, function(err, stats) {
        if (err) {
            reject(new gutil.PluginError("execWebpack", err));
        }
        util.log("[execWebpack]", stats.toString({
            colors: true
        }));
        resolve();
      });
    });
  })
  .then(function() {
    callback();
  })
  .catch(function(e) {
    throw new Error('Error on webpack: '  + e.stack);
  });
}

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;

  browserSync.instance = browserSync.init(files, {
    startPath: 'index.html',
    port: 7000,
    server: {
      baseDir: baseDir,
      routes: routes
    },
    files: ["www/build/**/*.js"],
    browser: browser
  });

}

gulp.task('start-browsersync', function () {
  browserSyncInit([
      './www'
    ], [
    ],
    'google chrome'
  );
});

gulp.task('set-config-to-debug', function(done) {
  setToDebug(true, done);
});

gulp.task('set-config-to-production', function(done) {
  setToDebug(false, done);
});

gulp.task('webpack', ['merge-zland-configs', 'inject-maps-key', 'zland-assets', 'create-zland-files'], function(callback) {
  launchWebpack('production', callback, true);
});

gulp.task('webpack:debug', ['merge-zland-configs', 'inject-maps-key', 'zland-assets', 'create-zland-files'], function(callback) {
  launchWebpack('debug', callback, true);
});

gulp.task('build-webpack', ['merge-zland-configs', 'inject-maps-key', 'zland-assets', 'create-zland-files'], function(callback) {
  launchWebpack('production', callback, false);
});

gulp.task('build-webpack:debug', ['merge-zland-configs', 'inject-maps-key', 'zland-assets', 'create-zland-files'], function(callback) {
  launchWebpack('debug', callback, false);
});

gulp.task('serve', ['set-config-to-production', 'webpack'], function() {
  return gulp.start('start-browsersync');
});

gulp.task('serve:debug', ['set-config-to-debug', 'webpack:debug'], function(done) {
  return gulp.start('start-browsersync');
});
