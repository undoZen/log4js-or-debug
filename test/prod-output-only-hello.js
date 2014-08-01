'use strict';
var run = require('./run');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var assert = require('assert');
var extend = require('extend');
var u = require('./utils');
describe('prod-output-only-hello', function () {
  var tmpDir = path.resolve(__dirname, '..', 'tmp');
  before(function () {
    rimraf.sync(tmpDir);
    fs.mkdirSync(tmpDir);
  });
  it('output only hello', function (done) {
    run({env: extend({NODE_ENV: 'production', DEBUG: 'hello'}, process.env)}, function (err, stdout, stderr) {
      assert(!err);
      var helloOutput = fs.readFileSync(path.join(tmpDir, 'hello.log')).toString('utf-8');
      var worldOutput = fs.readFileSync(path.join(tmpDir, 'world.log'));
      var helloOutputLines = helloOutput.trim().split('\n');
      assert.strictEqual(0, worldOutput.length);
      assert.equal(6, helloOutputLines.length);
      assert.equal(3, helloOutputLines.filter(u.hasSubString('ddd')).length);
      assert.equal(6, helloOutputLines.filter(u.hasSubString('hello')).length);
      assert.equal(1, helloOutputLines.filter(u.hasSubString('TRACE')).length);
      assert.equal(1, helloOutputLines.filter(u.hasSubString('DEBUG')).length);
      done()
    });
  });
});
