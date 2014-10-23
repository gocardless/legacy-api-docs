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
var cheerio     = require('gulp-cheerio');
var foreach     = require('gulp-foreach');
var ext = require('gulp-ext-replace');

// Configuration
var config      = require('./data/languages');

// Globals
var docs_dir = 'source/docs/';
var code_temp_dir = '.tmp/code/';
var md_temp_dir = '.tmp/docs/';

var chapters = [
  md_temp_dir + '01_overview/01_*.html',
  md_temp_dir + '01_overview/02_*.html',
  md_temp_dir + '01_overview/03_*.html',
  md_temp_dir + '01_overview/04_*.html',
  md_temp_dir + '01_overview/05_support/*.html',
  md_temp_dir + '01_overview/06_*.html',
  md_temp_dir + '01_overview/07_*.html',
  md_temp_dir + '02_api_libraries/01_api_libraries/*.html',
  md_temp_dir + '02_api_libraries/02_initialization/*.html',
  md_temp_dir + '02_api_libraries/03_webhooks/01_overview/*.html',
  md_temp_dir + '02_api_libraries/03_webhooks/02_receiving_webhooks/*.html',
  md_temp_dir + '02_api_libraries/03_webhooks/03_reacting_to_webhooks/*.html',
  md_temp_dir + '02_api_libraries/03_webhooks/04_testing_webhooks/*.html',
  md_temp_dir + '02_api_libraries/03_webhooks/05_bill_webhook/*.html',
  md_temp_dir + '02_api_libraries/03_webhooks/06_pre_auth_webhook/*.html',
  md_temp_dir + '02_api_libraries/03_webhooks/07_subscription_webhook/*.html',
  md_temp_dir + '02_api_libraries/04_prepopulation/*.html',
  md_temp_dir + '02_api_libraries/05_deployment/*.html',
  md_temp_dir + '03_setting_up_HTTP_payments/*.html',
  md_temp_dir + '04_making_REST_requests/*.html',
  md_temp_dir + '05_webhooks_http/*.html',
  md_temp_dir + '05_webhooks_http/04_webhook_types/*.html',
  md_temp_dir + '06_guides/*.html',
  md_temp_dir + '07_resources/bill/*.html',
  md_temp_dir + '07_resources/bill/02_create_a_one_off_bill/*.html',
  code_temp_dir + '07_resources/bill/02_create_a_one_off_bill/code/*',
  md_temp_dir + '07_resources/bill/03_confirm_a_new_one_off_bill/*.html',
  md_temp_dir + '07_resources/bill/04_list_all_bills/*.html',
  md_temp_dir + '07_resources/bill/05_retrieve_an_existing_bill/*.html',
]

var code = [
  docs_dir + '**/**/**/code/**/*'
]

var md = [
  docs_dir + '**/*.md'
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

gulp.task('prepareCode', function () {
  gulp.src(code)
    .pipe(headerfooter.header('./source/layouts/code-header.html'))
    .pipe(headerfooter.footer('./source/layouts/code-footer.html'))
    .pipe(gulp.dest('.tmp/code/'));
});

gulp.task('prepareMd', function () {
  gulp.src(md)
    .pipe(markdown())
    .pipe(headerfooter.header('./source/layouts/doc-header.html'))
    .pipe(headerfooter.footer('./source/layouts/doc-footer.html'))
    .pipe(gulp.dest('.tmp/docs/'));
});

gulp.task('clean', function() {
  return gulp.src(['_site', '.tmp'], {read: false})
    .pipe(clean());
});

gulp.task('docs', ['prepareCode', 'prepareMd'], function() {
  setTimeout(function() {
    for(var i = 0; i < config.length; i++) {
      var obj = config[i];

      console.log("Building " + obj.slug + "...");
      buildLanguage(obj);
    }

  }, 1000);
  //
  // Hacky alert: This timeout is needed for the code files to be read from /tmp
  //
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
  var filter = gulpFilter(['*.html', '!*.*.html', '*.' + language.extname + '.html', 'example.' + language.extname]);
  return gulp.src(chapters)
    .pipe(filter)
    .pipe(concat('index.html'))
    .pipe(headerfooter.header('./source/layouts/header.html'))
    .pipe(headerfooter.footer('./source/layouts/footer.html'))
    .pipe(gulp.dest('./_site/' + language.slug))
    .pipe(connect.reload());
}
