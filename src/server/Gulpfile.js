const gulp = require('gulp');
const clean = require('gulp-clean');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const gls = require('gulp-live-server');
const tsConfig = typescript.createProject('../../tsconfig.json');

/**
 * Gulp Settings
 *
 * If you introduce a new gulp task put its options here if possible.
 */
const config = {
  server: {
    rootFile: './app.ts',
    src: [
      './**/*.ts',
    ],
    dest: '../build-server'
  }
};


gulp.task('clean', () => {
  return gulp.src([config.server.dest], { allowEmpty: true })
    .pipe(clean({ force: true }));
});

gulp.task('typescript', () => {
  var tsResult = gulp.src(config.server.src)
    .pipe(sourcemaps.init())
    .pipe(tsConfig())

  return tsResult.js
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: ''
    }))
    .pipe(gulp.dest(config.server.dest));
});

gulp.task('express', gulp.series('typescript', () => {
  let server = gls(config.server.dest + '/app.js', {
    stdio: 'inherit'
  });
  server.start();

  // watch for changes -> compile -> restart server
  return gulp.watch([config.server.src], gulp.series(['typescript', () => {
    server.stop();
    server.start();
  }]));
}));



gulp.task('build', gulp.series('clean', 'typescript'));
gulp.task('default', gulp.series('build'));
