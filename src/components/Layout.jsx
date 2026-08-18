import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSede } from '../context/SedeContext'
import { useTheme } from '../context/ThemeContext'
import { tabsConfig, sedes } from '../data/mockData'
import { LogOut, Building2, Menu, X, ChevronDown, Sun, Moon, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import BusquedaGlobal from './BusquedaGlobal'

export default function Layout() {
  const { user, logout } = useAuth()
  const { sede, sedeSeleccionada, setSedeSeleccionada, esAdmin } = useSede()
  const { dark, toggleDark } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(() => localStorage.getItem('rrhh_sidebar') !== 'closed')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('rrhh_sidebar', sidebarOpen ? 'open' : 'closed')
  }, [sidebarOpen])

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <header className="layout-header text-white shadow-lg sticky top-0 z-50">
        <style>{`
          .layout-header { background-color: #0070B9; color: #FFFFFF; }
          .layout-header .text-brand-200 { color: #E0E7FF; }
          .layout-header .bg-brand-600\/50 { background-color: rgba(0,112,185,0.1); }
          .layout-header .hover\:bg-brand-600\/50:hover { background-color: rgba(0,112,185,0.15); }
          .layout-header .bg-brand-500\/50 { background-color: rgba(0,112,185,0.1); }
          .layout-header select { background-color: #0070B9; color: #FFFFFF; border-color: #0070B9; }
          .dark .layout-header { background-color: #1a365d !important; color: #FFFFFF !important; }
          .dark .layout-header .text-brand-200 { color: #E0E7FF !important; }
        `}</style>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-1">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div>
              <h1 className="text-lg font-bold leading-tight">Dashboard RRHH</h1>
              <div className="flex items-center gap-1 text-xs text-brand-200">
                <Building2 size={12} />
                {esAdmin ? (
                  <span className="font-medium">{sede === 'Todas las sedes' ? 'Todas las sedes' : sede}</span>
                ) : (
                  <span>{sede}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-brand-200 hover:text-white rounded-lg transition-colors"
              title="Buscar (Ctrl+K)"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Buscar</span>
              <kbd className="hidden sm:inline px-1 py-0.5 rounded text-[10px]">⌘K</kbd>
            </button>

            {esAdmin && (
              <div className="relative">
                <select
                  value={sedeSeleccionada}
                  onChange={e => setSedeSeleccionada(e.target.value)}
                  className="appearance-none text-white border rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
                >
                  <option value="Todas">Todas las sedes</option>
                  {sedes.map(s => (
                    <option key={s.id} value={s.nombre}>{s.nombre}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            )}

            <button onClick={toggleDark} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title={dark ? 'Modo claro' : 'Modo oscuro'}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user.nombre}</p>
              <p className="text-xs text-brand-200">{user.rol}</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Cerrar sesión">
              <LogOut size={18} />
            </button>
          </div>
        </div>
        <nav className={`lg:hidden flex-col overflow-y-auto transition-all duration-300 ease-out ${mobileOpen ? 'flex animate-slide-down' : 'hidden'}`} style={{ backgroundColor: '#0F3A7D' }}>
          <style>{`
            .dark .layout-header nav { background-color: #111827 !important; }
          `}</style>
          {tabsConfig.map(tab => (
            <NavLink
              key={tab.key}
              to={tab.path}
              end={tab.path === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-white/15 text-white border-b-2 border-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden bg-white">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 md:p-6 overflow-auto bg-white">
          <div key={location.pathname} className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      <BusquedaGlobal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
