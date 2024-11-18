import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import bcrypt from 'bcryptjs'
import { db } from '../db'
import { users } from '../db/schema/users'
import { eq } from 'drizzle-orm'
import { AppError } from '../utils/errorHandler'
import { env } from '../env'

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await db.query.users.findFirst({
          where: eq(users.email, email)
        })

        if (!user) {
          return done(new AppError('Email ou senha incorreta.', 401), false)
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
          return done(new AppError('Email ou senha incorreta.', 401))
        }

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        const user = await db.query.users.findFirst({
          where: eq(users.id, jwtPayload.id)
        })

        if (!user) {
          return done(new AppError('Token inválido.', 401), false)
        }

        return done(null, user)
      } catch (err) {
        const error = err as Error
        return done(new AppError(error.message, 500))
      }
    }
  )
)

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id)
    })
    done(null, user)
  } catch (err) {
    const error = err as Error
    done(new AppError(error.message, 500))
  }
})

export default passport
