import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import PageWrapper from '../components/PageWrapper'
import ExportButton from '../components/ExportButton'

export default function Colaboradores() {
  const { sede, colaboradores } = useFiltrarPorSede()
  const [busqueda, setBusqueda] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState('Todos')

  const filtrados = colaboradores.filter(c => {
    const matchBusqueda = c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || c.cargo.toLowerCase().includes(busqueda.toLowerCase())
    const matchEstado = estadoFiltro === 'Todos' || c.estado === estadoFiltro
    return matchBusqueda && matchEstado
  })

  const estadoBadge = (estado) => {
    const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium'
    return estado === 'Activo'
      ? `${base} bg-success-50 text-success-600`
      : `${base} bg-danger-50 text-danger-600`
  }

  const cargoData = Object.entries(
    colaboradores.reduce((acc, c) => { acc[c.cargo] = (acc[c.cargo] || 0) + 1; return acc }, {})
  ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

  const contratoData = [
    { name: 'Indefinido', value: colaboradores.filter(c => c.tipoContrato === 'Indefinido').length },
    { name: 'Temporal', value: colaboradores.filter(c => c.tipoContrato === 'Temporal').length }
  ]

  const deptoData = Object.entries(
    colaboradores.reduce((acc, c) => { acc[c.departamento] = (acc[c.departamento] || 0) + 1; return acc }, {})
  ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

  const cargoColors = ['#2B6CB0', '#38A169', '#D69E2E', '#E53E3E', '#805AD5']
  const contratoColors = ['#2B6CB0', '#D69E2E']

  return (
    <PageWrapper>
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Colaboradores</h2>
          <p className="text-text-secondary text-sm">Personal de <span className="font-medium text-brand-600">{sede}</span> ({filtrados.length} resultados)</p>
        </div>
        <ExportButton data={filtrados} filename={`colaboradores_${sede.replace(/\s+/g, '_')}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-surface-card rounded-xl border border-border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Por Cargo</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={cargoData} layout="vertical">
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {cargoData.map((_, i) => <Cell key={i} fill={cargoColors[i % cargoColors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Por Contrato</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={contratoData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {contratoData.map((_, i) => <Cell key={i} fill={contratoColors[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Por Departamento</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={deptoData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {deptoData.map((_, i) => <Cell key={i} fill={cargoColors[i % cargoColors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface-card rounded-xl border border-border p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o cargo..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-text-secondary" />
            <select value={estadoFiltro} onChange={e => setEstadoFiltro(e.target.value)}
              className="px-3 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option value="Todos">Todos</option>
              <option value="Activo">Activos</option>
              <option value="Inactivo">Inactivos</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50 text-brand-700">
                <th className="text-left px-4 py-3 font-semibold">Nombre</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Cargo</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Depto</th>
                <th className="text-left px-4 py-3 font-semibold">Antigüedad</th>
                <th className="text-left px-4 py-3 font-semibold">Estado</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Contrato</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((c, i) => (
                <tr key={c.id} className={`border-t border-border hover:bg-brand-50/30 transition-colors animate-stagger-row stagger-${Math.min(i + 1, 8)}`}>
                  <td className="px-4 py-3 font-medium">{c.nombre}</td>
                  <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">{c.cargo}</td>
                  <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{c.departamento}</td>
                  <td className="px-4 py-3">{c.antiguedad} {c.antiguedad === 1 ? 'año' : 'años'}</td>
                  <td className="px-4 py-3"><span className={estadoBadge(c.estado)}>{c.estado}</span></td>
                  <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">{c.tipoContrato}</td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-white">No se encontraron resultados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </PageWrapper>
  )
}
