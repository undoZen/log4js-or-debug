'use strict';

var debug = require('../')('hello');
debug.trace({a:1,b:2});
debug('ddd: %j', {a:1,b:2});
debug.info({a:1,b:2});
debug.info('ddd: %j', {a:1,b:2});
debug.warn({c:3,d:4});
debug.warn('ddd: %j', {c:3,d:4});
