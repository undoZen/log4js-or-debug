'use strict';
var run = require('./run');
var assert = require('assert');
var extend = require('extend');
var u = require('./utils');
describe('dev-output-hello-world', function () {
  it('output hello world', function (done) {
    run({env: extend({DEBUG: 'hello,world'}, process.env)}, function (err, stdout, stderr) {
      assert(!err);
      var stdoutLines = stdout.trim().split('\n');
      var stderrLines = stderr.trim().split('\n');
      assert.equal(10, stdoutLines.length);
      assert.equal(10, stdoutLines.filter(u.hasSubString('GMT')).length);
      assert.equal(5, stdoutLines.filter(u.hasSubString('hello')).length);
      assert.equal(5, stdoutLines.filter(u.hasSubString('hello')).length);
      assert.equal(6, stdoutLines.filter(u.hasSubString('ddd')).length);
      assert.equal(2, stderrLines.filter(u.hasSubString('Trace:')).length);
      done()
    });
  });
});
