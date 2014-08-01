'use strict';
var run = require('./run');
var assert = require('assert');
describe('dev-no-output', function () {
  it('outputs nothing', function (done) {
    run(function (err, stdout, stderr) {
      assert(!err);
      assert.equal('', stdout);
      assert.equal('', stderr);
      done()
    });
  });
});
