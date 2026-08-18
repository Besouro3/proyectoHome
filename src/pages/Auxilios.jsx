import { Gift, CheckCircle, Clock, XCircle, DollarSign } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import KpiCard from '../components/KpiCard'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import PageWrapper from '../components/PageWrapper'
import ExportButton from '../components/ExportButton'

export default function Auxilios() {
  const { sede, auxilios } = useFiltrarPorSede()

  const aprobados = auxilios.filter(a => a.estado === 'Aprobado')
  const pendientes = auxilios.filter(a => a.estado === 'Pendiente' || a.estado === 'En revisión')
  const rechazados = auxilios.filter(a => a.estado === 'Rechazado')
  const montoTotal = aprobados.reduce((s, a) => s + a.monto, 0)

  const estadoData = [
    { name: 'Aprobados', value: aprobados.length },
    { name: 'Pendientes', value: pendientes.length },
    { name: 'Rechazados', value: rechazados.length }
  ]
  const estadoColors = ['#38A169', '#D69E2E', '#E53E3E']

  const tipoData = Object.entries(
    auxilios.reduce((acc, a) => {
      if (!acc[a.tipo]) acc[a.tipo] = { monto: 0, cantidad: 0 }
      acc[a.tipo].monto += a.monto
      acc[a.tipo].cantidad += 1
      return acc
    }, {})
  ).map(([name, data]) => ({ name, monto: data.monto, cantidad: data.cantidad }))

  const tipoColors = ['#2B6CB0', '#E53E3E', '#38A169']

  const estadoBadge = (estado) => {
    const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium'
    if (estado === 'Aprobado') return `${base} bg-success-50 text-success-600`
    if (estado === 'Pendiente' || estado === 'En revisión') return `${base} bg-warning-50 text-warning-600`
    return `${base} bg-danger-50 text-danger-600`
  }

  return (
    <PageWrapper>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Auxilios</h2>
          <p className="text-text-secondary text-sm">Beneficios sociales — <span className="font-medium text-brand-600">{sede}</span></p>
        </div>
        <ExportButton data={auxilios} filename={`auxilios_${sede.replace(/\s+/g, '_')}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={CheckCircle} label="Aprobados" value={aprobados.length} sub="Auxilios aprobados" color="success" />
        <KpiCard icon={Clock} label="Pendientes" value={pendientes.length} sub="Requieren revisión" color="warning" />
        <KpiCard icon={XCircle} label="Rechazados" value={rechazados.length} sub="No aprobados" color="danger" />
        <KpiCard icon={DollarSign} label="Monto Total" value={`$${montoTotal}`} sub="Aprobados" color="brand" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Por Estado</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={estadoData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {estadoData.map((_, i) => <Cell key={i} fill={estadoColors[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Monto por Tipo ($)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={tipoData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip formatter={(v) => `$${v}`} />
              <Bar dataKey="monto" radius={[4, 4, 0, 0]} name="Monto total" isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {tipoData.map((_, i) => <Cell key={i} fill={tipoColors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Cantidad por Tipo</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={tipoData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="cantidad" radius={[4, 4, 0, 0]} name="Cantidad" isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {tipoData.map((_, i) => <Cell key={i} fill={tipoColors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-base font-semibold">Detalle</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50 text-brand-700">
                <th className="text-left px-4 py-3 font-semibold">Empleado</th>
                <th className="text-left px-4 py-3 font-semibold">Tipo</th>
                <th className="text-left px-4 py-3 font-semibold">Monto</th>
                <th className="text-left px-4 py-3 font-semibold">Estado</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Fecha</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {auxilios.map((a, i) => (
                <tr key={a.id} className={`border-t border-border hover:bg-brand-50/30 transition-colors animate-stagger-row stagger-${Math.min(i + 1, 8)}`}>
                  <td className="px-4 py-3 font-medium">{a.empleado}</td>
                  <td className="px-4 py-3 text-text-secondary">{a.tipo}</td>
                  <td className="px-4 py-3">${a.monto}</td>
                  <td className="px-4 py-3"><span className={estadoBadge(a.estado)}>{a.estado}</span></td>
                  <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{a.fechaSolicitud}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs hidden lg:table-cell">{a.motivo}</td>
                </tr>
              ))}
              {auxilios.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-text-secondary">Sin auxilios registrados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </PageWrapper>
  )
}
