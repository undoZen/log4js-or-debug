'use strict';

var debug = require('../')('world');
debug.trace({w:1,o:2});
debug('ddd: %j', {w:1,o:2});
debug.info({w:1,o:2});
debug.info('ddd: %j', {w:1,o:2});
debug.warn({l:3,d:4});
debug.warn('ddd: %j', {l:3,d:4});
