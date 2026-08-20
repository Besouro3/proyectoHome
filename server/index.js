import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './src/routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`\n🚀 Backend RRHH corriendo en http://localhost:${PORT}`)
  console.log(`📋 Endpoints:`)
  console.log(`   POST /api/auth/register`)
  console.log(`   POST /api/auth/confirm-email`)
  console.log(`   POST /api/auth/resend-code`)
  console.log(`   POST /api/auth/setup-totp`)
  console.log(`   POST /api/auth/qr-code`)
  console.log(`   POST /api/auth/verify-totp`)
  console.log(`   POST /api/auth/login`)
  console.log(`   POST /api/auth/verify-login-totp\n`)
})
