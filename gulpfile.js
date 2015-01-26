// Plugins
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cheerio = require('gulp-cheerio');
var concat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var headerfooter = require('gulp-headerfooter');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var markdown = require('gulp-markdown');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var angularTemplate = require('./tasks/gulp-angular-template');
var gulpHighlight = require('./tasks/gulp-highlight');
var gulpSort = require('./tasks/gulp-sort');

var del = require('del');
var glob = require('glob');
var browserSync = require('browser-sync');
var highlight = require('highlight.js');
var marked = require('marked');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var swig = require('swig');

var dest = process.env.OUTPUT || "_site";

var isProduction = process.env.NODE_ENV === 'production';

// Languages configuration
var languages = require('./data/languages');

// Docs directories
var mdFilepaths = glob.sync('source/docs/**/*.md')
var codeFilepaths = glob.sync('source/docs/**/z_code/example.*')
var docsFilepaths = mdFilepaths.concat(codeFilepaths).sort();

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
gulp.task('default', ['build']);

gulp.task('images', function () {
  return gulp.src('source/images/**')
    .pipe(gulp.dest(dest + '/images/'));
});

gulp.task('css', function () {
  return gulp.src('./source/stylesheets/all.scss')
    .pipe(gulpif(isProduction, sourcemaps.init()))
      .pipe(sass())
      .pipe(concat('all.css'))
      .pipe(gulpif(isProduction, minifyCss()))
    .pipe(gulpif(isProduction, sourcemaps.write('./')))
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    .pipe(gulp.dest(dest + '/stylesheets/'));
});

gulp.task('font', function () {
  return gulp.src('./source/fonts/*')
    .pipe(gulp.dest(dest + '/fonts/'));
});

gulp.task('hyper-schema', function() {
  return gulp.src('./source/hyper-schema.json')
    .pipe(gulp.dest(dest))
});

gulp.task('javascript', function () {
  var htmlFilter = gulpFilter(['**/*.html']);
  return gulp.src(scripts)
    .pipe(gulpif(isProduction, sourcemaps.init()))
      .pipe(htmlFilter)
        .pipe(angularTemplate({ stripPrefix: 'source/javascripts/' }))
      .pipe(htmlFilter.restore())
      .pipe(concat('all.js'))
      .pipe(gulpif(isProduction, uglify({
        mangle: false,
        screwIe8: true
      })))
    .pipe(gulpif(isProduction, sourcemaps.write('./')))
    .pipe(gulp.dest(dest + '/javascripts/'));
});

gulp.task('docs', function () {
  var mdFilter = gulpFilter(['**/*.md']);
  var codeFilter = gulpFilter(['**/*.*', '!*.html', '!*.md']);

  var containContent = function ($) {
    $('.content-container__description').each(function () {
      var $desc = $(this);
      var $descClone = $desc.clone();
      var $wrapper = $('<article class="content content-container"></article>');
      $desc.before($wrapper);
      $desc.remove();
      var $code = $desc.next();
      var $codeClone;

      if ($code.hasClass('content-container__code')) {
        $codeClone = $code.clone();
        $code.remove();
      } else {
        $codeClone = '<div class="content-container__code"></div>';
      }

      $wrapper.append($descClone, $codeClone);
    });
  }

  var renderer = new marked.Renderer();

  function escape(html, encode) {
    return html
      .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function parseDls(text) {
    return text.replace(
      /(^|\n\n+)(\S.+)(\n\:(\s{4,}|\t))(\S.+)/g,
      '\n\n' +
      '<dl>' +
      '<dt><p>$2</p></dt>' +
      '<dd><p>$5</p></dd>' +
      '</dl>' +
      '\n\n');
  }

  renderer.code = function (code, lang, escaped) {
    var out;
    if (lang) {
      out = highlight.highlight(lang, code).value;
    }

    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }

    if (!lang) {
      return '<pre><code class="hljs">'
        + (escaped ? code : escape(code, true))
        + '\n</code></pre>';
    }

    return '<pre><code class="hljs language-' + lang + '">'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>\n';
  };

  renderer.paragraph = function (text) {
    var dlText = parseDls(text)

    if (text != dlText) {
      return dlText;
    } else {
      return '<p>' + text + '</p>\n';
    }
  };

  renderer.html = parseDls;

  var preppedStream = gulp.src(docsFilepaths)
    .pipe(mdFilter)
      .pipe(markdown({
        renderer: renderer
      }))
      .pipe(headerfooter.header('./source/layouts/doc-header.html'))
      .pipe(headerfooter.footer('./source/layouts/doc-footer.html'))
    .pipe(mdFilter.restore())
    .pipe(codeFilter)
      .pipe(gulpHighlight())
      .pipe(headerfooter.header('./source/layouts/code-header.html'))
      .pipe(headerfooter.footer('./source/layouts/code-footer.html'))
    .pipe(codeFilter.restore())
    .pipe(gulpSort());

  return languages.reduce(function(__prev, language) {
    console.log('building ' + language.slug);
    var headerPartial = swig.renderFile('./source/layouts/header.html', {
      languages: languages,
      currentLanguage: language
    });

    var langFilter = gulpFilter([
      '*.html',
      '!*.*.html',                        // Get rid of ALL language-specific articles
      '*.' + language.extname + '.html',  // Get articles specific to THIS language
      'example.' + language.extname       // Code files for this language
    ]);

    var langStream = preppedStream;
    return langStream.pipe(langFilter)
      .pipe(concat('index.html'))
      .pipe(cheerio({ run: containContent }))
      .pipe(headerfooter.header(new Buffer(headerPartial)))
      .pipe(headerfooter.footer('./source/layouts/footer.html'))
      .pipe(gulp.dest(dest + '/' + language.slug))
        .pipe(gulpif(language.slug == 'http', gulp.dest(dest + '/')));
  // pass in 0 as previous element for arrayReduce,
  //   so it still works for arrays of length 1
  },0);
});

gulp.task('clean', function(cb) {
  return del([dest], cb);
});

gulp.task('build', ['clean'], function(cb) {
  return runSequence(['docs', 'images', 'hyper-schema', 'css', 'font', 'javascript'], cb);
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

  gulp.watch(docsFilepaths.concat('source/layouts/*.html'), ['docs', reload]);
  gulp.watch(['source/images/**/*.jpg', 'source/images/**/*.jpeg', 'source/images/**/*.png', 'source/images/**/*.gif'], ['images', reload]);
  gulp.watch(['source/stylesheets/**/*.scss'], ['css', reload]);
  gulp.watch(['source/javascripts/**/*.js', 'source/javascripts/**/*.html'], ['javascript', reload]);
});
