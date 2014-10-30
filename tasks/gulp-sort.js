var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var stable = require('stable');

module.exports = function () {
  var files = [];

  function onFile(file, enc, cb) {
    files.push(file);
    cb(null);
  }

  function onEnd(cb) {
    var self = this;

    stable.inplace(files, function(a, b) {
      return String(a.path).localeCompare(b.path);
    });

    files.forEach(function(file) {
      self.push(file);
    });
    cb();
  }

  return through.obj(onFile, onEnd);
};
