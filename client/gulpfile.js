var gulp = require('gulp');

/* ----- html processing modules ----- */

var replaceHtmlBlocks = require('gulp-html-replace');
var minifyHtml = require('gulp-html-minifier');
var checkHtml = require('gulp-w3cjs');

/* ----- css processing ----- */

var translateLess = require('gulp-less');

var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleanCss = new LessPluginCleanCSS({ advanced: true });

var checkCss = require('gulp-csslint');

/* ----- js processing modules ----- */

var checkJs = require('gulp-jshint');
var styleOutput = require('jshint-stylish');
var transformJs = require('gulp-jstransform');
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

        'css': 'css/main.min.css',

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

gulp.task('css', function() {

  gulp.src('less/*.less')
      .pipe(gulpif(production, translateLess({

        plugins: [cleanCss]

      }), translateLess()))
      .pipe(checkCss())
      .pipe(checkCss.reporter())
      .pipe(gulpif(production, concat('main.min.css')))
      .pipe(gulp.dest('../server/css'));
});

gulp.task('js', function() {

  gulp.src([
    'js/uploader.js',
    'js/init.js'
  ])
      .pipe(checkJs())
      .pipe(checkJs.reporter(styleOutput))
      .pipe(transformJs({

        harmony: true,
        target: 'es5'

      }))
      .pipe(gulpif(production, minifyJs()))
      .pipe(gulpif(production, concat('main.min.js')))
      .pipe(gulp.dest('../server/js'));
});

gulp.task('default', ['html', 'css', 'js']);
