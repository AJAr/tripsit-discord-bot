'use strict';

const path = require('path');
const winston = require('winston');
const { NODE_ENV, LOG_PATH } = require('../env');

module.exports = function createLogger() {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'TripBot Discord' },
    transports: [
      new winston.transports.File({
        filename: path.join(LOG_PATH, 'bot.log'),
      }),
    ],
  });

  if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  return logger;
};
