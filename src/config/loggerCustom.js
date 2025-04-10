import winston from 'winston';

const customLevelsOptions = {
  levels: {
    fatal: 0,
    warning: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    fatal: 'red',
    warning: 'yellow',
    http: 'green',
    info: 'blue',
    debug: 'white',
  }
};

winston.addColors(customLevelsOptions.colors);

// Console formatter that includes colorization.
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.printf(info => `${info.message}`)
);

export const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: consoleFormat
    }),
  ]
});
