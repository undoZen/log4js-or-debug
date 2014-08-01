log4js-or-debug
===============

use tj's debug in development and log4js in production

##Installation

    npm install log4js-or-debug

##Usage

This module could be used as a drop-in replacement of tj's debug module. Wherever you use `require('debug')('namespace');` you can replace it with `require('log4js-or-debug')`. But you should define a category named as the same as the namespace you give debug module.

You can refer to [test/output.js](https://github.com/undoZen/log4js-or-debug/blob/master/test/output.js) and [test/output-level.js](https://github.com/undoZen/log4js-or-debug/blob/master/test/output-level.js) as examples:

    var path = require('path');
    var log4js = require('log4js');
    log4js.loadAppender('file');
    log4js.addAppender(log4js.appenders.file(path.resolve(__dirname, '../tmp/hello.log')), 'hello');
    var debug = require('log4js-or-debug')('hello');

##Lisence
MIT
