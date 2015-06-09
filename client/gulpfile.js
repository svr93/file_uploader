var gulp = require('gulp');

/* ----- html processing modules ----- */

var replaceHtmlBlocks = require('gulp-html-replace');
var minifyHtml = require('gulp-html-minifier');
var checkHtml = require('gulp-w3cjs');

/* ----- js processing modules ----- */

var checkJs = require('gulp-jshint');
var styleOutput = require('jshint-stylish');
var minifyJs = require('gulp-closure-compiler-service');

/* ----- other modules ----- */

var gulpif = require('gulp-if');
var concat = require('gulp-concat');

/* ----- configuration vars ----- */

var production = (process.argv.indexOf('--production') != -1);

/* ----- tasks ----- */

gulp.task('html', function() {

  gulp.src('index.html')
      .pipe(gulpif(production, replaceHtmlBlocks({

        'js': {
          src: 'js/main.min.js',
          tpl: '<script defer src="%s"></script>'
        }

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

gulp.task('js', function() {

  gulp.src([
    'js/uploader.js',
    'js/init.js'
  ])
      .pipe(checkJs())
      .pipe(checkJs.reporter(styleOutput))
      .pipe(gulpif(production, minifyJs()))
      .pipe(gulpif(production, concat('main.min.js')))
      .pipe(gulp.dest('../server/js'));
});

gulp.task('default', ['html', 'js']);
