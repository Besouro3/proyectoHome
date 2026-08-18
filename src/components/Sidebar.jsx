import { NavLink } from 'react-router-dom'
import { useSede } from '../context/SedeContext'
import { tabsConfig } from '../data/mockData'
import { Users, TrendingDown, GraduationCap, HeartPulse, Gift, Award, PanelLeftClose, PanelLeft } from 'lucide-react'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'

const kpiIcons = {
  colaboradores: Users,
  rotacion: TrendingDown,
  capacitacion: GraduationCap,
  sst: HeartPulse,
  auxilios: Gift,
  evaluaciones: Award
}

export default function Sidebar({ isOpen, onToggle }) {
  const { sede } = useSede()
  const data = useFiltrarPorSede()

  const kpis = [
    { key: 'colaboradores', label: 'Colaboradores', value: data.colaboradoresActivos?.length || 0 },
    { key: 'rotacion', label: 'Rotación', value: `${data.rotacion?.length > 0 ? (data.rotacion.reduce((s, r) => s + r.tasa, 0) / data.rotacion.length).toFixed(1) : 0}%` },
    { key: 'sst', label: 'Incidentes', value: data.sstData?.indicadores?.incidentesMes || 0 },
    { key: 'auxilios', label: 'Auxilios Pend.', value: data.auxilios?.filter(a => a.estado === 'Pendiente' || a.estado === 'En revisión').length || 0 },
    { key: 'evaluaciones', label: 'Satisfacción', value: data.colaboradoresActivos?.length > 0 ? (data.colaboradoresActivos.reduce((s, c) => s + c.satisfaccion, 0) / data.colaboradoresActivos.length).toFixed(1) + '/5' : '0/5' }
  ]

  return (
    <>
      <aside className={`sidebar-container hidden lg:flex flex-col transition-all duration-300 border-r ${isOpen ? 'w-64' : 'w-14'}`}>
        <div className="sidebar-header flex items-center justify-between px-3 py-3 border-b">
          <span className={`sidebar-label text-xs font-semibold uppercase tracking-wider transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Resumen</span>
          <button onClick={onToggle} className="sidebar-toggle p-1.5 rounded-lg transition-colors" title={isOpen ? 'Colapsar' : 'Expandir'}>
            {isOpen ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {isOpen ? (
            <div className="space-y-1 px-2">
              {kpis.map((k, i) => {
                const Icon = kpiIcons[k.key]
                return (
                  <div key={k.key} className={`sidebar-kpi flex items-center gap-3 px-3 py-2.5 rounded-lg animate-slide-up stagger-${Math.min(i + 1, 8)}`}>
                    <Icon size={16} className="sidebar-icon shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="sidebar-label text-xs truncate">{k.label}</p>
                      <p className="sidebar-value text-sm font-bold">{k.value}</p>
                    </div>
                  </div>
                )
              })}

              <div className="sidebar-divider pt-3 mt-3 border-t">
                <p className="sidebar-label text-xs font-semibold uppercase tracking-wider px-3 mb-2">Navegación</p>
                {tabsConfig.map(tab => (
                  <NavLink
                    key={tab.key}
                    to={tab.path}
                    end={tab.path === '/'}
                    className={({ isActive }) =>
                      `sidebar-nav-item flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors ${isActive ? 'sidebar-nav-active font-medium' : ''}`
                    }
                  >
                    <tab.icon size={15} />
                    <span>{tab.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-1 px-2">
              {kpis.slice(0, 3).map(k => {
                const Icon = kpiIcons[k.key]
                return (
                  <div key={k.key} className="flex items-center justify-center py-2" title={`${k.label}: ${k.value}`}>
                    <Icon size={18} className="sidebar-icon" />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </aside>

      <style>{`
        .sidebar-container {
          background-color: #FFFFFF;
          border-color: #D5D5D5;
        }
        .sidebar-header {
          border-color: #D5D5D5;
        }
        .sidebar-label { color: #6B7280; transition: opacity 0.2s ease; }
        .sidebar-value { color: #1A202C; }
        .sidebar-icon { color: #2B6CB0; }
        .sidebar-toggle { color: #6B7280; }
        .sidebar-toggle:hover { background-color: #F0F0F0; }
        .sidebar-kpi { background-color: #F5F5F5; }
        .sidebar-divider { border-color: #D5D5D5; }
        .sidebar-nav-item { color: #6B7280; }
        .sidebar-nav-item:hover { background-color: #F0F0F0; color: #1A202C; }
        .sidebar-nav-active { background-color: #E8F0F7; color: #0F3A7D !important; }

        .dark .sidebar-container {
          background-color: #1A202C !important;
          border-color: #1F2937 !important;
        }
        .dark .sidebar-header {
          border-color: #1F2937 !important;
        }
        .dark .sidebar-label { color: #9CA3AF !important; }
        .dark .sidebar-value { color: #FFFFFF !important; }
        .dark .sidebar-icon { color: #7BA8FB !important; }
        .dark .sidebar-toggle { color: #9CA3AF !important; }
        .dark .sidebar-toggle:hover { background-color: #253040 !important; }
        .dark .sidebar-kpi { background-color: rgba(31,41,55,0.5) !important; }
        .dark .sidebar-divider { border-color: #1F2937 !important; }
        .dark .sidebar-nav-item { color: #9CA3AF !important; }
        .dark .sidebar-nav-item:hover { background-color: #253040 !important; color: #FFFFFF !important; }
        .dark .sidebar-nav-active { background-color: rgba(8,43,94,0.25) !important; color: #A4C7FD !important; }
      `}</style>
    </>
  )
}
