'use strict';
var run = require('./run-level');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var assert = require('assert');
var extend = require('extend');
var u = require('./utils');
describe('prod-output-hello-world-level', function () {
  var tmpDir = path.resolve(__dirname, '..', 'tmp');
  before(function () {
    rimraf.sync(tmpDir);
    fs.mkdirSync(tmpDir);
  });
  it('output hello world and lever gte info', function (done) {
    run({env: extend({NODE_ENV: 'production', DEBUG: 'hello,world'}, process.env)}, function (err, stdout, stderr) {
      assert(!err);
      var helloOutput = fs.readFileSync(path.join(tmpDir, 'hello.log')).toString('utf-8');
      var worldOutput = fs.readFileSync(path.join(tmpDir, 'world.log')).toString('utf-8');
      var helloOutputLines = helloOutput.trim().split('\n');
      var worldOutputLines = worldOutput.trim().split('\n');
      assert.equal(2, worldOutputLines.length);
      assert.equal(1, worldOutputLines.filter(u.hasSubString('ddd')).length);
      assert.equal(2, worldOutputLines.filter(u.hasSubString('world')).length);
      assert.equal(0, worldOutputLines.filter(u.hasSubString('TRACE')).length);
      assert.equal(0, worldOutputLines.filter(u.hasSubString('DEBUG')).length);
      assert.equal(0, worldOutputLines.filter(u.hasSubString('INFO')).length);
      assert.equal(4, helloOutputLines.length);
      assert.equal(2, helloOutputLines.filter(u.hasSubString('ddd')).length);
      assert.equal(4, helloOutputLines.filter(u.hasSubString('hello')).length);
      assert.equal(0, helloOutputLines.filter(u.hasSubString('TRACE')).length);
      assert.equal(0, helloOutputLines.filter(u.hasSubString('DEBUG')).length);
      done()
    });
  });
});
