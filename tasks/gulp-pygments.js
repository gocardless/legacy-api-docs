var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var pygments = require('pygmentize-bundled');

module.exports = function () {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-pygments', 'Streaming not supported'));
      return;
    }

    var content = file.contents.toString();
    var suffix = path.extname(file.path).replace('.','')
    var langs = {
      cs: 'csharp',
      http: 'http',
      java: 'java',
      js: 'js',
      php: 'php',
      py: 'py',
      rb: 'ruby' //rb also fine
    }

    try {
      pygments({
      	lang: langs[suffix],
      	format: 'html'
      },
      	content,
      	function (err, result) {
          file.contents = result;
          cb(err, file);
        }
      );
    } catch (err) {
      cb(new gutil.PluginError('gulp-pygments', err, {
        fileName: file.path
      }));
    }
  });
};
