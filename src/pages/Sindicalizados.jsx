import { Shield, DollarSign, Users } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import KpiCard from '../components/KpiCard'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import PageWrapper from '../components/PageWrapper'
import ExportButton from '../components/ExportButton'

export default function Sindicalizados() {
  const { sede, sindicalizados } = useFiltrarPorSede()

  const totalCuotas = sindicalizados.reduce((s, p) => s + p.cuotaMensual, 0)
  const porSindicato = sindicalizados.reduce((acc, p) => {
    acc[p.sindicato] = (acc[p.sindicato] || 0) + 1
    return acc
  }, {})
  const sindicatoData = Object.entries(porSindicato).map(([name, value]) => ({ name, value }))
  const sindicatoColors = ['#2B6CB0', '#E53E3E']

  const cuotaData = sindicalizados.map(p => ({
    nombre: p.nombre.split(' ')[0],
    cuota: p.cuotaMensual
  })).sort((a, b) => b.cuota - a.cuota)

  const antiguedadData = sindicalizados.map(p => ({
    nombre: p.nombre.split(' ')[0],
    antiguedad: p.antiguedad
  })).sort((a, b) => b.antiguedad - a.antiguedad)

  const beneficioCount = sindicalizados.reduce((acc, p) => {
    p.beneficios.forEach(b => { acc[b] = (acc[b] || 0) + 1 })
    return acc
  }, {})
  const beneficioData = Object.entries(beneficioCount).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

  return (
    <PageWrapper>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Sindicalizados</h2>
          <p className="text-text-secondary text-sm">Personal afiliado — <span className="font-medium text-brand-600">{sede}</span></p>
        </div>
        <ExportButton data={sindicalizados} filename={`sindicalizados_${sede.replace(/\s+/g, '_')}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard icon={Users} label="Afiliados" value={sindicalizados.length} sub="Personal sindicalizado" color="brand" />
        <KpiCard icon={DollarSign} label="Cuotas Mensuales" value={`$${totalCuotas}`} sub="Recaudación total" color="success" />
        <KpiCard icon={Shield} label="Sindicatos" value={Object.keys(porSindicato).length} sub="Organizaciones activas" color="brand" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Por Sindicato</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={sindicatoData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {sindicatoData.map((_, i) => <Cell key={i} fill={sindicatoColors[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Cuota Mensual ($)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={cuotaData}>
              <XAxis dataKey="nombre" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip formatter={(v) => `$${v}`} />
              <Bar dataKey="cuota" fill="#2B6CB0" radius={[4, 4, 0, 0]} name="Cuota" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Beneficios Más Comunes</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={beneficioData} layout="vertical">
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={120} />
              <Tooltip />
              <Bar dataKey="value" fill="#38A169" radius={[0, 4, 4, 0]} name="Afiliados" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-base font-semibold">Detalle de Afiliados</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50 text-brand-700">
                <th className="text-left px-4 py-3 font-semibold">Nombre</th>
                <th className="text-left px-4 py-3 font-semibold">Cargo</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Sindicato</th>
                <th className="text-left px-4 py-3 font-semibold">Antigüedad</th>
                <th className="text-left px-4 py-3 font-semibold">Cuota</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Beneficios</th>
              </tr>
            </thead>
            <tbody>
              {sindicalizados.map((p, i) => (
                <tr key={p.id} className={`border-t border-border hover:bg-brand-50/30 transition-colors animate-stagger-row stagger-${Math.min(i + 1, 8)}`}>
                  <td className="px-4 py-3 font-medium">{p.nombre}</td>
                  <td className="px-4 py-3 text-text-secondary">{p.cargo}</td>
                  <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-600">{p.sindicato}</span>
                  </td>
                  <td className="px-4 py-3">{p.antiguedad} años</td>
                  <td className="px-4 py-3">${p.cuotaMensual}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.beneficios.map((b, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-success-50 text-success-600 rounded text-xs">{b}</span>
                      ))}
                    </div>
                  </td>
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
