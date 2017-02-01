/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 31-Jan-2017  
 *     Logger file added
 */

'use strict';

const winston = require('winston');
var path = require('path');
var PROJECT_ROOT = path.join(__dirname, '..');

const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = PROJECT_ROOT + '/log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = new (winston.Logger)({
	transports: [
		// colorize the output to the console
		new (winston.transports.Console)({
			timestamp: tsFormat,
			colorize: true,
			level: 'debug'
		}),
		new (require('winston-daily-rotate-file'))({
			filename: `${logDir}/-results.log`,
			timestamp: tsFormat,
			datePattern: 'yyyy-MM-dd',
			prepend: true,
			level: env === 'development' ? 'verbose' : 'info'
		})
	]
});

function getLine(offset) {
  var stack = new Error().stack.split('\n'),
      line = stack[(offset || 1) + 1].split(':');
  return parseInt(line[line.length - 2], 10);
}

global.__defineGetter__('__line', function () {
  return getLine(2);
});


logger.debug(__filename, __line, 'Debugging info');
/*logger.verbose('Verbose info');
logger.info('Hello world');
logger.warn('Warning message');
logger.error('Error info');*/

module.exports = logger;

