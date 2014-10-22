// Plugins
var gulp        = require('gulp');
var markdown    = require('gulp-markdown');
var concat      = require('gulp-concat');
var clean       = require('gulp-clean');
var connect     = require('gulp-connect');
var sass        = require('gulp-ruby-sass');
var open        = require("gulp-open");
var gulpFilter  = require('gulp-filter');
var headerfooter = require('gulp-headerfooter');

// Configuration
var config      = require('./data/languages');

// Globals
var docs_dir = 'source/docs/';

var chapters = [
  docs_dir + '01_overview/01_*.md',
  docs_dir + '01_overview/02_*.md',
  docs_dir + '01_overview/03_*.md',
  docs_dir + '01_overview/04_*.md',
  docs_dir + '01_overview/05_support/*.md',
  docs_dir + '01_overview/06_*.md',
  docs_dir + '01_overview/07_*.md',
  docs_dir + '02_api_libraries/01_api_libraries/*.md',
  docs_dir + '02_api_libraries/02_initialization/*.md',
  docs_dir + '02_api_libraries/03_webhooks/01_overview/*.md',
  docs_dir + '02_api_libraries/03_webhooks/02_receiving_webhooks/*.md',
  docs_dir + '02_api_libraries/03_webhooks/03_reacting_to_webhooks/*.md',
  docs_dir + '02_api_libraries/03_webhooks/04_testing_webhooks/*.md',
  docs_dir + '02_api_libraries/03_webhooks/05_bill_webhook/*.md',
  docs_dir + '02_api_libraries/03_webhooks/06_pre_auth_webhook/*.md',
  docs_dir + '02_api_libraries/03_webhooks/07_subscription_webhook/*.md',
  docs_dir + '02_api_libraries/04_prepopulation/*.md',
  docs_dir + '02_api_libraries/05_deployment/*.md',
  docs_dir + '03_setting_up_HTTP_payments/*.md',
  docs_dir + '04_making_REST_requests/*.md',
  docs_dir + '05_webhooks_http/*.md',
  docs_dir + '05_webhooks_http/04_webhook_types/*.md',
  docs_dir + '06_guides/*.md',
  docs_dir + '07_resources/*.md'
]

// Gulp tasks
gulp.task('default', ['docs']);

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

gulp.task('docs', function() {
  for(var i = 0; i < config.length; i++) {
    var obj = config[i];

    console.log("Building " + obj.slug + "...");
    buildLanguage(obj);
  }
});

gulp.task('connect', function () {
  connect.server({
    root: ['_site'],
    port: 9000,
    livereload: true
  });
});

gulp.task('watch', ['clean', 'docs', 'images', 'connect'], function () {
    gulp.watch(['source/docs/**'], ['docs']);
    gulp.watch(['source/docs/**/*.jpg', 'source/docs/**/*.png'], ['images']);
    connect.reload();
});

// Functions
function buildLanguage(language){
  var filter = gulpFilter(['*.md', '!*.*.md', '*.' + language.extname + '.md']);
  return gulp.src(chapters)
    .pipe(filter)
    .pipe(markdown())
    .pipe(headerfooter.header('./source/layouts/doc-header.html'))
    .pipe(headerfooter.footer('./source/layouts/doc-footer.html'))
    .pipe(concat('index.html'))
    .pipe(headerfooter.header('./source/layouts/header.html'))
    .pipe(gulp.dest('./_site/'+language.slug))
    .pipe(connect.reload());
}
