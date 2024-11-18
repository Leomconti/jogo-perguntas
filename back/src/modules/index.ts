import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import userRoutes from './user/user.routes'
import { paymentsRoute } from './payments/payments.route'

const router: Router = Router()

router.use(authRoutes)
router.use('/users', userRoutes)
router.use('/payments', paymentsRoute)

export default router
