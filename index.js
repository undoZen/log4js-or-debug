'use strict';
var env = process.env.NODE_ENV || 'development';
var debugFactory = require('debug');

module.exports = function(namespace) {
  if ('production' === env) {
    var debug = debugFactory(namespace);
    process.env.DEBUG_COLORS = 'no'; //make sure debug formatter not add color characters for tty
    debugFactory.formatArgs = false; //turn of debug prepended time and namespace
    var logger = require('log4js').getLogger(namespace);
    debug.log = logger.debug.bind(logger);
    'trace debug info warn error fatal'.split(' ').forEach(function (m) {
      debug[m] = function () { // debug 无法为每次调用指定 logger，只能做这样的一个 wrapper 在输出前后换一下
        debug.log = logger[m].bind(logger);
        debug.apply(null, arguments);
        debug.log = logger.debug.bind(logger);
      };
    });
    return debug;
  } else {
    var debug = debugFactory(namespace);
    debug.log = console.log.bind(console);
    debug.trace = function () { // trace 用 console.trace, 可以打出 stack，非常方便
      debug.log = console.trace.bind(console);
      debug.apply(null, arguments);
      debug.log = console.log.bind(console);
    };
    'info warn error fatal'.split(' ').forEach(function (m) {
      debug[m] = function () {
        var args = Array.prototype.slice.call(arguments);
        args[0] = debugFactory.coerce(args[0]);

        if ('string' === typeof args[0]) {
          args[0] = m + ': ' + args[0];
        } else {
          args = [m + ': %o'].concat(args);
        }
        debug.apply(null, args);
      };
    });
  }
  return debug;
}
