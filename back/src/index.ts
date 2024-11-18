import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env') })
import { env } from './env'
import express from 'express'
import session from 'express-session'
import passport from './config/passport'
import { errorHandler } from './utils/errorHandler'
import { authMiddleware } from './middleware/authMiddleware'
import moduleRoutes from './modules'
import { logger } from './utils/logger'
import { requestLogger } from './middleware/requestLogger'

const app = express()

app.use(
  express.json({
    verify: (req: any, _: express.Response, buf: Buffer) => {
      req.rawBody = buf.toString()
    }
  })
)
app.use(requestLogger)

app.use(
  session({
    secret: env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(authMiddleware)

app.use(moduleRoutes)
app.use(errorHandler)

const PORT = env.PORT || 3333
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
