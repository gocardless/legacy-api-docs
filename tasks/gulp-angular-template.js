var path = require('path');
var gutil = require('gulp-util');
var _ = require('lodash');
var through = require('through2');

var generateAngularTemplate = require('generate-angular-template');

module.exports = function (options) {
  options = _.extend({
    prependPrefix: '',
    stripPrefix: ''
  }, options);

  var stripPrefix = new RegExp('^' + options.stripPrefix);
  var prependPrefix = options.prependPrefix;
  var cacheIdFromPath = options.cacheIdFromPath || function (filePath) {
    return prependPrefix + filePath.replace(stripPrefix, '');
  };

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-angular-template', 'Streaming not supported'));
      return;
    }

    var content = file.contents.toString();
    var filePath = file.path;
    filePath = filePath.replace(process.cwd() + path.sep, '');

    try {
      file.contents = new Buffer(generateAngularTemplate({
        moduleName: options.moduleName,
        htmlPath: cacheIdFromPath(filePath),
        content: content
      }));
      file.path = gutil.replaceExtension(file.path, '.js');
      cb(null, file);
    } catch (err) {
      cb(new gutil.PluginError('gulp-angular-template', err, {
        fileName: file.path
      }));
    }
  });
};
