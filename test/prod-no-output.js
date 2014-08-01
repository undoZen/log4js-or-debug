'use strict';
var fs = require('fs');
var path = require('path');
var run = require('./run');
var rimraf = require('rimraf');
var assert = require('assert');
var extend = require('extend');
describe('prod-no-output', function () {
  var tmpDir = path.resolve(__dirname, '..', 'tmp');
  before(function () {
    rimraf.sync(tmpDir);
    fs.mkdirSync(tmpDir);
  });
  it('outputs nothing', function (done) {
    run({env: extend({NODE_ENV: 'production'}, process.env)}, function (err, stdout, stderr) {
      assert(!err);
      assert(!fs.readFileSync(path.join(tmpDir, 'hello.log')).length);
      assert(!fs.readFileSync(path.join(tmpDir, 'world.log')).length);
      done()
    });
  });
});
