import { Router } from 'express'
import { authController } from '../controllers/authController.js'
import { validateHomecenterDomain } from '../middlewares/validateDomain.js'

const router = Router()

router.post('/register', validateHomecenterDomain, authController.register)
router.post('/confirm-email', authController.confirmEmail)
router.post('/resend-code', authController.resendCode)
router.post('/setup-totp', authController.setupTotp)
router.post('/qr-code', authController.getQrCode)
router.post('/verify-totp', authController.verifyTotp)
router.post('/login', authController.login)
router.post('/verify-login-totp', authController.verifyLoginTotp)

export default router
