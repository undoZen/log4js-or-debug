var env = process.env.NODE_ENV || 'development';
module.exports = function (scope) {
  var log;
  if ('production' === env) {
    var logger = require('log4js').getLogger();
    log = logger.trace.bind(logger);
    'debug info warn error fatal'.forEach(function (m) {
      log[m] = logger[m].bind(logger);
    });
  } else {
    debug = require('debug')(scope);
    log = function (s) {
      var args = Array.prototype.slice.call(arguments, 1);
      args.unshift('trace: ' + s);
      return debug.apply(null, args);
    };
    log.trace = log;
    'debug info warn error fatal'.forEach(function (m) {
      log[m] = function (s) {
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift(m + ': ' + s);
        return debug.apply(null, args);
      };
    });
  }
}
