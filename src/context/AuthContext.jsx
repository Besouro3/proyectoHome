import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const USERS = [
  { id: 1, nombre: 'Admin', email: 'admin@demo.com', password: '1234', rol: 'Admin', sede: 'Todas' },
  { id: 2, nombre: 'Carlos Mendoza', email: 'carlos@demo.com', password: '1234', rol: 'Gerente', sede: 'Av. Principal 123' },
  { id: 3, nombre: 'María López', email: 'maria@demo.com', password: '1234', rol: 'Gerente', sede: 'Calle Norte 456' },
  { id: 4, nombre: 'Roberto Vega', email: 'roberto@demo.com', password: '1234', rol: 'Gerente', sede: 'Av. Libertador 789' }
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem('rrhh_session')
    return session ? JSON.parse(session) : null
  })

  const login = (email, password) => {
    const found = USERS.find(u => u.email === email && u.password === password)
    if (found) {
      setUser(found)
      localStorage.setItem('rrhh_session', JSON.stringify(found))
      return { success: true }
    }
    return { success: false, error: 'Email o contraseña incorrectos' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('rrhh_session')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
