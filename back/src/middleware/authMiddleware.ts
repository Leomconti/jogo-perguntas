import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { SelectUser } from '../db/schema'
import { AppError } from '../utils/errorHandler'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.path === '/signUp' ||
    req.path === '/signIn' ||
    req.path === '/payments/webhook'
  ) {
    return next()
  }

  passport.authenticate(
    'jwt',
    { session: false },
    (info: any, user: SelectUser, error: Error) => {
      if (error) {
        return next(new AppError('Não autorizado', 401))
      }

      req.user = user

      next()
    }
  )(req, res, next)
}
