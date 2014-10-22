var gulp = require('gulp');
var markdown = require('gulp-markdown');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');
var open = require("gulp-open");
var gulpFilter = require('gulp-filter');


var docs_dir = 'source/docs/';

var chapters = [
  docs_dir + '01_overview/01_*.md',
  docs_dir + '01_overview/02_*.md',
  docs_dir + '01_overview/03_*.md',
  docs_dir + '01_overview/04_*.md',
  docs_dir + '01_overview/05_*/*.md',
  docs_dir + '01_overview/06_*.md',
  docs_dir + '01_overview/07_*.md',
  docs_dir + '02_api_libraries/01_api_libraries/*.md',
  docs_dir + '02_api_libraries/02_initialization/*.md'
]

gulp.task('default', ['rubyDocs', 'nodeDocs']);

gulp.task('rubyDocs', function () {
  var filterRuby = gulpFilter(['*.md', '!*.*.md', '*.rb.md']);
  return gulp.src(chapters)
    .pipe(filterRuby)
    .pipe(markdown())
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./_site/ruby/'))
    .pipe(connect.reload());
});

gulp.task('nodeDocs', function () {
  var filterNode = gulpFilter(['*.md', '!*.*.md', '*.js.md']);
  return gulp.src(chapters)
    .pipe(filterNode)
    .pipe(markdown())
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./_site/node/'))
    .pipe(connect.reload());
});


gulp.task('images', function () {
  return gulp.src('source/images/**')
    .pipe(gulp.dest('./_site/images/'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('./source/stylesheets/**/*.scss')
    .pipe(sass())
    .pipe(concat('all.css'))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('_site/stylesheets/'));
});

gulp.task('clean', function() {
  return gulp.src('_site', {read: false})
    .pipe(clean());
});

gulp.task('connect', function () {
  connect.server({
    root: ['_site'],
    port: 9000,
    livereload: true
  });
});

gulp.task('watch', ['clean', 'rubyDocs', 'nodeDocs', 'images', 'connect'], function () {
    gulp.watch(['source/docs/**'], ['rubyDocs', 'nodeDocs']);
    connect.reload();
});
