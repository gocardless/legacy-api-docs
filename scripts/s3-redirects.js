#!/usr/bin/env node

'use strict';

var util = require('util');
var path = require('path');
var crypto = require('crypto');
var mime = require('mime');

var AWS = require('aws-sdk');

var _ = require('lodash');
var argv = require('minimist')(process.argv.slice(2));

var MSG = {
  UPLOAD_SUCCESS: 'Uploaded: %s/%s',
  ERR_UPLOAD: 'Upload error: %s (%s)'
};

function log() {
  console.log.apply(console, arguments);
}

var options = {
  bucket: argv.bucket,
  region: argv.r || argv.region || 'us-west-1',
  redirects: argv.redirects
};

process.stdout.on('error', process.exit);

function errorExit(err) {
  if (err.stack) {
    console.error(err.stack);
  }
  else {
    console.error(String(err));
  }
  process.exit(1);
}

if (!_.isString(options.redirects)) {
  errorExit('No --redirects file');
}

var redirects = require(path.join(process.cwd(), options.redirects));

function redirectDest(dest) {
  dest = dest.replace(/^\/|\/$|\/index\.html$/g, '');
  dest = dest + '/index.html';

  return dest;
}

function testTmpl(target) {
  return '<!doctype html>' +
    '<html>' +
    '<meta charset="utf-8">' +
    '<meta http-equiv="refresh" content="0;url=' + target + '">' +
    '</html>';
}

function File(options) {
  this.path = options.path;
  this.contents = options.contents;
  if (typeof this.contents === 'string') {
    this.contents = new Buffer(this.contents);
  }
}

function contentType(src) {
  var type = mime.lookup(src).replace('-', '');
  var charset = mime.charsets.lookup(type, null);

  if (charset) {
    type += '; charset=' + charset;
  }

  return type;
}

function base64MD5(data) {
  return crypto.createHash('md5').update(data).digest('base64');
}

function upload(client, file, options) {
  var params = _.extend({
    ACL : 'public-read',
    ContentMD5 : base64MD5(file.contents),
    Body : file.contents,
    ContentType: contentType(file.path),
    CacheControl: 'max-age=0, no-cache'
  }, options);

  // Upload the file to s3.
  client.putObject(params, function(err){
    if (err) {
      log(MSG.ERR_UPLOAD, err, err.stack);
    }

    log(util.format(MSG.UPLOAD_SUCCESS, params.Bucket, params.Key));
  });
}

function redirect(redirects, AWSOptions, s3Options) {
  if (!_.isObject(redirects)) {
    errorExit('--redirects file not an object');
  }
  AWSOptions = _.clone(AWSOptions, true);
  s3Options = _.clone(s3Options, true);

  AWS.config.update(_.extend({
    sslEnabled: true,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }, AWSOptions));

  var client = new AWS.S3();

  Object.keys(redirects).forEach(function(redirect) {
    var key = redirectDest(redirect);
    var target = redirects[redirect];

    var file = new File({
      contents: testTmpl(target),
      path: key
    });

    log('!!! Redirecting:', key, 'to:', target);

    upload(client, file, _.extend(s3Options, {
      Key: key,
      WebsiteRedirectLocation: target
    }));
  });
}

redirect(redirects, {
  region:  options.region
}, {
  Bucket:  options.bucket,
});
