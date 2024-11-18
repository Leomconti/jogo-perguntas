import { Router } from 'express'
import * as authController from './controllers/authController'

const router: Router = Router()

router.post('/signIn', authController.signIn)
router.post('/signUp', authController.signUp)

export default router
