const winston = require('winston');
const options = {
    transports: [
        new winston.transports.File({
          filename: 'logs/info.log',
          level: 'info',
          colorsize: false,
          maxsize: 5242880,
          maxFiles: 5
        }),
        new winston.transports.File({
          filename: 'logs/errors.log',
          level: 'error',
          colorsize: false,
          maxsize: 5242880,
          maxFiles: 5
        }),
        new winston.transports.Console({
            level: 'info',
            colorsize: false
          }),
          new winston.transports.Console({
            level: 'error',
            colorsize: false
          })
      ]
}

export const logger = winston.createLogger(options);