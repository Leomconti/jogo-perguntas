import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    const { method, originalUrl, body, params, query } = req
    const { statusCode } = res

    logger.info('Request logged', {
      method,
      url: originalUrl,
      params,
      query,
      body,
      statusCode,
      duration: `${duration}ms`
    })
  })

  next()
}
