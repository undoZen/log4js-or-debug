'use strict';

var path = require('path');

var log4js = require('log4js');
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(path.resolve(__dirname, '../tmp/hello.log')), 'hello');
log4js.addAppender(log4js.appenders.file(path.resolve(__dirname, '../tmp/world.log')), 'world');

require('./hello');
require('./world');
