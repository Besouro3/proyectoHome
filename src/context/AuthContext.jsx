import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const MOCK_USERS = [
  { id: 1, nombre: 'Admin', email: 'admin@demo.com', password: '1234', rol: 'Admin', sede: 'Todas' },
  { id: 2, nombre: 'Carlos Mendoza', email: 'carlos@demo.com', password: '1234', rol: 'Gerente', sede: 'Av. Principal 123' },
  { id: 3, nombre: 'María López', email: 'maria@demo.com', password: '1234', rol: 'Gerente', sede: 'Calle Norte 456' },
  { id: 4, nombre: 'Roberto Vega', email: 'roberto@demo.com', password: '1234', rol: 'Gerente', sede: 'Av. Libertador 789' }
]

const API = '/api/auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem('rrhh_session')
    return session ? JSON.parse(session) : null
  })

  const [authState, setAuthState] = useState(null)

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      if (data.requiresEmailConfirmation) {
        return { success: false, requiresEmailConfirmation: true, userId: data.userId, email: data.email }
      }

      if (data.requiresTotp) {
        return { success: false, requiresTotp: true, tempToken: data.tempToken, userId: data.userId }
      }

      setUser(data.user)
      localStorage.setItem('rrhh_session', JSON.stringify(data.user))
      return { success: true }
    } catch {
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password)
      if (mockUser) {
        setUser(mockUser)
        localStorage.setItem('rrhh_session', JSON.stringify(mockUser))
        return { success: true }
      }
      return { success: false, error: 'Email o contraseña incorrectos' }
    }
  }

  const verifyLoginTotp = async (tempToken, token) => {
    try {
      const res = await fetch(`${API}/verify-login-totp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken, token })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setUser(data.user)
      localStorage.setItem('rrhh_session', JSON.stringify(data.user))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('rrhh_session')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, verifyLoginTotp, authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
