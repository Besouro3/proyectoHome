import { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext'

const SedeContext = createContext()

export function SedeProvider({ children }) {
  const { user } = useAuth()
  const [sedeSeleccionada, setSedeSeleccionada] = useState(user?.sede || 'Todas')

  const esAdmin = user?.rol === 'Admin'
  const sede = esAdmin ? sedeSeleccionada : user?.sede || 'Todas'

  return (
    <SedeContext.Provider value={{ sede, sedeSeleccionada, setSedeSeleccionada, esAdmin }}>
      {children}
    </SedeContext.Provider>
  )
}

export const useSede = () => useContext(SedeContext)
