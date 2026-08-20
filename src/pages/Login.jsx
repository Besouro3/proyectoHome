import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn, Eye, EyeOff, ShieldCheck } from 'lucide-react'

export default function Login() {
  const { login, verifyLoginTotp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [totpState, setTotpState] = useState(null)
  const [totpCode, setTotpCode] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)
    setLoading(false)

    if (result.success) {
      navigate('/')
    } else if (result.requiresEmailConfirmation) {
      navigate('/confirm-email', { state: { userId: result.userId, email: result.email } })
    } else if (result.requiresTotpSetup) {
      navigate('/setup-totp', { state: { userId: result.userId, email } })
    } else if (result.requiresTotp) {
      setTotpState(result)
    } else {
      setError(result.error)
    }
  }

  const handleTotpVerify = async (e) => {
    e.preventDefault()
    if (totpCode.length !== 6) return setError('Ingresa el código de 6 dígitos')

    setLoading(true)
    try {
      const result = await verifyLoginTotp(totpState.tempToken, totpCode)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error)
        setTotpCode('')
      }
    } catch (err) {
      setError(err.message)
      setTotpCode('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-900 to-brand-700 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white/15 inline-flex p-3 rounded-2xl mb-4">
            <LogIn size={32} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard RRHH</h1>
          <p className="text-brand-200 mt-2">Inicia sesión para continuar</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-5">
          {totpState ? (
            <form onSubmit={handleTotpVerify} className="space-y-5">
              <div className="text-center">
                <ShieldCheck size={40} className="text-brand-600 mx-auto mb-2" />
                <p className="text-sm text-text-secondary">Ingresa el código de tu autenticador</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Código TOTP</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={totpCode}
                  onChange={e => { setTotpCode(e.target.value.replace(/\D/g, '')); setError('') }}
                  className="w-full px-4 py-3 text-center text-xl font-bold tracking-[0.5em] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  placeholder="000000"
                  autoFocus
                  required
                />
              </div>
              {error && <p className="text-danger-500 text-sm bg-danger-50 px-4 py-2 rounded-lg">{error}</p>}
              <button
                type="submit"
                disabled={loading || totpCode.length !== 6}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors"
              >
                {loading ? 'Verificando...' : 'Verificar'}
              </button>
              <button
                type="button"
                onClick={() => { setTotpState(null); setTotpCode(''); setError('') }}
                className="w-full text-sm text-text-secondary hover:text-text-primary"
              >
                ← Volver al login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 pr-10"
                    placeholder="••••"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {error && <p className="text-danger-500 text-sm bg-danger-50 px-4 py-2 rounded-lg">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors"
              >
                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
              </button>
              <p className="text-center text-sm text-text-secondary">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="text-brand-600 hover:text-brand-700 font-medium">
                  Regístrate aquí
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
