var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyes'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

         // GULP TASKS BEGINER
//SASS
gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(autoprefixer(['last 15 version', '>1%', 'ie 8', 'ie 7'], {cascade: true}))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}));
});

//SCRIPTS
gulp.task('scripts', function() {
  return gulp.src([
    'app/js/script.js'
   ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

//CSS-LIBS
gulp.task('css-libs', ['sass'], function() {
  return gulp.src('app/css/libs.css')
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'));
});
//CSS-MIN
gulp.task('css-min', function() {
  return gulp.src('app/css/main.css')
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'));
});

//BROWSER-SYNC
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  notify: false
  });
});

//CLEAN
gulp.task('clean', function() {
  return del.sync('dist');
});

//CLEAR
gulp.task('clear', function() {
  return cache.clearAll();
});

//IMAGES
gulp.task('img', function() {
   return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

//WATCH
gulp.task('watch', ['browser-sync', 'css-libs', /*'scripts'*/], function() {
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

//BUILD
gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
  var buildCss = gulp.src([
    'app/css/main.min.css'
   ])
  .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
     .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
      .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
      .pipe(gulp.dest('dist'));

});

      //GULP TASKS END
