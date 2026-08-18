import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(email, password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-900 to-brand-700 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white/15 inline-flex p-3 rounded-2xl mb-4">
            <LogIn size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Dashboard RRHH</h1>
          <p className="text-brand-200 mt-2">Inicia sesión para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-5">
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
          <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
