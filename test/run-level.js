'use strict';
var path = require('path');
var execFile = require('child_process').execFile;
module.exports = execFile.bind(null, process.execPath, [path.resolve(__dirname, 'output-level.js')]);
