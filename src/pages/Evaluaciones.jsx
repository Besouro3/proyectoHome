import { Award, Star, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, Cell, Legend } from 'recharts'
import KpiCard from '../components/KpiCard'
import { evaluaciones, colaboradores } from '../data/mockData'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import PageWrapper from '../components/PageWrapper'
import ExportButton from '../components/ExportButton'

export default function Evaluaciones() {
  const { sede } = useFiltrarPorSede()

  const evalFiltradas = sede === 'Todas las sedes'
    ? evaluaciones
    : evaluaciones.filter(e => e.sede === sede)

  const promedioGeneral = evalFiltradas.length > 0
    ? (evalFiltradas.reduce((s, e) => s + e.puntuacion, 0) / evalFiltradas.length).toFixed(1)
    : '0.0'

  const evaluados = new Set(evalFiltradas.map(e => e.empleadoId)).size
  const excelentes = evalFiltradas.filter(e => e.puntuacion >= 4.5).length

  const trimestres = ['Q1 2024', 'Q2 2024', 'Q3 2024']

  const porTrimestre = trimestres.map(q => {
    const evals = evalFiltradas.filter(e => e.trimestre === q)
    return {
      trimestre: q,
      promedio: evals.length > 0 ? parseFloat((evals.reduce((s, e) => s + e.puntuacion, 0) / evals.length).toFixed(1)) : 0,
      cantidad: evals.length
    }
  })

  const empDeptoMap = {}
  colaboradores.forEach(c => { empDeptoMap[c.id] = c.departamento })

  const porDepto = ['Caja', 'Ventas', 'Bodega', 'Administración'].map(dept => {
    const evals = evalFiltradas.filter(e => empDeptoMap[e.empleadoId] === dept)
    return {
      departamento: dept,
      promedio: evals.length > 0 ? parseFloat((evals.reduce((s, e) => s + e.puntuacion, 0) / evals.length).toFixed(1)) : 0
    }
  }).filter(d => d.promedio > 0)

  const pieDeptoData = porDepto.map((d, i) => ({
    name: d.departamento,
    value: parseFloat(d.promedio.toFixed(1)),
    fill: ['#2B6CB0', '#38A169', '#D69E2E', '#E53E3E'][i % 4]
  }))

  const scatterData = evalFiltradas.map((e, idx) => ({
    x: trimestres.indexOf(e.trimestre),
    y: e.puntuacion,
    trimestre: e.trimestre,
    empleado: e.empleado,
    fill: e.puntuacion >= 4.5 ? '#38A169' : e.puntuacion >= 4.0 ? '#2B6CB0' : e.puntuacion >= 3.5 ? '#D69E2E' : '#E53E3E'
  }))

  return (
    <PageWrapper>
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Evaluaciones de Desempeño</h2>
          <p className="text-text-secondary text-sm">Evaluaciones trimestrales — <span className="font-medium text-brand-600">{sede}</span></p>
        </div>
        <ExportButton data={evalFiltradas} filename={`evaluaciones_${sede.replace(/\s+/g, '_')}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Award} label="Promedio General" value={`${promedioGeneral}/5`} sub="Puntuación promedio" color="brand" />
        <KpiCard icon={Star} label="Evaluados" value={evaluados} sub="Colaboradores únicos" color="success" />
        <KpiCard icon={TrendingUp} label="Excelentes" value={excelentes} sub="Puntuación ≥ 4.5" color="success" />
        <KpiCard icon={Award} label="Total Evaluaciones" value={evalFiltradas.length} sub="Evaluaciones registradas" color="brand" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Promedio por Trimestre</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={porTrimestre}>
              <XAxis dataKey="trimestre" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="promedio" fill="#2B6CB0" radius={[4, 4, 0, 0]} name="Promedio" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Promedio por Departamento</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieDeptoData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value" label={({ name, value }) => `${name}: ${value}`} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {pieDeptoData.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Pie>
              <Tooltip formatter={(value) => `${value}/5`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2 text-xs">
            {pieDeptoData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                <span className="text-text-secondary">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Puntuaciones por Trimestre</h3>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis type="number" dataKey="x" name="Trimestre" domain={[0, 2]} tickFormatter={(value) => trimestres[value] || ''} tick={{ fontSize: 11 }} />
              <YAxis type="number" dataKey="y" name="Puntuación" domain={[0, 5]} tick={{ fontSize: 11 }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ payload }) => {
                if (payload?.[0]) {
                  return <div className="bg-white p-2 border border-border rounded text-xs"><p>{payload[0].payload.empleado}</p><p>{payload[0].payload.trimestre}</p><p>Puntuación: {payload[0].payload.y}</p></div>
                }
                return null
              }} />
              <Scatter name="Evaluaciones" data={scatterData} fill="#2B6CB0">
                {scatterData.map((entry, index) => (
                  <Scatter key={index} name={entry.trimestre} data={[entry]} fill={entry.fill} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2 text-xs">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#38A169' }} /><span className="text-text-secondary">Excelente (≥4.5)</span></div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#2B6CB0' }} /><span className="text-text-secondary">Bueno (≥4.0)</span></div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#D69E2E' }} /><span className="text-text-secondary">Regular (≥3.5)</span></div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#E53E3E' }} /><span className="text-text-secondary">Mejorable (&lt;3.5)</span></div>
          </div>
        </div>
      </div>

      <div className="bg-surface-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-base font-semibold">Detalle de Evaluaciones</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50 text-brand-700">
                <th className="text-left px-4 py-3 font-semibold">Empleado</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Sede</th>
                <th className="text-left px-4 py-3 font-semibold">Trimestre</th>
                <th className="text-left px-4 py-3 font-semibold">Puntuación</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Fortalezas</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Áreas de Mejora</th>
              </tr>
            </thead>
            <tbody>
              {evalFiltradas.map((e, i) => {
                const puntColor = e.puntuacion >= 4.5 ? 'text-success-600' : e.puntuacion >= 4.0 ? 'text-brand-600' : e.puntuacion >= 3.5 ? 'text-warning-600' : 'text-danger-600'
                return (
                  <tr key={e.id} className={`border-t border-border hover:bg-brand-50/30 transition-colors animate-stagger-row stagger-${Math.min(i + 1, 8)}`}>
                    <td className="px-4 py-3 font-medium">{e.empleado}</td>
                    <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{e.sede}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-600">{e.trimestre}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${puntColor}`}>{e.puntuacion}</span>
                      <span className="text-text-secondary">/5</span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs hidden lg:table-cell">{e.fortalezas}</td>
                    <td className="px-4 py-3 text-text-secondary text-xs hidden lg:table-cell">{e.areasMejora}</td>
                  </tr>
                )
              })}
              {evalFiltradas.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-text-secondary">Sin evaluaciones registradas</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </PageWrapper>
  )
}
