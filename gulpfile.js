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
 * includes all gulp files in gulp-folder
 * sets search-globs for creating docs
 */

'use strict';

var gulp = require('gulp');

require('./node_modules/zland-core/gulp/modulegulpfile.js')(__dirname)
.setDocGlobs([
  './**/README.md',
  "!node_modules/**/*",
  "!platforms/**/*",
  "!hooks/**/*",
  "!plugins/**/*",
  "!node_modules",
  "!doc/**/*"
])
.setFileDocsGlobs([
  "./**/*.js",
  "./**/*.jsx",
  "!node_modules/**/*",
  '!gulp/**/*',
  '!platforms/**/*',
  '!plugins/**/*',
  '!hooks/**/*',
  '!*/build/**/*'
]);

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
