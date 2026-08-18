import { TrendingDown, TrendingUp, ArrowRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend } from 'recharts'
import KpiCard from '../components/KpiCard'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import PageWrapper from '../components/PageWrapper'

export default function Rotacion() {
  const { sede, rotacion, colaboradoresInactivos } = useFiltrarPorSede()

  const totalIngresos = rotacion.reduce((s, r) => s + r.ingresos, 0)
  const totalSalidas = rotacion.reduce((s, r) => s + r.salidas, 0)
  const promedioTasa = rotacion.length > 0
    ? (rotacion.reduce((s, r) => s + r.tasa, 0) / rotacion.length).toFixed(1)
    : '0.0'

  const motivos = colaboradoresInactivos.reduce((acc, c) => {
    acc[c.motivoSalida] = (acc[c.motivoSalida] || 0) + 1
    return acc
  }, {})
  const motivosData = Object.entries(motivos).map(([name, value]) => ({ name, value }))

  return (
    <PageWrapper>
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Rotación de Personal</h2>
        <p className="text-text-secondary text-sm">Análisis de ingresos y salidas — <span className="font-medium text-brand-600">{sede}</span></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={TrendingUp} label="Ingresos Totales" value={totalIngresos} sub="Año 2024" color="success" />
        <KpiCard icon={TrendingDown} label="Salidas Totales" value={totalSalidas} sub="Año 2024" color="danger" />
        <KpiCard icon={ArrowRight} label="Tasa Promedio" value={`${promedioTasa}%`} sub="Rotación mensual" color="warning" />
        <KpiCard icon={ArrowRight} label="Flujo Neto" value={totalIngresos - totalSalidas} sub={`${totalIngresos >= totalSalidas ? 'Positivo' : 'Negativo'}`} color={totalIngresos >= totalSalidas ? 'success' : 'danger'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-base font-semibold mb-4">Ingresos vs Salidas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rotacion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="ingresos" fill="#38A169" name="Ingresos" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
              <Bar dataKey="salidas" fill="#E53E3E" name="Salidas" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-base font-semibold mb-4">Tasa de Rotación</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rotacion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="tasa" stroke="#2B6CB0" strokeWidth={2} dot={{ r: 4 }} name="Tasa %" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {motivosData.length > 0 && (
        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-base font-semibold mb-4">Motivos de Salida</h3>
          <div className="flex flex-wrap gap-3">
            {motivosData.map(m => (
              <div key={m.name} className="bg-danger-50 border border-danger-100 rounded-lg px-4 py-2">
                <span className="text-danger-700 font-medium">{m.name}</span>
                <span className="ml-2 text-danger-500">({m.value})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </PageWrapper>
  )
}
