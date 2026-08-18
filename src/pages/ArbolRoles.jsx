import { Network } from 'lucide-react'
import { arbolRoles } from '../data/mockData'
import PageWrapper from '../components/PageWrapper'

function NodoArbol({ nodo, nivel = 0 }) {
  const colores = ['bg-brand-700', 'bg-brand-600', 'bg-brand-500', 'bg-brand-400']
  const color = colores[Math.min(nivel, colores.length - 1)]

  return (
    <div className="flex flex-col items-center">
      <div className={`px-4 py-2.5 rounded-xl text-white text-center shadow-md ${color} min-w-[180px]`}>
        <p className="font-semibold text-sm">{nodo.nombre}</p>
        <p className="text-xs opacity-80">{nodo.area}</p>
        <p className="text-xs mt-1 opacity-90">{nodo.personas.length} {nodo.personas.length === 1 ? 'persona' : 'personas'}</p>
      </div>
      {nivel < 2 && (
        <div className="text-xs text-text-secondary mt-1 mb-1">
          {nodo.personas.slice(0, 3).join(', ')}{nodo.personas.length > 3 ? ` +${nodo.personas.length - 3}` : ''}
        </div>
      )}

      {nodo.hijos && nodo.hijos.length > 0 && (
        <>
          <div className="w-0.5 h-6 bg-brand-300" />
          <div className="flex gap-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-brand-300" style={{ width: 'calc(100% - 20%)' }} />
            {nodo.hijos.map((hijo, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-0.5 h-6 bg-brand-300" />
                <NodoArbol nodo={hijo} nivel={nivel + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function ArbolRoles() {
  return (
    <PageWrapper>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Árbol de Roles</h2>
        <p className="text-text-secondary text-sm">Estructura organizacional de la empresa</p>
      </div>

      <div className="bg-surface-card rounded-xl border border-border p-6 shadow-sm overflow-x-auto">
        <div className="min-w-[800px] flex justify-center">
          <NodoArbol nodo={arbolRoles} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-surface-card rounded-xl border border-border p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-brand-700 mb-2">Niveles Jerárquicos</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-brand-700" /><span>Dirección → 1 nivel</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-brand-600" /><span>Gerencia → 4 personas</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-brand-500" /><span>Supervisión → 5 personas</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-brand-400" /><span>Operaciones → 25 personas</span></div>
          </div>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-brand-700 mb-2">Resumen por Área</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-text-secondary">Caja</span><span className="font-medium">13 personas</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Ventas</span><span className="font-medium">10 personas</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Bodega</span><span className="font-medium">7 personas</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Supervisión</span><span className="font-medium">5 personas</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Gerencia</span><span className="font-medium">4 personas</span></div>
          </div>
        </div>

        <div className="bg-surface-card rounded-xl border border-border p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-brand-700 mb-2">Observaciones</h4>
          <ul className="text-sm text-text-secondary space-y-1.5">
            <li>• Estructura jerárquica de 4 niveles</li>
            <li>• Ratio supervisión: 1:5</li>
            <li>• Cada tienda tiene su propio gerente</li>
            <li>• Áreas de mayor personal: Caja y Ventas</li>
          </ul>
        </div>
      </div>
    </div>
    </PageWrapper>
  )
}
