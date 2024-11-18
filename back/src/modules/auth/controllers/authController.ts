import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { signUpDTO } from '../dtos/signUp.dto'
import { AppError } from '../../../utils/errorHandler'
import { db } from '../../../db'
import { SelectUser, users } from '../../../db/schema'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { env } from '../../../env'
import { eq } from 'drizzle-orm'
import { v4 } from 'uuid'
import { stripe } from '../../../services/stripe'

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, password } = signUpDTO.parse(req.body)

    const userAlreadyExist = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (userAlreadyExist) {
      throw new AppError('Usuário já cadastrado', 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userId = v4()

    const customer = await stripe.customers.create({
      email: email,
      name,
      metadata: {
        userId
      }
    })

    const [{ password: _, ...createdUser }] = await db
      .insert(users)
      .values({
        id: userId,
        email,
        name,
        password: hashedPassword,
        customerId: customer.id
      })
      .returning()
    res.status(201).json(createdUser)
  } catch (e) {
    next(e)
  }
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: AppError, user: SelectUser, info: any) => {
      if (err || !user) {
        return next(err)
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          return next(err)
        }

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          },
          env.JWT_SECRET,
          {
            expiresIn: env.JWT_EXPIRES_IN
          }
        )
        return res.json({ access_token: token })
      })
    }
  )(req, res)
}
