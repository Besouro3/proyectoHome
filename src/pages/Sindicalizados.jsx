import { Shield, DollarSign, Users, FileText, AlertCircle, CheckCircle, Clock, TrendingUp, Building2 } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import KpiCard from '../components/KpiCard'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import PageWrapper from '../components/PageWrapper'
import ExportButton from '../components/ExportButton'
import { acuerdosColectivos, gestionesSindicato } from '../data/mockData'

export default function Sindicalizados() {
  const { sede, sindicalizados } = useFiltrarPorSede()

  const totalCuotas = sindicalizados.reduce((s, p) => s + p.cuotaMensual, 0)
  const porSindicato = sindicalizados.reduce((acc, p) => {
    acc[p.sindicato] = (acc[p.sindicato] || 0) + 1
    return acc
  }, {})
  const sindicatoData = Object.entries(porSindicato).map(([name, value]) => ({ name, value }))
  const sindicatoColors = ['#2B6CB0', '#E53E3E']

  const porDepartamento = sindicalizados.reduce((acc, p) => {
    acc[p.departamento] = (acc[p.departamento] || 0) + 1
    return acc
  }, {})
  const deptoData = Object.entries(porDepartamento).map(([name, value]) => ({ name, value }))
  const deptoColors = ['#2B6CB0', '#38A169', '#E53E3E', '#D69E2E', '#805AD5']

  const porContrato = sindicalizados.reduce((acc, p) => {
    acc[p.tipoContrato] = (acc[p.tipoContrato] || 0) + 1
    return acc
  }, {})
  const contratoData = Object.entries(porContrato).map(([name, value]) => ({ name, value }))

  const cuotaData = sindicalizados.map(p => ({
    nombre: p.nombre.split(' ')[0],
    cuota: p.cuotaMensual
  })).sort((a, b) => b.cuota - a.cuota)

  const evaluacionData = sindicalizados.map(p => ({
    nombre: p.nombre.split(' ')[0],
    puntuacion: p.evaluaciones
  })).sort((a, b) => b.puntuacion - a.puntuacion)

  const beneficioCount = sindicalizados.reduce((acc, p) => {
    p.beneficios.forEach(b => { acc[b] = (acc[b] || 0) + 1 })
    return acc
  }, {})
  const beneficioData = Object.entries(beneficioCount).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

  const totalReclamaciones = sindicalizados.reduce((s, p) => s + p.reclamaciones, 0)
  const promedioEvaluacion = sindicalizados.length > 0
    ? (sindicalizados.reduce((s, p) => s + p.evaluaciones, 0) / sindicalizados.length).toFixed(1)
    : '0.0'

  const gestiones = gestionesSindicato.filter(g => sede === 'Todas las sedes' || true)
  const gestionesEnProceso = gestiones.filter(g => g.estado === 'En proceso').length
  const gestionesResueltas = gestiones.filter(g => g.estado === 'Resuelto' || g.estado === 'Aprobado').length

  return (
    <PageWrapper>
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Sindicalizados</h2>
          <p className="text-text-secondary text-sm">Gestión humana y afiliación — <span className="font-medium text-brand-600">{sede}</span></p>
        </div>
        <ExportButton data={sindicalizados} filename={`sindicalizados_${sede.replace(/\s+/g, '_')}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Users} label="Afiliados" value={sindicalizados.length} sub="Personal sindicalizado" color="brand" />
        <KpiCard icon={DollarSign} label="Cuotas Mensuales" value={`$${totalCuotas}`} sub="Recaudación total" color="success" />
        <KpiCard icon={Building2} label="Sindicatos" value={Object.keys(porSindicato).length} sub="Organizaciones activas" color="brand" />
        <KpiCard icon={TrendingUp} label="Evaluación Prom." value={promedioEvaluacion} sub="Desempeño afiliados" color="warning" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={FileText} label="Acuerdos Vigentes" value={acuerdosColectivos.filter(a => a.estado === 'Vigente').length} sub="Convenios activos" color="brand" />
        <KpiCard icon={Clock} label="Gestiones Pendientes" value={gestionesEnProceso} sub="Reclamaciones/negociaciones" color="warning" />
        <KpiCard icon={CheckCircle} label="Gestiones Resueltas" value={gestionesResueltas} sub="Este período" color="success" />
        <KpiCard icon={AlertCircle} label="Reclamaciones" value={totalReclamaciones} sub="Afiliados con reclamos" color="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Por Sindicato</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={sindicatoData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {sindicatoData.map((_, i) => <Cell key={i} fill={sindicatoColors[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Por Departamento</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={deptoData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                {deptoData.map((_, i) => <Cell key={i} fill={deptoColors[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Tipo de Contrato</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={contratoData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`} isAnimationActive={true} animationDuration={800} animationEasing="ease-out">
                <Cell fill="#38A169" />
                <Cell fill="#D69E2E" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Cuota Mensual por Afiliado ($)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cuotaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="nombre" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip formatter={(v) => `$${v}`} />
              <Bar dataKey="cuota" fill="#2B6CB0" radius={[4, 4, 0, 0]} name="Cuota" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Evaluación por Afiliado</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={evaluacionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="nombre" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="puntuacion" fill="#38A169" radius={[4, 4, 0, 0]} name="Puntuación" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
        <h3 className="text-base font-semibold mb-4">Beneficios Más Comunes</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={beneficioData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
            <Tooltip />
            <Bar dataKey="value" fill="#38A169" radius={[0, 4, 4, 0]} name="Afiliados" isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-surface-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-base font-semibold">Acuerdos Colectivos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50 text-brand-700">
                <th className="text-left px-4 py-3 font-semibold">Sindicato</th>
                <th className="text-left px-4 py-3 font-semibold">Acuerdo</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Período</th>
                <th className="text-left px-4 py-3 font-semibold">Estado</th>
                <th className="text-right px-4 py-3 font-semibold hidden lg:table-cell">Impacto</th>
              </tr>
            </thead>
            <tbody>
              {acuerdosColectivos.map((a, i) => (
                <tr key={a.id} className={`border-t border-border hover:bg-brand-50/30 transition-colors animate-stagger-row stagger-${Math.min(i + 1, 8)}`}>
                  <td className="px-4 py-3 font-medium">{a.sindicato}</td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="font-medium">{a.titulo}</span>
                      <p className="text-xs text-text-secondary mt-0.5">{a.descripcion}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary hidden md:table-cell text-xs">
                    {a.fechaInicio} — {a.fechaFin}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      a.estado === 'Vigente' ? 'bg-success-50 text-success-600' :
                      a.estado === 'Finalizado' ? 'bg-gray-100 text-gray-600' :
                      'bg-warning-50 text-warning-600'
                    }`}>{a.estado}</span>
                  </td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell font-medium">${a.montoImpacto.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-surface-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-base font-semibold">Gestiones Sindicales</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50 text-brand-700">
                <th className="text-left px-4 py-3 font-semibold">Fecha</th>
                <th className="text-left px-4 py-3 font-semibold">Tipo</th>
                <th className="text-left px-4 py-3 font-semibold">Sindicato</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Empleado</th>
                <th className="text-left px-4 py-3 font-semibold">Descripción</th>
                <th className="text-left px-4 py-3 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {gestiones.map((g, i) => (
                <tr key={g.id} className={`border-t border-border hover:bg-brand-50/30 transition-colors animate-stagger-row stagger-${Math.min(i + 1, 8)}`}>
                  <td className="px-4 py-3 text-xs">{g.fecha}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      g.tipo === 'Reclamación' ? 'bg-danger-50 text-danger-600' :
                      g.tipo === 'Negociación' ? 'bg-warning-50 text-warning-600' :
                      g.tipo === 'Capacitación' ? 'bg-brand-50 text-brand-600' :
                      'bg-success-50 text-success-600'
                    }`}>{g.tipo}</span>
                  </td>
                  <td className="px-4 py-3 font-medium">{g.sindicato}</td>
                  <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{g.empleado || '—'}</td>
                  <td className="px-4 py-3 text-xs max-w-xs truncate">{g.descripcion}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      g.estado === 'Resuelto' || g.estado === 'Aprobado' ? 'bg-success-50 text-success-600' :
                      g.estado === 'En proceso' ? 'bg-warning-50 text-warning-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>{g.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Cargo</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Depto</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Sindicato</th>
                <th className="text-left px-4 py-3 font-semibold">Antig.</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Contrato</th>
                <th className="text-left px-4 py-3 font-semibold">Cuota</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Evaluación</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Beneficios</th>
              </tr>
            </thead>
            <tbody>
              {sindicalizados.map((p, i) => (
                <tr key={p.id} className={`border-t border-border hover:bg-brand-50/30 transition-colors animate-stagger-row stagger-${Math.min(i + 1, 8)}`}>
                  <td className="px-4 py-3 font-medium">{p.nombre}</td>
                  <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">{p.cargo}</td>
                  <td className="px-4 py-3 text-text-secondary hidden md:table-cell text-xs">{p.departamento}</td>
                  <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-600">{p.sindicato}</span>
                  </td>
                  <td className="px-4 py-3">{p.antiguedad} años</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.tipoContrato === 'Indefinido' ? 'bg-success-50 text-success-600' : 'bg-warning-50 text-warning-600'
                    }`}>{p.tipoContrato}</span>
                  </td>
                  <td className="px-4 py-3">${p.cuotaMensual}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`font-medium ${
                      p.evaluaciones >= 4.5 ? 'text-success-600' :
                      p.evaluaciones >= 3.5 ? 'text-brand-600' :
                      'text-warning-600'
                    }`}>{p.evaluaciones}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.beneficios.map((b, j) => (
                        <span key={j} className="px-1.5 py-0.5 bg-success-50 text-success-600 rounded text-xs">{b}</span>
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
