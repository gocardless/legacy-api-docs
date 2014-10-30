var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var highlight = require('highlight.js');

module.exports = function () {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-highlight', 'Streaming not supported'));
      return;
    }

    var content = file.contents.toString();
    var suffix = path.extname(file.path).replace('.', '');
    var langs = {
      cs: 'csharp',
      http: 'http',
      java: 'java',
      js: 'js',
      php: 'php',
      py: 'python',
      rb: 'ruby' //rb also fine
    };
    var language = langs[suffix];

    if (!language) {
      cb(new gutil.PluginError('gulp-highlight', 'no language found for ext: ' + suffix, {
        fileName: file.path
      }));
    }

    try {
      var result = highlight.highlight(language, content).value;
      var wrapped = '<pre><code class="hljs language-' +
        language +
        '">' +
        result +
        '\n</code></pre>\n';
      file.contents = new Buffer(wrapped);
      cb(null, file);
    } catch (err) {
      cb(new gutil.PluginError('gulp-highlight', err, {
        fileName: file.path
      }));
    }
  });
};
