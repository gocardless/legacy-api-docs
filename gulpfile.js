// Plugins
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var concat = require('gulp-concat');
var del = require('del');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var sourcemaps = require('gulp-sourcemaps');
var gulpFilter = require('gulp-filter');
var headerfooter = require('gulp-headerfooter');
var cheerio = require('gulp-cheerio');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var angularTemplate = require('./tasks/gulp-angular-template');
var glob = require('glob');
var fs = require('fs');
var swig = require('swig');

// Languages configuration
var languages = require('./data/languages');

// Docs directories
var mdFilepaths = glob.sync('source/docs/**/*.md')
var codeFilepaths = glob.sync('source/docs/**/z_code/*.*')

var scripts = [
  'source/javascripts/libs/angular.js',
  'source/javascripts/libs/angular-touch.js',
  'source/javascripts/libs/lodash.js',

  'source/javascripts/config/*',
  'source/javascripts/nav-toggle/*',
  'source/javascripts/scroll-spy/*',
  'source/javascripts/toc-nav/*',
  'source/javascripts/close-when-outside/*',
  'source/javascripts/on-click-anchor/*',

  'source/javascripts/docs.js',
];

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Gulp tasks
gulp.task('default', ['make']);

gulp.task('images', function () {
  return gulp.src('source/images/**')
    .pipe(gulp.dest('./_site/images/'));
});

gulp.task('css', function () {
  return gulp.src('./source/stylesheets/all.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(concat('all.css'))
      .pipe(minifyCss())
    .pipe(sourcemaps.write('./'))
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    .pipe(gulp.dest('_site/stylesheets/'));
});

gulp.task('font', function () {
  return gulp.src('./source/stylesheets/fonts/*.css')
    .pipe(concat('font.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('_site/stylesheets/'));
});

gulp.task('javascript', function () {
  var jsFilter = gulpFilter(['**/*.js']);
  var htmlFilter = gulpFilter(['**/*.html']);
  return gulp.src(scripts)
    .pipe(sourcemaps.init())
      .pipe(htmlFilter)
        .pipe(angularTemplate({ stripPrefix: 'source/javascripts/' }))
      .pipe(htmlFilter.restore())
      .pipe(jsFilter) // defensive step in case html files don't get converted
        .pipe(concat('all.js'))
        //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('_site/javascripts/'));
});

gulp.task('docs', function () {
  //console.log(mdFilepaths.concat(codeFilepaths).sort());
  var mdFilter = gulpFilter(['**/*.md']);
  var codeFilter = gulpFilter(['**/*.*', '!*.html', '!*.md']);

  var containContent = function ($) {
    $('.content-container__description').each(function () {
      if ($(this).next().hasClass('content-container__code')) {
        $(this).next().after('<article class="content content-container"></article>');
      }else{
        // Add empty code container
        $(this).after('<div class="content-container__code"><div class="content__code">&nbsp;</div></div><article class="content content-container"></article>');
      };
    });
  }

  var preppedStream = gulp.src(mdFilepaths.concat(codeFilepaths).sort())
    .pipe(mdFilter)
      .pipe(markdown())
      .pipe(headerfooter.header('./source/layouts/doc-header.html'))
      .pipe(headerfooter.footer('./source/layouts/doc-footer.html'))
    .pipe(mdFilter.restore())
    .pipe(codeFilter)
      .pipe(headerfooter.header('./source/layouts/code-header.html'))
      .pipe(headerfooter.footer('./source/layouts/code-footer.html'))
    .pipe(codeFilter.restore());

  var headerPartial = swig.renderFile('./source/layouts/header.html', {
    languages: languages
  });

  languages.forEach(function(language) {
    var langFilter = gulpFilter([
      '*.html',
      '!*.*.html',                        // Get rid of ALL language-specific articles
      '*.' + language.extname + '.html',  // Get articles specific to THIS language
      'example.' + language.extname       // Code files for this language
    ]);

    var langStream = preppedStream;
    langStream
    .pipe(langFilter)
      .pipe(concat('index.html'))
      .pipe(cheerio({ run: containContent }))
      .pipe(headerfooter.header(new Buffer(headerPartial)))
      .pipe(headerfooter.footer('./source/layouts/footer.html'))
      .pipe(gulp.dest('_site/' + language.slug));
  });
});

gulp.task('clean', function(cb) {
  del(['_site'], cb);
});

gulp.task('build', ['clean'], function(cb) {
  runSequence(['docs', 'images', 'css', 'font', 'javascript'], cb);
});

gulp.task('start', ['build'], function () {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    port: 9000,
    server: {
      baseDir: '_site'
    }
  });

  gulp.watch(['source/docs/**', 'source/layouts/**'], ['docs', reload]);
  gulp.watch(['source/images/**'], ['images', reload]);
  gulp.watch(['source/stylesheets/**'], ['css', reload]);
  gulp.watch(['source/javascripts/**'], ['javascript', reload]);
});
