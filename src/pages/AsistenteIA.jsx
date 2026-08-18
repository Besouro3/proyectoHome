import { useState } from 'react'
import { Bot, Send, User, HelpCircle } from 'lucide-react'
import useFiltrarPorSede from '../hooks/useFiltrarPorSede'
import { evaluaciones } from '../data/mockData'
import PageWrapper from '../components/PageWrapper'

const preguntasPredefinidas = [
  '¿Cuántos colaboradores activos hay en mi sede?',
  '¿Cuál es la tasa de rotación de mi sede?',
  '¿Cuántas capacitaciones hay en mi sede?',
  '¿Hay incidentes SST en mi sede?',
  '¿Cuántos auxilios están pendientes en mi sede?',
  '¿Cuántos sindicalizados hay en mi sede?',
  '¿Cuáles son los motivos de salida en mi sede?',
  '¿Cuántas horas de capacitación se han registrado?',
  '¿Cuál es el promedio de satisfacción de mi sede?',
  '¿Cuál es el promedio de evaluaciones de mi sede?'
]

export default function AsistenteIA() {
  const data = useFiltrarPorSede()
  const { sede, colaboradoresActivos, rotacion, capacitaciones, sstData, sindicalizados, auxilios, colaboradoresInactivos } = data

  const totalIngresos = rotacion.reduce((s, r) => s + r.ingresos, 0)
  const totalSalidas = rotacion.reduce((s, r) => s + r.salidas, 0)
  const satisfaccionProm = colaboradoresActivos.length > 0
    ? (colaboradoresActivos.reduce((s, c) => s + c.satisfaccion, 0) / colaboradoresActivos.length).toFixed(1)
    : 0

  const evalFiltradas = sede === 'Todas las sedes' ? evaluaciones : evaluaciones.filter(e => e.sede === sede)
  const evalProm = evalFiltradas.length > 0
    ? (evalFiltradas.reduce((s, e) => s + e.puntuacion, 0) / evalFiltradas.length).toFixed(1)
    : '0.0'

  const respuestas = {
    '¿Cuántos colaboradores activos hay en mi sede?': `En ${sede} hay ${colaboradoresActivos.length} colaboradores activos.`,
    '¿Cuál es la tasa de rotación de mi sede?': `La tasa promedio en ${sede} es de ${rotacion.length > 0 ? (rotacion.reduce((s, r) => s + r.tasa, 0) / rotacion.length).toFixed(1) : 0}%. ${totalIngresos} ingresos y ${totalSalidas} salidas este año.`,
    '¿Cuántas capacitaciones hay en mi sede?': `En ${sede} hay ${capacitaciones.length} capacitaciones: ${capacitaciones.filter(c => c.estado === 'Completada').length} completadas, ${capacitaciones.filter(c => c.estado === 'En curso').length} en curso, ${capacitaciones.filter(c => c.estado === 'Programada').length} programadas. Total: ${capacitaciones.reduce((s, c) => s + c.duracion, 0)} horas.`,
    '¿Hay incidentes SST en mi sede?': `En ${sede} hay ${sstData.indicadores.incidentesMes} incidentes con ${sstData.indicadores.diasPerdidos} días perdidos. ${sstData.indicadores.pendientesRevisar > 0 ? `${sstData.indicadores.pendientesRevisar} pendientes de revisión.` : 'Sin pendientes.'}`,
    '¿Cuántos auxilios están pendientes en mi sede?': `En ${sede} hay ${auxilios.filter(a => a.estado === 'Pendiente' || a.estado === 'En revisión').length} auxilios pendientes de ${auxilios.length} totales.`,
    '¿Cuántos sindicalizados hay en mi sede?': `En ${sede} hay ${sindicalizados.length} sindicalizados afiliados.`,
    '¿Cuáles son los motivos de salida en mi sede?': `Las salidas en ${sede} se deben a: ${colaboradoresInactivos.map(c => c.motivoSalida).filter(Boolean).join(', ') || 'Sin datos de salidas'}.`,
    '¿Cuántas horas de capacitación se han registrado?': `Se han registrado ${capacitaciones.reduce((s, c) => s + c.duracion, 0)} horas de capacitación en ${sede}.`,
    '¿Cuál es el promedio de satisfacción de mi sede?': `La satisfacción promedio en ${sede} es de ${satisfaccionProm}/5 (${colaboradoresActivos.length} colaboradores evaluados).`,
    '¿Cuál es el promedio de evaluaciones de mi sede?': `El promedio de desempeño en ${sede} es de ${evalProm}/5 basado en ${evalFiltradas.length} evaluaciones (${evalFiltradas.filter(e => e.puntuacion >= 4.5).length} excelentes).`
  }

  const [mensajes, setMensajes] = useState([
    { tipo: 'bot', texto: `¡Hola! Soy el asistente de RRHH de ${sede}. Puedo responder preguntas sobre los indicadores de tu sede.` }
  ])
  const [input, setInput] = useState('')

  const enviarPregunta = (pregunta) => {
    const nuevaPregunta = pregunta || input.trim()
    if (!nuevaPregunta) return

    setMensajes(prev => [...prev, { tipo: 'usuario', texto: nuevaPregunta }])
    setInput('')

    setTimeout(() => {
      const respuesta = respuestas[nuevaPregunta] || 'Lo siento, no tengo información sobre esa pregunta. Intenta con una de las sugeridas.'
      setMensajes(prev => [...prev, { tipo: 'bot', texto: respuesta }])
    }, 800)
  }

  return (
    <PageWrapper>
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Asistente IA</h2>
        <p className="text-text-secondary text-sm">Consultas de RRHH — <span className="font-medium text-brand-600">{sede}</span> (simulado)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={18} className="text-brand-600" />
            <h3 className="text-base font-semibold">Preguntas Sugeridas</h3>
          </div>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {preguntasPredefinidas.map((p, i) => (
              <button key={i} onClick={() => enviarPregunta(p)}
                className="w-full text-left px-3 py-2.5 text-sm bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg transition-colors">
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-surface-card rounded-xl border border-border shadow-sm flex flex-col h-[50vh] sm:h-[600px]">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Bot size={20} className="text-brand-600" />
            <h3 className="text-base font-semibold">Chat del Asistente</h3>
            <span className="ml-auto px-2 py-0.5 bg-success-50 text-success-600 rounded-full text-xs font-medium">Simulado</span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {mensajes.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                {m.tipo === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-brand-600" />
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  m.tipo === 'bot' ? 'bg-brand-50 text-text-primary rounded-tl-md' : 'bg-brand-600 text-white rounded-tr-md'
                }`}>
                  {m.texto}
                </div>
                {m.tipo === 'usuario' && (
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-t border-border">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && enviarPregunta()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
              <button onClick={() => enviarPregunta()}
                className="bg-brand-600 hover:bg-brand-700 text-white p-2.5 rounded-xl transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageWrapper>
  )
}
