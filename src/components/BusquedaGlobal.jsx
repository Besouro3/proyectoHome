import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Users, GraduationCap, Gift, Award, FileText } from 'lucide-react'
import { colaboradores, capacitaciones, auxilios, evaluaciones } from '../data/mockData'
import { useSede } from '../context/SedeContext'

export default function BusquedaGlobal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { sede } = useSede()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResultados([])
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResultados([])
      return
    }

    const q = query.toLowerCase()
    const filtered = []

    const colFiltrados = sede === 'Todas las sedes' ? colaboradores : colaboradores.filter(c => c.sede === sede)
    colFiltrados.filter(c => c.nombre.toLowerCase().includes(q) || c.cargo.toLowerCase().includes(q))
      .slice(0, 5)
      .forEach(c => filtered.push({ tipo: 'Colaborador', icon: Users, texto: `${c.nombre} — ${c.cargo}`, path: '/colaboradores', color: 'text-brand-600' }))

    const capFiltradas = sede === 'Todas las sedes' ? capacitaciones : capacitaciones.filter(c => c.sede === sede)
    capFiltradas.filter(c => c.nombre.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q))
      .slice(0, 3)
      .forEach(c => filtered.push({ tipo: 'Capacitación', icon: GraduationCap, texto: `${c.nombre} — ${c.instructor}`, path: '/capacitacion', color: 'text-success-600' }))

    const auxFiltrados = sede === 'Todas las sedes' ? auxilios : auxilios.filter(a => a.sede === sede)
    auxFiltrados.filter(a => a.empleado.toLowerCase().includes(q) || a.tipo.toLowerCase().includes(q))
      .slice(0, 3)
      .forEach(a => filtered.push({ tipo: 'Auxilio', icon: Gift, texto: `${a.empleado} — ${a.tipo} ($${a.monto})`, path: '/auxilios', color: 'text-warning-600' }))

    const evalFiltradas = sede === 'Todas las sedes' ? evaluaciones : evaluaciones.filter(e => e.sede === sede)
    evalFiltradas.filter(e => e.empleado.toLowerCase().includes(q))
      .slice(0, 3)
      .forEach(e => filtered.push({ tipo: 'Evaluación', icon: Award, texto: `${e.empleado} — ${e.trimestre} (${e.puntuacion}/5)`, path: '/evaluaciones', color: 'text-danger-600' }))

    setResultados(filtered)
  }, [query, sede])

  const handleSelect = (path) => {
    navigate(path)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm modal-backdrop" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-border dark:border-gray-600 w-full max-w-lg mx-4 overflow-hidden modal-content">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border dark:border-gray-600">
          <Search size={18} className="text-text-secondary dark:text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar colaboradores, capacitaciones, auxilios..."
            className="flex-1 bg-transparent text-sm outline-none text-text-primary dark:text-white placeholder-text-secondary dark:placeholder-gray-400"
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X size={16} className="text-text-secondary" />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {resultados.length > 0 ? (
            <div className="py-2">
              {resultados.map((r, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(r.path)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left animate-stagger-row stagger-${Math.min(i + 1, 8)}`}
                >
                  <r.icon size={16} className={r.color} />
                  <div>
                    <p className="text-xs text-text-secondary dark:text-gray-400">{r.tipo}</p>
                    <p className="text-sm font-medium text-text-primary dark:text-white">{r.texto}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="py-8 text-center text-text-secondary dark:text-gray-400 text-sm">
              No se encontraron resultados para "{query}"
            </div>
          ) : (
            <div className="py-8 text-center text-text-secondary dark:text-gray-400 text-sm">
              Escribe para buscar en todo el dashboard
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-border dark:border-gray-600 text-xs text-text-secondary dark:text-gray-500 flex items-center gap-2">
          <FileText size={12} />
          <span>Presiona <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Enter</kbd> para buscar · <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Esc</kbd> para cerrar</span>
        </div>
      </div>
    </div>
  )
}
