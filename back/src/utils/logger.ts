import winston from 'winston'

const { combine, timestamp, printf, colorize } = winston.format

const consoleFormat = combine(
  colorize({ all: true }),
  timestamp(),
  printf((info) => {
    const { timestamp, level, message, ...args } = info
    const ts = timestamp.slice(0, 19).replace('T', ' ')
    return `${ts} [${level}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
    }`
  })
)

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: consoleFormat
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
