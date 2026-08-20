import { authService } from '../services/authService.js'

export const authController = {
  async register(req, res) {
    try {
      const { nombre, email, password } = req.body

      if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' })
      }

      if (password.length < 4) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 4 caracteres' })
      }

      const result = await authService.register({ nombre, email, password })
      res.status(201).json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  confirmEmail(req, res) {
    try {
      const { userId, code } = req.body
      if (!userId || !code) {
        return res.status(400).json({ error: 'UserId y código son requeridos' })
      }
      const result = authService.confirmEmail({ userId, code })
      res.json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  resendCode(req, res) {
    try {
      const { userId } = req.body
      if (!userId) {
        return res.status(400).json({ error: 'UserId es requerido' })
      }
      const result = authService.resendCode({ userId })
      res.json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  setupTotp(req, res) {
    try {
      const { userId } = req.body
      if (!userId) {
        return res.status(400).json({ error: 'UserId es requerido' })
      }
      const result = authService.setupTotp({ userId })
      res.json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  async getQrCode(req, res) {
    try {
      const { userId } = req.body
      if (!userId) {
        return res.status(400).json({ error: 'UserId es requerido' })
      }
      const result = await authService.getQrCode({ userId })
      res.json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  verifyTotp(req, res) {
    try {
      const { userId, token } = req.body
      if (!userId || !token) {
        return res.status(400).json({ error: 'UserId y token son requeridos' })
      }
      const result = authService.verifyTotp({ userId, token })
      res.json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' })
      }
      const result = await authService.login({ email, password })
      res.json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  verifyLoginTotp(req, res) {
    try {
      const { tempToken, token } = req.body
      if (!tempToken || !token) {
        return res.status(400).json({ error: 'tempToken y token son requeridos' })
      }
      const result = authService.verifyLoginTotp({ tempToken, token })
      res.json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}
