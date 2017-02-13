var gulp = require('gulp');
var postcss = require('gulp-postcss');
var webserver = require('gulp-webserver');

// Plugins
var cssnext = require('postcss-cssnext');
var pxtorem = require('postcss-pxtorem');
var font = require('postcss-font-magician');

gulp.task('css', function(){
    var processors = [
        cssnext,
        pxtorem({
          propWhiteList: [],
          mediaQuery: true
        }),
        font({
          'Open Sans': {
              '300': ['woff, eot, woff2'],
              '400 italic': ['woff2']
          }
        })
    ];

    return gulp.src('./src/*.css')
        .pipe( postcss(processors) )
        .pipe(gulp.dest('./dist'));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      port: 3000,
      open: 'http://localhost:3000/',
      fallback: 'index.html'
    }));
});

gulp.task('default', ['webserver'], function(){
    gulp.watch('./src/*.css', ['css']);
});