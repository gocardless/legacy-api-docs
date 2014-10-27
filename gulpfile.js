// Plugins
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var concat = require('gulp-concat');
var del = require('del');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var sourcemaps = require('gulp-sourcemaps');
var gulpFilter = require('gulp-filter');
var headerfooter = require('gulp-headerfooter');
var cheerio = require('gulp-cheerio');
var angularTemplate = require('./tasks/gulp-angular-template');
var globule = require('globule');

// Languages configuration
var languages     = require('./data/languages');

// Docs directories
var mdFilepaths = globule.find('source/docs/**/*.md')
var codeFilepaths = globule.find('source/docs/**/z_code/*.*')

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
]

// Gulp tasks
gulp.task('default', ['make']);

gulp.task('images', function () {
  return gulp.src('source/images/**')
    .pipe(gulp.dest('./_site/images/'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('./source/stylesheets/all.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(concat('all.css'))
      .pipe(minifyCss())
    .pipe(sourcemaps.write('./'))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('_site/stylesheets/'))
    .pipe(connect.reload());
});

gulp.task('font', function () {
  gulp.src('./source/stylesheets/fonts/*.css')
    .pipe(concat('font.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('_site/stylesheets/'))
    .pipe(connect.reload());
});

gulp.task('javascript', function () {
  var jsFilter = gulpFilter(['**/*.js']);
  var htmlFilter = gulpFilter(['**/*.html']);
  gulp.src(scripts)
    .pipe(sourcemaps.init())
      .pipe(htmlFilter)
        .pipe(angularTemplate({ stripPrefix: 'source/javascripts/' }))
      .pipe(htmlFilter.restore())
      .pipe(jsFilter) // defensive step in case html files don't get converted
        .pipe(concat('all.js'))
        //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('_site/javascripts/'))
    .pipe(connect.reload());
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
      .pipe(headerfooter.header('./source/layouts/header.html'))
      .pipe(headerfooter.footer('./source/layouts/footer.html'))
      .pipe(gulp.dest('_site/' + language.slug))
      .pipe(connect.reload());
  });
});

gulp.task('clean', function(cb) {
  del([
    '_site',
  ], cb);
});

gulp.task('server', function () {
  connect.server({
    root: ['_site'],
    port: 9000,
    livereload: true
  });
});

gulp.task('make', ['docs', 'images', 'sass', 'font', 'javascript'], function () {
});

gulp.task('watch', ['make', 'server'], function () {
  gulp.watch(['source/docs/**', 'source/layouts/**'], ['docs']);
  gulp.watch(['source/images/**'], ['images']);
  gulp.watch(['source/stylesheets/**',], ['sass']);
  connect.reload();
});
