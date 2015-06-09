var gulp = require('gulp');

/* ----- html processing modules ----- */

var replaceHtmlBlocks = require('gulp-html-replace');
var minifyHtml = require('gulp-html-minifier');
var checkHtml = require('gulp-w3cjs');

/* ----- other modules ----- */

var gulpif = require('gulp-if');

/* ----- configuration vars ----- */

var production = (process.argv.indexOf('--production') != -1);

/* ----- tasks ----- */

gulp.task('html', function() {

  gulp.src('index.html')
      .pipe(gulpif(production, replaceHtmlBlocks({

        'js': 'js/main.min.js'

      })))
      .pipe(gulpif(production, minifyHtml({

        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true

      })))
      .pipe(checkHtml())
      .pipe(gulp.dest('../server'));

});

gulp.task('default', ['html']);
