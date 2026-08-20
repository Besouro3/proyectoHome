import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ShieldCheck, Smartphone, CheckCircle } from 'lucide-react'

const API = '/api/auth'

export default function SetupTotp() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userId, email } = location.state || {}

  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [qrLoading, setQrLoading] = useState(true)
  const [step, setStep] = useState('scan')
  const [loginData, setLoginData] = useState(null)

  useEffect(() => {
    if (!userId) {
      navigate('/register')
      return
    }
    setupTotp()
  }, [userId, navigate])

  const setupTotp = async () => {
    try {
      const setupRes = await fetch(`${API}/setup-totp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      const setupData = await setupRes.json()
      if (!setupRes.ok) throw new Error(setupData.error)

      const qrRes = await fetch(`${API}/qr-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      const qrData = await qrRes.json()
      if (!qrRes.ok) throw new Error(qrData.error)

      setQrCode(qrData.qrCode)
      setSecret(qrData.secret)
    } catch (err) {
      setError(err.message)
    } finally {
      setQrLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (token.length !== 6) {
      return setError('Ingresa el código de 6 dígitos del autenticador')
    }

    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/verify-totp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, token })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setLoginData(data)
      setStep('success')
      setTimeout(() => {
        localStorage.setItem('rrhh_session', JSON.stringify(data.user))
        navigate('/')
      }, 2000)
    } catch (err) {
      setError(err.message)
      setToken('')
    } finally {
      setLoading(false)
    }
  }

  if (!userId) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-900 to-brand-700 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white/15 inline-flex p-3 rounded-2xl mb-4">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Configura tu Autenticador</h1>
          <p className="text-brand-200 mt-2">Protege tu cuenta con verificación en dos pasos</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          {step === 'success' ? (
            <div className="text-center py-6">
              <CheckCircle size={64} className="text-success-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">¡Configuración completada!</h3>
              <p className="text-sm text-text-secondary">Tu autenticador está activo. Redirigiendo al dashboard...</p>
            </div>
          ) : (
            <>
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Smartphone size={20} className="text-brand-600 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-brand-700 mb-1">Pasos para configurar:</p>
                    <ol className="text-brand-600 space-y-1 list-decimal list-inside">
                      <li>Abre <strong>Microsoft Authenticator</strong></li>
                      <li>Toca <strong>"+"</strong> y selecciona <strong>"Cuenta de trabajo"</strong></li>
                      <li>Escanea el código QR de abajo</li>
                      <li>Ingresa el código de 6 dígitos</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="text-center">
                {qrLoading ? (
                  <div className="w-48 h-48 mx-auto bg-surface-card rounded-xl flex items-center justify-center">
                    <div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full" />
                  </div>
                ) : qrCode ? (
                  <img src={qrCode} alt="QR Code para autenticador" className="w-48 h-48 mx-auto rounded-xl border border-border" />
                ) : (
                  <div className="w-48 h-48 mx-auto bg-danger-50 rounded-xl flex items-center justify-center text-danger-500 text-sm">
                    Error al generar QR
                  </div>
                )}
              </div>

              {secret && (
                <div className="bg-surface-card rounded-xl p-3">
                  <p className="text-xs text-text-secondary mb-1">Si no puedes escanear, ingresa manualmente:</p>
                  <code className="text-sm font-mono text-text-primary break-all bg-white dark:bg-gray-800 px-2 py-1 rounded block">
                    {secret}
                  </code>
                </div>
              )}

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Código del autenticador</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={token}
                    onChange={e => { setToken(e.target.value.replace(/\D/g, '')); setError('') }}
                    className="w-full px-4 py-3 text-center text-xl font-bold tracking-[0.5em] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="000000"
                    required
                  />
                </div>

                {error && <p className="text-danger-500 text-sm text-center bg-danger-50 px-4 py-2 rounded-lg">{error}</p>}

                <button
                  type="submit"
                  disabled={loading || token.length !== 6}
                  className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors"
                >
                  {loading ? 'Verificando...' : 'Activar Autenticador'}
                </button>
              </form>
            </>
          )}

          <div className="text-center">
            <Link to="/login" className="text-sm text-text-secondary hover:text-text-primary">
              ← Volver al login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
