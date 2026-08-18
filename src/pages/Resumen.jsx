import { Users, TrendingDown, GraduationCap, HeartPulse, AlertTriangle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import KpiCard from '../components/KpiCard'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import PageWrapper from '../components/PageWrapper'

export default function Resumen() {
  const { sede, colaboradoresActivos, colaboradoresInactivos, rotacion, capacitaciones, sstData, auxilios } = useFiltrarPorSede()

  const activos = colaboradoresActivos.length
  const inactivos = colaboradoresInactivos.length
  const capacitacionesCompletas = capacitaciones.filter(c => c.estado === 'Completada').length
  const auxiliosPendientes = auxilios.filter(a => a.estado === 'Pendiente' || a.estado === 'En revisión').length
  const satisfaccionProm = colaboradoresActivos.length > 0
    ? (colaboradoresActivos.reduce((s, c) => s + c.satisfaccion, 0) / colaboradoresActivos.length).toFixed(1)
    : 0

  const estadoData = [{ name: 'Activos', value: activos }, { name: 'Inactivos', value: inactivos }]
  const pieColors = ['#38A169', '#E53E3E']

  const cargoData = Object.entries(
    colaboradoresActivos.reduce((acc, c) => { acc[c.cargo] = (acc[c.cargo] || 0) + 1; return acc }, {})
  ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

  const contratoData = [
    { name: 'Indefinido', value: colaboradoresActivos.filter(c => c.tipoContrato === 'Indefinido').length },
    { name: 'Temporal', value: colaboradoresActivos.filter(c => c.tipoContrato === 'Temporal').length }
  ]
  const contratoColors = ['#2B6CB0', '#D69E2E']

  return (
    <PageWrapper>
    <div className="space-y-6 bg-white p-4 rounded-lg">
      <div>
        <h2 className="text-2xl font-bold text-black">Resumen General</h2>
        <p className="text-text-secondary text-sm">Vista consolidada — <span className="font-medium text-brand-600">{sede}</span></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard icon={Users} label="Colaboradores" value={activos} sub={`${inactivos} inactivos`} color="brand" />
        <KpiCard icon={TrendingDown} label="Rotación" value={`${sstData.indicadores.tasaFrecuencia}%`} sub="Tasa frecuencia" color="danger" />
        <KpiCard icon={GraduationCap} label="Capacitaciones" value={capacitacionesCompletas} sub="Completadas" color="success" />
        <KpiCard icon={HeartPulse} label="Incidentes SST" value={sstData.indicadores.incidentesMes} sub={`${sstData.indicadores.diasPerdidos} días perdidos`} color="warning" />
        <KpiCard icon={AlertTriangle} label="Satisfacción" value={`${satisfaccionProm}/5`} sub={`${auxiliosPendientes} auxilios pendientes`} color="brand" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Estado</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={estadoData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {estadoData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Por Cargo</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cargoData} layout="vertical">
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
              <Tooltip />
              <Bar dataKey="value" fill="#2B6CB0" radius={[0, 4, 4, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Tipo de Contrato</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={contratoData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {contratoData.map((_, i) => <Cell key={i} fill={contratoColors[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Ingresos vs Salidas 2024</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rotacion}>
              <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="ingresos" fill="#38A169" name="Ingresos" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
              <Bar dataKey="salidas" fill="#E53E3E" name="Salidas" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Satisfacción por Colaborador</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={colaboradoresActivos.slice(0, 12).map(c => ({ nombre: c.nombre.split(' ')[0], satisfaccion: c.satisfaccion }))}>
              <XAxis dataKey="nombre" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="satisfaccion" fill="#2B6CB0" radius={[4, 4, 0, 0]} name="Satisfacción" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </PageWrapper>
  )
}
