import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserPlus, Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

const API = '/api/auth'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const validateEmail = (email) => {
    const domain = email.split('@')[1]
    return domain === 'homecenter.co'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(form.email)) {
      return setError('Solo se permiten correos @homecenter.co')
    }

    if (form.password !== form.confirmar) {
      return setError('Las contraseñas no coinciden')
    }

    if (form.password.length < 4) {
      return setError('La contraseña debe tener al menos 4 caracteres')
    }

    setLoading(true)
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: form.nombre, email: form.email, password: form.password })
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      navigate('/confirm-email', { state: { userId: data.userId, email: data.email } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-900 to-brand-700 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white/15 inline-flex p-3 rounded-2xl mb-4">
            <UserPlus size={32} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Crear Cuenta</h1>
          <p className="text-brand-200 mt-2">Regístrate con tu correo @homecenter.co</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Nombre completo</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="Tu nombre"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Correo @homecenter.co</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="tu@homecenter.co"
                required
              />
            </div>
            {form.email && !validateEmail(form.email) && (
              <p className="text-danger-500 text-xs mt-1">Debe ser un correo @homecenter.co</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Contraseña</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="••••"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Confirmar contraseña</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type={showPass ? 'text' : 'password'}
                name="confirmar"
                value={form.confirmar}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="••••"
                required
              />
            </div>
            {form.confirmar && form.password !== form.confirmar && (
              <p className="text-danger-500 text-xs mt-1">Las contraseñas no coinciden</p>
            )}
          </div>

          {error && <p className="text-danger-500 text-sm bg-danger-50 px-4 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors"
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>

          <p className="text-center text-sm text-text-secondary">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
