import { Router } from 'express'
import { PaymentController } from './controllers/payment.controller'

const paymentsRoute: Router = Router()
const paymentController = new PaymentController()

paymentsRoute.post('/link', paymentController.createPaymentLink)
paymentsRoute.post('/webhook', paymentController.handleWebhook)
paymentsRoute.get('/manage', paymentController.manageSubscription)
paymentsRoute.get('/usage/:id', paymentController.getUsage)

export { paymentsRoute }
