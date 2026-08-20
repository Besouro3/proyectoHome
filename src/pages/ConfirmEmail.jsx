import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { MailCheck, RotateCcw } from 'lucide-react'
import { apiFetch } from '../utils/api'

export default function ConfirmEmail() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userId, email } = location.state || {}

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resending, setResending] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    if (!userId) navigate('/register')
  }, [userId, navigate])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)
    setError('')

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newCode = pasted.split('').concat(Array(6 - pasted.length).fill(''))
    setCode(newCode)
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullCode = code.join('')
    if (fullCode.length !== 6) {
      return setError('Ingresa el código de 6 dígitos')
    }

    setLoading(true)
    try {
      await apiFetch('/confirm-email', {
        method: 'POST',
        body: JSON.stringify({ userId, code: fullCode })
      })

      setSuccess(true)
      setTimeout(() => {
        navigate('/setup-totp', { state: { userId, email } })
      }, 1500)
    } catch (err) {
      setError(err.message)
      setCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    try {
      await apiFetch('/resend-code', {
        method: 'POST',
        body: JSON.stringify({ userId })
      })
      setError('')
      setCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } catch (err) {
      setError(err.message)
    } finally {
      setResending(false)
    }
  }

  if (!userId) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-900 to-brand-700 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white/15 inline-flex p-3 rounded-2xl mb-4">
            <MailCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Confirma tu correo</h1>
          <p className="text-brand-200 mt-2">
            Enviamos un código de 6 dígitos a
          </p>
          <p className="text-white font-medium mt-1">{email}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          {success ? (
            <div className="text-center py-4">
              <div className="bg-success-50 text-success-600 rounded-xl px-4 py-3 mb-4">
                ¡Email confirmado correctamente!
              </div>
              <p className="text-sm text-text-secondary">Redirigiendo a configuración del autenticador...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-2 sm:gap-3">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    className="w-11 h-13 sm:w-13 sm:h-14 text-center text-xl font-bold border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-surface-card text-text-primary"
                  />
                ))}
              </div>

              {error && <p className="text-danger-500 text-sm text-center bg-danger-50 px-4 py-2 rounded-lg">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors"
              >
                {loading ? 'Verificando...' : 'Confirmar'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="text-sm text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-1.5"
                >
                  <RotateCcw size={14} className={resending ? 'animate-spin' : ''} />
                  {resending ? 'Reenviando...' : 'Reenviar código'}
                </button>
              </div>
            </form>
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
