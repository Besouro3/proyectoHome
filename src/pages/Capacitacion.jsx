import { GraduationCap, CheckCircle, Clock, Calendar } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import KpiCard from '../components/KpiCard'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import PageWrapper from '../components/PageWrapper'
import ExportButton from '../components/ExportButton'

export default function Capacitacion() {
  const { sede, capacitaciones } = useFiltrarPorSede()

  const completadas = capacitaciones.filter(c => c.estado === 'Completada').length
  const enCurso = capacitaciones.filter(c => c.estado === 'En curso').length
  const programadas = capacitaciones.filter(c => c.estado === 'Programada').length
  const totalHoras = capacitaciones.reduce((s, c) => s + c.duracion, 0)
  const tasaAprobacion = capacitaciones.filter(c => c.estado === 'Completada').reduce((s, c) => s + c.aprobados, 0)

  const estadoData = [
    { name: 'Completada', value: completadas },
    { name: 'En curso', value: enCurso },
    { name: 'Programada', value: programadas }
  ]
  const estadoColors = ['#38A169', '#D69E2E', '#2B6CB0']

  const horasData = capacitaciones.map(c => ({
    nombre: c.nombre.length > 15 ? c.nombre.substring(0, 15) + '...' : c.nombre,
    horas: c.duracion
  })).sort((a, b) => b.horas - a.horas)

  const aprobacionData = capacitaciones.filter(c => c.estado === 'Completada').map(c => ({
    nombre: c.nombre.length > 15 ? c.nombre.substring(0, 15) + '...' : c.nombre,
    tasa: c.participantes > 0 ? Math.round((c.aprobados / c.participantes) * 100) : 0
  }))

  const estadoBadge = (estado) => {
    const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium'
    if (estado === 'Completada') return `${base} bg-success-50 text-success-600`
    if (estado === 'En curso') return `${base} bg-warning-50 text-warning-600`
    return `${base} bg-brand-50 text-brand-600`
  }

  return (
    <PageWrapper>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Capacitación</h2>
          <p className="text-text-secondary text-sm">Programa de capacitación — <span className="font-medium text-brand-600">{sede}</span></p>
        </div>
        <ExportButton data={capacitaciones} filename={`capacitaciones_${sede.replace(/\s+/g, '_')}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard icon={CheckCircle} label="Completadas" value={completadas} sub="Finalizadas" color="success" />
        <KpiCard icon={Clock} label="En Curso" value={enCurso} sub="En desarrollo" color="warning" />
        <KpiCard icon={Calendar} label="Programadas" value={programadas} sub="Próximas" color="brand" />
        <KpiCard icon={GraduationCap} label="Total Horas" value={totalHoras} sub="Horas de formación" color="brand" />
        <KpiCard icon={CheckCircle} label="Aprobados" value={tasaAprobacion} sub="Participantes totales" color="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Estado</h3>
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
          <h3 className="text-sm font-semibold mb-3">Horas por Capacitación</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={horasData}>
              <XAxis dataKey="nombre" tick={{ fontSize: 8 }} angle={-30} textAnchor="end" height={50} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="horas" fill="#2B6CB0" radius={[4, 4, 0, 0]} name="Horas" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">% Aprobación</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={aprobacionData}>
              <XAxis dataKey="nombre" tick={{ fontSize: 8 }} angle={-30} textAnchor="end" height={50} />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="tasa" fill="#38A169" radius={[4, 4, 0, 0]} name="% Aprobación" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
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
                <th className="text-left px-4 py-3 font-semibold">Capacitación</th>
                <th className="text-left px-4 py-3 font-semibold">Fecha</th>
                <th className="text-left px-4 py-3 font-semibold">Horas</th>
                <th className="text-left px-4 py-3 font-semibold">Participantes</th>
                <th className="text-left px-4 py-3 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {capacitaciones.map((c, i) => (
                <tr key={c.id} className={`border-t border-border hover:bg-brand-50/30 transition-colors animate-stagger-row stagger-${Math.min(i + 1, 8)}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium">{c.nombre}</div>
                    <div className="text-xs text-text-secondary">{c.instructor}</div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{c.fecha}</td>
                  <td className="px-4 py-3">{c.duracion}h</td>
                  <td className="px-4 py-3">{c.participantes > 0 ? `${c.aprobados}/${c.participantes}` : '—'}</td>
                  <td className="px-4 py-3"><span className={estadoBadge(c.estado)}>{c.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </PageWrapper>
  )
}
