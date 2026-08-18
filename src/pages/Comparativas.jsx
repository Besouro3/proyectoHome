import { GitCompare, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts'
import { comparativas } from '../data/mockData'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import PageWrapper from '../components/PageWrapper'

export default function Comparativas() {
  const { sede } = useFiltrarPorSede()
  const { porSede, promedioGeneral } = comparativas

  const indicadores = ['rotacion', 'satisfaccion', 'ausentismo', 'capacitaciones']
  const indicadorLabels = { rotacion: 'Rotación (%)', satisfaccion: 'Satisfacción', ausentismo: 'Ausentismo (%)', capacitaciones: 'Capacitaciones' }

  const radarData = indicadores.map(ind => {
    const entry = { indicador: indicadorLabels[ind] }
    porSede.forEach(s => {
      const key = s.sede.split(' ').slice(0, 2).join(' ')
      entry[key] = s[ind]
    })
    return entry
  })

  const comparativaData = porSede.map(s => ({
    sede: s.sede.split(' ').slice(0, 2).join(' '),
    colaboradores: s.colaboradores,
    rotacion: s.rotacion,
    satisfaccion: s.satisfaccion,
    ausentismo: s.ausentismo,
    capacitaciones: s.capacitaciones
  }))

  const sedeColors = ['#2B6CB0', '#E53E3E', '#38A169']

  return (
    <PageWrapper>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Comparativas</h2>
        <p className="text-text-secondary text-sm">
          Tu sede: <span className="font-medium text-brand-600">{sede}</span> vs las demás
        </p>
      </div>

      <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
        <h3 className="text-base font-semibold mb-4">Resumen por Sede</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50 text-brand-700">
                <th className="text-left px-4 py-3 font-semibold">Sede</th>
                <th className="text-center px-4 py-3 font-semibold">Colaboradores</th>
                <th className="text-center px-4 py-3 font-semibold">Rotación (%)</th>
                <th className="text-center px-4 py-3 font-semibold">Capacitaciones</th>
                <th className="text-center px-4 py-3 font-semibold">Satisfacción</th>
                <th className="text-center px-4 py-3 font-semibold">Ausentismo (%)</th>
              </tr>
            </thead>
            <tbody>
              {porSede.map((s, i) => {
                const esMiSede = s.sede === sede
                return (
                  <tr key={i} className={`border-t border-border transition-colors ${
                    esMiSede ? 'bg-brand-50/70 font-semibold' : 'hover:bg-brand-50/30'
                  }`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {esMiSede && <div className="w-2 h-2 rounded-full bg-brand-500" />}
                        <span>{s.sede}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{s.colaboradores}</td>
                    <td className="px-4 py-3 text-center">{s.rotacion}%</td>
                    <td className="px-4 py-3 text-center">{s.capacitaciones}</td>
                    <td className="px-4 py-3 text-center">{s.satisfaccion}</td>
                    <td className="px-4 py-3 text-center">{s.ausentismo}%</td>
                  </tr>
                )
              })}
              <tr className="border-t-2 border-brand-200 bg-brand-50/50 font-semibold">
                <td className="px-4 py-3">Promedio General</td>
                <td className="px-4 py-3 text-center">{promedioGeneral.colaboradores}</td>
                <td className="px-4 py-3 text-center">{promedioGeneral.rotacion}%</td>
                <td className="px-4 py-3 text-center">{promedioGeneral.capacitaciones}</td>
                <td className="px-4 py-3 text-center">{promedioGeneral.satisfaccion}</td>
                <td className="px-4 py-3 text-center">{promedioGeneral.ausentismo}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-base font-semibold mb-4">Comparativa de Indicadores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparativaData}>
              <XAxis dataKey="sede" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rotacion" name="Rotación %" fill="#E53E3E" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
              <Bar dataKey="satisfaccion" name="Satisfacción" fill="#38A169" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
              <Bar dataKey="ausentismo" name="Ausentismo %" fill="#D69E2E" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-base font-semibold mb-4">Perfil por Sede (Radar)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="indicador" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis />
              {porSede.map((s, i) => (
                <Radar
                  key={i}
                  name={s.sede.split(' ').slice(0, 2).join(' ')}
                  dataKey={s.sede.split(' ').slice(0, 2).join(' ')}
                  stroke={sedeColors[i]}
                  fill={sedeColors[i]}
                  fillOpacity={0.15}
                  strokeWidth={s.sede === sede ? 3 : 1.5}
                  isAnimationActive={true}
                  animationDuration={800}
                  animationEasing="ease-out"
                />
              ))}
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {porSede.map((s, i) => {
          const esMiSede = s.sede === sede
          const mejorEn = []
          const peorEn = []
          if (s.rotacion === Math.min(...porSede.map(x => x.rotacion))) mejorEn.push('Menor rotación')
          if (s.rotacion === Math.max(...porSede.map(x => x.rotacion))) peorEn.push('Mayor rotación')
          if (s.satisfaccion === Math.max(...porSede.map(x => x.satisfaccion))) mejorEn.push('Mayor satisfacción')
          if (s.ausentismo === Math.min(...porSede.map(x => x.ausentismo))) mejorEn.push('Menor ausentismo')
          if (s.ausentismo === Math.max(...porSede.map(x => x.ausentismo))) peorEn.push('Mayor ausentismo')

          return (
            <div key={i} className={`bg-surface-card rounded-xl border p-4 shadow-sm ${
              esMiSede ? 'border-brand-400 ring-1 ring-brand-200' : 'border-border'
            }`}>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                {s.sede}
                {esMiSede && <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">Tu sede</span>}
              </h4>
              <div className="space-y-1.5 text-xs">
                {mejorEn.map((m, j) => (
                  <div key={j} className="flex items-center gap-1.5 text-success-600">
                    <TrendingUp size={12} /> <span>{m}</span>
                  </div>
                ))}
                {peorEn.map((p, j) => (
                  <div key={j} className="flex items-center gap-1.5 text-danger-600">
                    <TrendingDown size={12} /> <span>{p}</span>
                  </div>
                ))}
                {mejorEn.length === 0 && peorEn.length === 0 && (
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <Minus size={12} /> <span>Sin diferencias extremas</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
    </PageWrapper>
  )
}
