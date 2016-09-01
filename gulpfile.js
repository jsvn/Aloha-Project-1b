var gulp = require('gulp');
var uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano');

// ------------------------------------------------------

// ugly
  gulp.task('ugly', function(){
      gulp.src('./src/js/*.js') // What files do we want gulp to consume?
        .pipe(uglify().on('error', function(e){
              console.log(e);
           })) // Call the uglify function on these files
        .pipe(plumber())
        .pipe(rename({ extname: '.min.js' })) //  Rename the uglified file
        .pipe(gulp.dest('./build')) // Where do we put the result?
  });

// watch .js file then uglify on change
  gulp.task('js-watch', function() {
     gulp.watch('./src/js/*.js', ['ugly']); // inside square brackets [tasks]
  });

// browser sync
  gulp.task('browser-sync', function() {
      browserSync.init({
          server: {
              baseDir: "./"
          }
      });
  });

// sass task
  gulp.task('sass', function() {
     gulp.src('./src/css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
           browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./build'))
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build'));
  });

//watch .scss files then sass on change
  gulp.task('sass-watch', function() {
     gulp.watch('./src/css/style.scss', ['sass']); // inside square brackets [tasks]
  });

//image min
  const imagemin = require('gulp-imagemin');
   
  gulp.task('imagemin', () =>
      gulp.src('./assets/images/original/*')
          .pipe(imagemin())
          .pipe(gulp.dest('./assets/images'))
  );


// html minify
  var htmlmin = require('gulp-htmlmin');
   
  gulp.task('htmlmin', function() {
    return gulp.src('./src/html/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./'))
  });

// html watch
  gulp.task('html-watch', function() {
     gulp.watch('./src/html/*.html', ['htmlmin']); // inside square brackets [tasks]
  });

// ------------------------------------------------------

gulp.task('default', ['htmlmin', 'ugly', 'sass','html-watch' , 'js-watch', 'sass-watch']);
