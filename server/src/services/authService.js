import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TOTP, Secret } from 'otpauth'
import QRCode from 'qrcode'
import { User } from '../models/User.js'
import { simulatedEmail } from '../utils/email.js'

const JWT_SECRET = process.env.JWT_SECRET || 'rrhh-dashboard-secret-key-2026'
const CODE_EXPIRY_MINUTES = 15

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, rol: user.rol },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export const authService = {
  async register({ nombre, email, password }) {
    const existing = User.findByEmail(email)
    if (existing) {
      throw new Error('Ya existe una cuenta con este email')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = User.create({ nombre, email, password: hashedPassword })

    const code = generateCode()
    const expires = Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000
    User.setConfirmationCode(user.id, code, expires)

    simulatedEmail(
      email,
      'Confirma tu correo - Dashboard RRHH',
      `Hola ${nombre},\n\nTu código de confirmación es: ${code}\n\nEste código expira en ${CODE_EXPIRY_MINUTES} minutos.\n\nSi no solicitaste esta cuenta, ignora este mensaje.`
    )

    return { userId: user.id, email: user.email }
  },

  confirmEmail({ userId, code }) {
    const user = User.findById(userId)
    if (!user) throw new Error('Usuario no encontrado')

    if (user.email_confirmed) {
      throw new Error('El email ya está confirmado')
    }

    if (user.confirmation_code !== code) {
      throw new Error('Código de confirmación incorrecto')
    }

    if (Date.now() > user.confirmation_expires) {
      throw new Error('El código ha expirado. Solicita uno nuevo.')
    }

    User.confirmEmail(userId)
    return { success: true }
  },

  resendCode({ userId }) {
    const user = User.findById(userId)
    if (!user) throw new Error('Usuario no encontrado')
    if (user.email_confirmed) throw new Error('El email ya está confirmado')

    const code = generateCode()
    const expires = Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000
    User.setConfirmationCode(userId, code, expires)

    simulatedEmail(
      user.email,
      'Nuevo código de confirmación - Dashboard RRHH',
      `Hola ${user.nombre},\n\nTu nuevo código de confirmación es: ${code}\n\nEste código expira en ${CODE_EXPIRY_MINUTES} minutos.`
    )

    return { success: true }
  },

  setupTotp({ userId }) {
    const user = User.findById(userId)
    if (!user) throw new Error('Usuario no encontrado')
    if (!user.email_confirmed) throw new Error('Confirma tu email primero')

    const totpSecret = new Secret({ size: 20 })

    const totp = new TOTP({
      issuer: 'Dashboard RRHH',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: totpSecret
    })

    User.setTotpSecret(userId, totp.secret.base32)

    return {
      secret: totp.secret.base32,
      otpauthUrl: totp.toString()
    }
  },

  async getQrCode({ userId }) {
    const user = User.findById(userId)
    if (!user) throw new Error('Usuario no encontrado')
    if (!user.totp_secret) throw new Error('Primero genera el secreto TOTP')

    const totp = new TOTP({
      issuer: 'Dashboard RRHH',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: user.totp_secret
    })

    const qrDataUrl = await QRCode.toDataURL(totp.toString())
    return { qrCode: qrDataUrl, secret: user.totp_secret }
  },

  verifyTotp({ userId, token }) {
    const user = User.findById(userId)
    if (!user) throw new Error('Usuario no encontrado')
    if (!user.totp_secret) throw new Error('Primero configura TOTP')

    const totp = new TOTP({
      issuer: 'Dashboard RRHH',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: user.totp_secret
    })

    const delta = totp.validate({ token, window: 1 })
    if (delta === null) {
      throw new Error('Código TOTP inválido. Intenta de nuevo.')
    }

    User.enableTotp(userId)
    const jwtToken = createToken(user)
    return { token: jwtToken, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol, sede: user.sede } }
  },

  async login({ email, password }) {
    const user = User.findByEmail(email)
    if (!user) {
      throw new Error('Email o contraseña incorrectos')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Email o contraseña incorrectos')
    }

    if (!user.email_confirmed) {
      const code = generateCode()
      const expires = Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000
      User.setConfirmationCode(user.id, code, expires)

      simulatedEmail(
        email,
        'Confirma tu correo - Dashboard RRHH',
        `Hola ${user.nombre},\n\nTu código de confirmación es: ${code}\n\nEste código expira en ${CODE_EXPIRY_MINUTES} minutos.`
      )

      return { requiresEmailConfirmation: true, userId: user.id, email: user.email }
    }

    const tempToken = jwt.sign(
      { id: user.id, purpose: 'totp-verify' },
      JWT_SECRET,
      { expiresIn: '5m' }
    )

    if (!user.totp_enabled) {
      return { requiresTotpSetup: true, tempToken, userId: user.id }
    }

    return { requiresTotp: true, tempToken, userId: user.id }
  },

  verifyLoginTotp({ tempToken, token }) {
    let decoded
    try {
      decoded = jwt.verify(tempToken, JWT_SECRET)
    } catch {
      throw new Error('Token expirado. Inicia sesión de nuevo.')
    }

    if (decoded.purpose !== 'totp-verify') {
      throw new Error('Token inválido')
    }

    const user = User.findById(decoded.id)
    if (!user) throw new Error('Usuario no encontrado')

    const totp = new TOTP({
      issuer: 'Dashboard RRHH',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: user.totp_secret
    })

    const delta = totp.validate({ token, window: 1 })
    if (delta === null) {
      throw new Error('Código TOTP inválido')
    }

    const jwtToken = createToken(user)
    return {
      token: jwtToken,
      user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol, sede: user.sede }
    }
  }
}
