import { useSede } from '../context/SedeContext'
import { colaboradores, rotacion, capacitaciones, sindicalizados, sstData, auxilios } from '../data/mockData'

export default function useFiltrarPorSede() {
  const { sede } = useSede()

  if (sede === 'Todas') {
    const activos = colaboradores.filter(c => c.estado === 'Activo')
    const inactivos = colaboradores.filter(c => c.estado === 'Inactivo')
    return {
      sede: 'Todas las sedes',
      colaboradores,
      colaboradoresActivos: activos,
      colaboradoresInactivos: inactivos,
      rotacion,
      capacitaciones,
      sindicalizados,
      sstData,
      auxilios
    }
  }

  const colaboradoresFiltrados = colaboradores.filter(c => c.sede === sede)
  const activos = colaboradoresFiltrados.filter(c => c.estado === 'Activo')
  const inactivos = colaboradoresFiltrados.filter(c => c.estado === 'Inactivo')
  const rotacionFiltrada = rotacion.filter(r => r.sede === sede)
  const capacitacionesFiltradas = capacitaciones.filter(c => c.sede === sede)
  const sindicalizadosFiltrados = sindicalizados.filter(s => s.sede === sede)
  const incidentesFiltrados = sstData.incidentes.filter(i => i.sede === sede)
  const auxiliosFiltrados = auxilios.filter(a => a.sede === sede)

  const sstFiltrado = {
    indicadores: {
      incidentesMes: incidentesFiltrados.length,
      diasPerdidos: incidentesFiltrados.reduce((s, i) => s + (i.gravedad === 'Grave' ? 10 : i.gravedad === 'Moderado' ? 3 : 1), 0),
      tasaFrecuencia: activos.length > 0 ? ((incidentesFiltrados.length / activos.length) * 100).toFixed(1) : 0,
      capacitacionesSST: capacitacionesFiltradas.filter(c => c.nombre.toLowerCase().includes('seguridad') || c.nombre.toLowerCase().includes('primeros')).length,
      pendientesRevisar: incidentesFiltrados.filter(i => i.estado !== 'Cerrado').length
    },
    incidentes: incidentesFiltrados,
    auditoria: sstData.auditoria
  }

  return {
    sede,
    colaboradores: colaboradoresFiltrados,
    colaboradoresActivos: activos,
    colaboradoresInactivos: inactivos,
    rotacion: rotacionFiltrada,
    capacitaciones: capacitacionesFiltradas,
    sindicalizados: sindicalizadosFiltrados,
    sstData: sstFiltrado,
    auxilios: auxiliosFiltrados
  }
}
