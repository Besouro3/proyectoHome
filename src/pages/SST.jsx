import { HeartPulse, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import KpiCard from '../components/KpiCard'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import PageWrapper from '../components/PageWrapper'

export default function SST() {
  const { sede, sstData } = useFiltrarPorSede()
  const { indicadores, incidentes, auditoria } = sstData

  const severidad = (g) => {
    const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium'
    if (g === 'Leve') return `${base} bg-warning-50 text-warning-600`
    if (g === 'Moderado') return `${base} bg-brand-50 text-brand-600`
    return `${base} bg-danger-50 text-danger-600`
  }

  const estadoAuditoria = (e) => {
    const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium'
    if (e === 'Cumple') return `${base} bg-success-50 text-success-600`
    if (e === 'No cumple') return `${base} bg-danger-50 text-danger-600`
    return `${base} bg-warning-50 text-warning-600`
  }

  const gravedadData = [
    { name: 'Leve', value: incidentes.filter(i => i.gravedad === 'Leve').length },
    { name: 'Moderado', value: incidentes.filter(i => i.gravedad === 'Moderado').length },
    { name: 'Grave', value: incidentes.filter(i => i.gravedad === 'Grave').length }
  ]
  const gravedadColors = ['#D69E2E', '#2B6CB0', '#E53E3E']

  const auditoriaData = [
    { name: 'Cumple', value: auditoria.filter(a => a.estado === 'Cumple').length },
    { name: 'No cumple', value: auditoria.filter(a => a.estado === 'No cumple').length },
    { name: 'En revisión', value: auditoria.filter(a => a.estado === 'En revisión').length }
  ]
  const auditoriaColors = ['#38A169', '#E53E3E', '#D69E2E']

  return (
    <PageWrapper>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Seguridad y Salud en el Trabajo</h2>
        <p className="text-text-secondary text-sm">Incidentes, auditoría y cumplimiento — <span className="font-medium text-brand-600">{sede}</span></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard icon={AlertTriangle} label="Incidentes" value={indicadores.incidentesMes} sub="Registrados" color="danger" />
        <KpiCard icon={Clock} label="Días Perdidos" value={indicadores.diasPerdidos} sub="Por incidentes" color="warning" />
        <KpiCard icon={HeartPulse} label="Tasa Frecuencia" value={`${indicadores.tasaFrecuencia}%`} sub="Índice" color="brand" />
        <KpiCard icon={CheckCircle} label="Cap. SST" value={indicadores.capacitacionesSST} sub="Realizadas" color="success" />
        <KpiCard icon={AlertTriangle} label="Pendientes" value={indicadores.pendientesRevisar} sub="Requieren acción" color="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Incidentes por Gravedad</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={gravedadData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {gravedadData.map((_, i) => <Cell key={i} fill={gravedadColors[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Auditoría SST</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={auditoriaData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {auditoriaData.map((_, i) => <Cell key={i} fill={auditoriaColors[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Resumen</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-text-secondary">Total incidentes</span><span className="font-medium">{incidentes.length}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Cerrados</span><span className="font-medium text-success-600">{incidentes.filter(i => i.estado === 'Cerrado').length}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">En seguimiento</span><span className="font-medium text-warning-600">{incidentes.filter(i => i.estado === 'En seguimiento').length}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Items auditoría</span><span className="font-medium">{auditoria.length}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Cumple</span><span className="font-medium text-success-600">{auditoria.filter(a => a.estado === 'Cumple').length}</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-base font-semibold">Incidentes</h3>
          </div>
          <div className="divide-y divide-border">
            {incidentes.length > 0 ? incidentes.map(inc => (
              <div key={inc.id} className="px-5 py-4 hover:bg-brand-50/30 transition-colors">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <span className="font-medium text-sm">{inc.empleado}</span>
                    <span className="mx-2 text-text-secondary">·</span>
                    <span className="text-sm text-text-secondary">{inc.tipo}</span>
                  </div>
                  <span className={severidad(inc.gravedad)}>{inc.gravedad}</span>
                </div>
                <p className="text-xs text-text-secondary">{inc.descripcion}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                  <span>{inc.fecha}</span>
                  <span className={`font-medium ${inc.estado === 'Cerrado' ? 'text-success-600' : 'text-warning-600'}`}>{inc.estado}</span>
                </div>
              </div>
            )) : (
              <div className="px-5 py-8 text-center text-text-secondary text-sm">Sin incidentes registrados</div>
            )}
          </div>
        </div>

        <div className="bg-surface-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-base font-semibold">Auditoría (General)</h3>
          </div>
          <div className="divide-y divide-border">
            {auditoria.map((a, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-brand-50/30 transition-colors">
                <span className="text-sm font-medium">{a.item}</span>
                <span className={estadoAuditoria(a.estado)}>{a.estado}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </PageWrapper>
  )
}
