import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { SedeProvider } from './context/SedeContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Resumen from './pages/Resumen'
import Colaboradores from './pages/Colaboradores'
import Rotacion from './pages/Rotacion'
import Capacitacion from './pages/Capacitacion'
import Sindicalizados from './pages/Sindicalizados'
import SST from './pages/SST'
import Auxilios from './pages/Auxilios'
import Evaluaciones from './pages/Evaluaciones'
import ArbolRoles from './pages/ArbolRoles'
import AsistenteIA from './pages/AsistenteIA'
import Comparativas from './pages/Comparativas'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SedeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Resumen />} />
                <Route path="colaboradores" element={<Colaboradores />} />
                <Route path="rotacion" element={<Rotacion />} />
                <Route path="capacitacion" element={<Capacitacion />} />
                <Route path="sindicalizados" element={<Sindicalizados />} />
                <Route path="sst" element={<SST />} />
                <Route path="auxilios" element={<Auxilios />} />
                <Route path="evaluaciones" element={<Evaluaciones />} />
                <Route path="arbol-roles" element={<ArbolRoles />} />
                <Route path="asistente-ia" element={<AsistenteIA />} />
                <Route path="comparativas" element={<Comparativas />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SedeProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
