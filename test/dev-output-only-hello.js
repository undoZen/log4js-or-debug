'use strict';
var run = require('./run');
var assert = require('assert');
var extend = require('extend');
var u = require('./utils');
describe('dev-output-only-hello', function () {
  it('output only hello', function (done) {
    run({env: extend({DEBUG: 'hello'}, process.env)}, function (err, stdout, stderr) {
      assert(!err);
      var stdoutLines = stdout.trim().split('\n');
      assert.equal(5, stdoutLines.length);
      assert.equal(5, stdoutLines.filter(u.hasSubString('GMT')).length);
      assert.equal(5, stdoutLines.filter(u.hasSubString('hello')).length);
      assert.equal(3, stdoutLines.filter(u.hasSubString('ddd')).length);
      assert.strictEqual(0, stderr.indexOf('Trace:'));
      assert(stderr.indexOf('GMT') > -1);
      done()
    });
  });
});
