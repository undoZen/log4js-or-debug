'use strict';

var path = require('path');

var log4js = require('log4js');
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(path.resolve(__dirname, '../tmp/hello.log')), 'hello');
log4js.addAppender(log4js.appenders.file(path.resolve(__dirname, '../tmp/world.log')), 'world');
log4js.getLogger('hello').setLevel('INFO');
log4js.getLogger('world').setLevel('WARN');

require('./hello');
require('./world');
