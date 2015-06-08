var gulp = require('gulp');

/* ----- html processing modules ----- */

var minifyHtml = require('gulp-html-minifier');
var checkHtml = require('gulp-w3cjs');

/* ----- tasks ----- */

gulp.task('html', function() {

  gulp.src('index.html')
      .pipe(minifyHtml({

        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
        
      }))
      .pipe(checkHtml())
      .pipe(gulp.dest('../server'));

});

gulp.task('default', ['html']);
