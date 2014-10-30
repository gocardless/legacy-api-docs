var path = require('path');
var gutil = require('gulp-util');
var _ = require('lodash');
var through = require('through2');
var swig = require('swig');
var frontMatter = require('front-matter');

module.exports = function (options) {
  options = _.extend({
    templateDir: '',
    locals: {}
  }, options);

  swig.setDefaults({
    loader: swig.loaders.fs(path.join(process.cwd(), options.templateDir)),
    locals: options.locals
  });

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-swig-template', 'Streaming not supported'));
      return;
    }

    var content = file.contents.toString();

    try {
      var frontMatterData;
      try {
        frontMatterData = frontMatter(content || '');
      } catch (e) {
        frontMatterData = { body: content, attributes: {} };
      }
      var body = frontMatterData.body;
      var locals = _.extend({}, options.locals, frontMatterData.attributes);

      file.contents = new Buffer(swig.render(content, { locals: locals }));
      cb(null, file);
    } catch (err) {
      cb(new gutil.PluginError('gulp-swig-template', err, {
        fileName: file.path
      }));
    }
  });
};
