import { Router } from 'express'
import { UserController } from './controllers/user.controller'

const router: Router = Router()
const userController = new UserController()

router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router
