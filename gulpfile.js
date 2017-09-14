var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var flow = require('gulp-flowtype');
var gutil = require('gulp-util');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var print = require('gulp-print');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var args = require('yargs').argv;

var PRODUCTION = !! args.production;

var config = {
  srcPath: './src',
  outDir: './cloud'
};

gulp.task('scripts', function() {
  let bundle =
    gulp.src(config.srcPath + '/**/*.js')
      .pipe(print())
      .pipe(sourcemaps.init())
      .pipe(babel({
        // plugins: ['babel-plugin-transform-flow-strip-types', 'es2015', 'stage-2']
      }))
      .on('error', function (e) {
        notify.onError(e.message);
        console.log(e);
        this.emit('end');
      })
      .pipe(gulp.dest( config.outDir ));

  if (PRODUCTION) {
    bundle = bundle
      // compress
      .pipe(buffer())
      .pipe(uglify())

  } else {
    bundle = bundle
      .pipe(sourcemaps.write())
  }

  return bundle
    .pipe(gulp.dest(config.outDir + '/'))
    .pipe(notify('Compiling scripts done!'));
});

gulp.task('flow', ['scripts'], function() {
  gulp.src(config.srcPath + '/**/*.js')
    .pipe(flow({
      all: false,
      weak: false,
      killFlow: false,
      beep: true,
      abort: false,
      // reporter: {
      //     reporter: function(errors) {
      //         return sourcemapReporter.reporter(errors, { sourceRoot: '/' + clientSrcDir + '/' });
      //     }
      // }
    }));
});


gulp.task('clean', function () {
  del(config.outDir);
});

gulp.task('watch', function () {
  gulp.watch(config.srcPath + '/**/*.js', {cwd: './'}, ['flow']);
});

gulp.task('set-environment', function() {
  process.env.NODE_ENV = PRODUCTION ? 'production' : 'development';
});

gulp.task('default', [
  'set-environment',
  'flow',
  'watch'
]);

