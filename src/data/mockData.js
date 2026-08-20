import {
  BarChart3, Users, TrendingDown, GraduationCap, Shield,
  HeartPulse, Gift, Award, Network, Bot, GitCompare
} from 'lucide-react'

export const sedes = [
  { id: 1, nombre: 'Av. Principal 123' },
  { id: 2, nombre: 'Calle Norte 456' },
  { id: 3, nombre: 'Av. Libertador 789' }
]

export const colaboradores = [
  { id: 1, nombre: 'Ana García', cargo: 'Cajera', departamento: 'Caja', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2022-03-15', salario: 2800, antiguedad: 3, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 2, nombre: 'Carlos Ruiz', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2021-07-20', salario: 3200, antiguedad: 4, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 3, nombre: 'María López', cargo: 'Supervisora', departamento: 'Administración', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2020-01-10', salario: 4500, antiguedad: 5, tipoContrato: 'Indefinido', satisfaccion: 5 },
  { id: 4, nombre: 'Pedro Sánchez', cargo: 'Vendedor', departamento: 'Ventas', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2023-06-01', salario: 2600, antiguedad: 2, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 5, nombre: 'Laura Martínez', cargo: 'Cajera', departamento: 'Caja', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2022-09-12', salario: 2800, antiguedad: 3, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 6, nombre: 'Roberto Díaz', cargo: 'Gerente Tienda', departamento: 'Administración', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2019-04-05', salario: 6500, antiguedad: 6, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 7, nombre: 'Sofía Torres', cargo: 'Vendedora', departamento: 'Ventas', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2023-02-18', salario: 2600, antiguedad: 2, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 8, nombre: 'Miguel Herrera', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2021-11-30', salario: 3200, antiguedad: 4, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 9, nombre: 'Carmen Vargas', cargo: 'Cajera', departamento: 'Caja', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2022-05-22', salario: 2800, antiguedad: 3, tipoContrato: 'Indefinido', satisfaccion: 5 },
  { id: 10, nombre: 'José Morales', cargo: 'Supervisor', departamento: 'Administración', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2020-08-14', salario: 4500, antiguedad: 5, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 11, nombre: 'Isabel Flores', cargo: 'Vendedora', departamento: 'Ventas', sede: 'Av. Principal 123', estado: 'Inactivo', fechaIngreso: '2021-03-10', fechaSalida: '2024-01-15', salario: 2600, antiguedad: 3, tipoContrato: 'Temporal', motivoSalida: 'Renuncia voluntaria', satisfaccion: 2 },
  { id: 12, nombre: 'Fernando Reyes', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Av. Principal 123', estado: 'Inactivo', fechaIngreso: '2022-01-05', fechaSalida: '2024-06-20', salario: 3000, antiguedad: 2, tipoContrato: 'Temporal', motivoSalida: 'Fin de contrato', satisfaccion: 3 },
  { id: 13, nombre: 'Lucía Castillo', cargo: 'Cajera', departamento: 'Caja', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2023-08-01', salario: 2700, antiguedad: 1, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 14, nombre: 'Diego Navarro', cargo: 'Vendedor', departamento: 'Ventas', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2022-04-12', salario: 2900, antiguedad: 3, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 15, nombre: 'Patricia Romero', cargo: 'Supervisora', departamento: 'Administración', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2021-06-18', salario: 4200, antiguedad: 4, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 16, nombre: 'Ricardo Ortega', cargo: 'Gerente Tienda', departamento: 'Administración', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2019-09-01', salario: 6800, antiguedad: 6, tipoContrato: 'Indefinido', satisfaccion: 5 },
  { id: 17, nombre: 'Valentina Cruz', cargo: 'Cajera', departamento: 'Caja', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2023-11-20', salario: 2600, antiguedad: 1, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 18, nombre: 'Andrés Medina', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2022-07-08', salario: 3100, antiguedad: 3, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 19, nombre: 'Gloria Peña', cargo: 'Vendedora', departamento: 'Ventas', sede: 'Av. Libertador 789', estado: 'Inactivo', fechaIngreso: '2020-12-01', fechaSalida: '2024-03-10', salario: 2800, antiguedad: 3, tipoContrato: 'Temporal', motivoSalida: 'Despido', satisfaccion: 1 },
  { id: 20, nombre: 'Oscar Jiménez', cargo: 'Cajero', departamento: 'Caja', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2021-10-25', salario: 3000, antiguedad: 4, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 21, nombre: 'Daniela Rojas', cargo: 'Vendedora', departamento: 'Ventas', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2023-04-15', salario: 2700, antiguedad: 2, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 22, nombre: 'Marcos Aguilar', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2022-02-28', salario: 3200, antiguedad: 3, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 23, nombre: 'Renata Guerrero', cargo: 'Supervisora', departamento: 'Administración', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2020-05-12', salario: 4400, antiguedad: 5, tipoContrato: 'Indefinido', satisfaccion: 5 },
  { id: 24, nombre: 'Héctor Salazar', cargo: 'Vendedor', departamento: 'Ventas', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2023-01-08', salario: 2600, antiguedad: 2, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 25, nombre: 'Adriana Luna', cargo: 'Cajera', departamento: 'Caja', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2022-08-16', salario: 2800, antiguedad: 3, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 26, nombre: 'Sergio Delgado', cargo: 'Gerente Tienda', departamento: 'Administración', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2018-03-20', salario: 7000, antiguedad: 7, tipoContrato: 'Indefinido', satisfaccion: 5 },
  { id: 27, nombre: 'Camila Espinoza', cargo: 'Vendedora', departamento: 'Ventas', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2023-09-10', salario: 2650, antiguedad: 1, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 28, nombre: 'Emilio Contreras', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Av. Principal 123', estado: 'Inactivo', fechaIngreso: '2021-04-05', fechaSalida: '2024-07-15', salario: 3100, antiguedad: 3, tipoContrato: 'Temporal', motivoSalida: 'Renuncia voluntaria', satisfaccion: 2 },
  { id: 29, nombre: 'Paola Vega', cargo: 'Cajera', departamento: 'Caja', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2022-11-01', salario: 2750, antiguedad: 2, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 30, nombre: 'Raúl Fuentes', cargo: 'Vendedor', departamento: 'Ventas', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2023-03-22', salario: 2600, antiguedad: 2, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 31, nombre: 'Natalia Soto', cargo: 'Supervisora', departamento: 'Administración', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2019-12-10', salario: 4600, antiguedad: 5, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 32, nombre: 'Alejandro Paz', cargo: 'Cajero', departamento: 'Caja', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2023-07-14', salario: 2600, antiguedad: 1, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 33, nombre: 'Claudia Miranda', cargo: 'Vendedora', departamento: 'Ventas', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2022-06-01', salario: 2850, antiguedad: 3, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 34, nombre: 'Tomás Reyes', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2021-08-20', salario: 3300, antiguedad: 4, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 35, nombre: 'Fernanda Castro', cargo: 'Cajera', departamento: 'Caja', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2023-10-05', salario: 2600, antiguedad: 1, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 36, nombre: 'Luis Herrera', cargo: 'Vendedor', departamento: 'Ventas', sede: 'Calle Norte 456', estado: 'Inactivo', fechaIngreso: '2022-01-15', fechaSalida: '2024-05-30', salario: 2700, antiguedad: 2, tipoContrato: 'Temporal', motivoSalida: 'Fin de contrato', satisfaccion: 2 },
  { id: 37, nombre: 'Paula Ríos', cargo: 'Supervisora', departamento: 'Administración', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2020-02-28', salario: 4300, antiguedad: 5, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 38, nombre: 'Javier Campos', cargo: 'Gerente Tienda', departamento: 'Administración', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2019-06-15', salario: 6600, antiguedad: 6, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 39, nombre: 'Gabriela Solís', cargo: 'Cajera', departamento: 'Caja', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2023-05-18', salario: 2650, antiguedad: 1, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 40, nombre: 'Raúl Montoya', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Av. Principal 123', estado: 'Activo', fechaIngreso: '2022-09-25', salario: 3100, antiguedad: 3, tipoContrato: 'Indefinido', satisfaccion: 4 },
  { id: 41, nombre: 'Catalina Vargas', cargo: 'Vendedora', departamento: 'Ventas', sede: 'Calle Norte 456', estado: 'Activo', fechaIngreso: '2023-12-01', salario: 2600, antiguedad: 1, tipoContrato: 'Temporal', satisfaccion: 3 },
  { id: 42, nombre: 'Mateo Silva', cargo: 'Cajero', departamento: 'Caja', sede: 'Av. Libertador 789', estado: 'Activo', fechaIngreso: '2022-10-10', salario: 2800, antiguedad: 2, tipoContrato: 'Indefinido', satisfaccion: 4 }
]

export const rotacion = [
  { mes: 'Ene', sede: 'Av. Principal 123', ingresos: 2, salidas: 1, tasa: 5.0 },
  { mes: 'Feb', sede: 'Av. Principal 123', ingresos: 1, salidas: 0, tasa: 0 },
  { mes: 'Mar', sede: 'Av. Principal 123', ingresos: 1, salidas: 1, tasa: 4.5 },
  { mes: 'Abr', sede: 'Av. Principal 123', ingresos: 1, salidas: 1, tasa: 4.5 },
  { mes: 'May', sede: 'Av. Principal 123', ingresos: 2, salidas: 0, tasa: 0 },
  { mes: 'Jun', sede: 'Av. Principal 123', ingresos: 1, salidas: 2, tasa: 9.1 },
  { mes: 'Jul', sede: 'Av. Principal 123', ingresos: 2, salidas: 1, tasa: 4.3 },
  { mes: 'Ago', sede: 'Av. Principal 123', ingresos: 2, salidas: 1, tasa: 4.3 },
  { mes: 'Sep', sede: 'Av. Principal 123', ingresos: 1, salidas: 0, tasa: 0 },
  { mes: 'Oct', sede: 'Av. Principal 123', ingresos: 2, salidas: 1, tasa: 4.2 },
  { mes: 'Nov', sede: 'Av. Principal 123', ingresos: 1, salidas: 1, tasa: 4.2 },
  { mes: 'Dic', sede: 'Av. Principal 123', ingresos: 2, salidas: 1, tasa: 4.1 },
  { mes: 'Ene', sede: 'Calle Norte 456', ingresos: 2, salidas: 1, tasa: 6.0 },
  { mes: 'Feb', sede: 'Calle Norte 456', ingresos: 1, salidas: 0, tasa: 0 },
  { mes: 'Mar', sede: 'Calle Norte 456', ingresos: 1, salidas: 1, tasa: 6.3 },
  { mes: 'Abr', sede: 'Calle Norte 456', ingresos: 1, salidas: 1, tasa: 6.3 },
  { mes: 'May', sede: 'Calle Norte 456', ingresos: 2, salidas: 0, tasa: 0 },
  { mes: 'Jun', sede: 'Calle Norte 456', ingresos: 1, salidas: 1, tasa: 6.3 },
  { mes: 'Jul', sede: 'Calle Norte 456', ingresos: 1, salidas: 1, tasa: 6.3 },
  { mes: 'Ago', sede: 'Calle Norte 456', ingresos: 2, salidas: 1, tasa: 6.1 },
  { mes: 'Sep', sede: 'Calle Norte 456', ingresos: 1, salidas: 1, tasa: 6.1 },
  { mes: 'Oct', sede: 'Calle Norte 456', ingresos: 1, salidas: 0, tasa: 0 },
  { mes: 'Nov', sede: 'Calle Norte 456', ingresos: 1, salidas: 1, tasa: 6.1 },
  { mes: 'Dic', sede: 'Calle Norte 456', ingresos: 2, salidas: 1, tasa: 5.9 },
  { mes: 'Ene', sede: 'Av. Libertador 789', ingresos: 1, salidas: 0, tasa: 0 },
  { mes: 'Feb', sede: 'Av. Libertador 789', ingresos: 1, salidas: 1, tasa: 3.8 },
  { mes: 'Mar', sede: 'Av. Libertador 789', ingresos: 2, salidas: 1, tasa: 3.7 },
  { mes: 'Abr', sede: 'Av. Libertador 789', ingresos: 0, salidas: 0, tasa: 0 },
  { mes: 'May', sede: 'Av. Libertador 789', ingresos: 2, salidas: 1, tasa: 3.7 },
  { mes: 'Jun', sede: 'Av. Libertador 789', ingresos: 1, salidas: 1, tasa: 3.7 },
  { mes: 'Jul', sede: 'Av. Libertador 789', ingresos: 1, salidas: 0, tasa: 0 },
  { mes: 'Ago', sede: 'Av. Libertador 789', ingresos: 1, salidas: 1, tasa: 3.7 },
  { mes: 'Sep', sede: 'Av. Libertador 789', ingresos: 0, salidas: 0, tasa: 0 },
  { mes: 'Oct', sede: 'Av. Libertador 789', ingresos: 1, salidas: 1, tasa: 3.7 },
  { mes: 'Nov', sede: 'Av. Libertador 789', ingresos: 1, salidas: 1, tasa: 3.7 },
  { mes: 'Dic', sede: 'Av. Libertador 789', ingresos: 1, salidas: 0, tasa: 0 }
]

export const capacitaciones = [
  { id: 1, nombre: 'Atención al Cliente', fecha: '2024-02-15', duracion: 8, participantes: 5, aprobados: 5, estado: 'Completada', instructor: 'María Pérez', sede: 'Av. Principal 123' },
  { id: 2, nombre: 'Seguridad e Higiene', fecha: '2024-03-20', duracion: 4, participantes: 7, aprobados: 7, estado: 'Completada', instructor: 'Juan Torres', sede: 'Calle Norte 456' },
  { id: 3, nombre: 'Manejo de Caja', fecha: '2024-04-10', duracion: 12, participantes: 4, aprobados: 4, estado: 'Completada', instructor: 'Laura Ruiz', sede: 'Av. Libertador 789' },
  { id: 4, nombre: 'Liderazgo', fecha: '2024-05-05', duracion: 16, participantes: 6, aprobados: 6, estado: 'Completada', instructor: 'Carlos Méndez', sede: 'Av. Principal 123' },
  { id: 5, nombre: 'Ventas y Negociación', fecha: '2024-06-12', duracion: 10, participantes: 5, aprobados: 4, estado: 'Completada', instructor: 'Ana García', sede: 'Calle Norte 456' },
  { id: 6, nombre: 'Uso de Sistemas POS', fecha: '2024-07-22', duracion: 6, participantes: 4, aprobados: 4, estado: 'Completada', instructor: 'Pedro López', sede: 'Av. Libertador 789' },
  { id: 7, nombre: 'Primeros Auxilios', fecha: '2024-08-15', duracion: 8, participantes: 6, aprobados: 6, estado: 'En curso', instructor: 'Dr. Roberto Sánchez', sede: 'Av. Principal 123' },
  { id: 8, nombre: 'Manejo de Conflictos', fecha: '2024-09-10', duracion: 6, participantes: 4, aprobados: 0, estado: 'Programada', instructor: 'Carmen Díaz', sede: 'Calle Norte 456' },
  { id: 9, nombre: 'Optimización de Espacios', fecha: '2024-10-01', duracion: 4, participantes: 3, aprobados: 0, estado: 'Programada', instructor: 'Miguel Torres', sede: 'Av. Libertador 789' },
  { id: 10, nombre: 'Atención al Cliente Nivel 2', fecha: '2024-11-15', duracion: 12, participantes: 0, aprobados: 0, estado: 'Programada', instructor: 'María Pérez', sede: 'Av. Principal 123' },
  { id: 11, nombre: 'Manejo de Inventarios', fecha: '2024-03-05', duracion: 8, participantes: 5, aprobados: 5, estado: 'Completada', instructor: 'Roberto Campos', sede: 'Av. Principal 123' },
  { id: 12, nombre: 'Comunicación Efectiva', fecha: '2024-05-18', duracion: 6, participantes: 8, aprobados: 7, estado: 'Completada', instructor: 'Laura Ruiz', sede: 'Calle Norte 456' },
  { id: 13, nombre: 'Protocolo de Emergencias', fecha: '2024-07-10', duracion: 4, participantes: 6, aprobados: 6, estado: 'Completada', instructor: 'Dr. Roberto Sánchez', sede: 'Av. Libertador 789' },
  { id: 14, nombre: 'Desarrollo de Equipo', fecha: '2024-09-20', duracion: 10, participantes: 4, aprobados: 0, estado: 'Programada', instructor: 'Carlos Méndez', sede: 'Av. Principal 123' }
]

export const sindicalizados = [
  { id: 1, nombre: 'Ana García', cargo: 'Cajera', departamento: 'Caja', sede: 'Av. Principal 123', sindicato: 'SITRAD', antiguedad: 3, cuotaMensual: 50, beneficios: ['Seguro médico', 'Bonificación navideña', 'Vacaciones +5 días'], fechaIngreso: '2022-03-15', tipoContrato: 'Indefinido', estado: 'Activo', reclamaciones: 0, evaluaciones: 4.2 },
  { id: 2, nombre: 'Carlos Ruiz', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Av. Principal 123', sindicato: 'SITRAD', antiguedad: 4, cuotaMensual: 50, beneficios: ['Seguro médico', 'Bonificación navideña', 'Vacaciones +5 días'], fechaIngreso: '2021-07-20', tipoContrato: 'Indefinido', estado: 'Activo', reclamaciones: 1, evaluaciones: 3.8 },
  { id: 3, nombre: 'María López', cargo: 'Supervisora', departamento: 'Administración', sede: 'Av. Principal 123', sindicato: 'SITRAD', antiguedad: 5, cuotaMensual: 65, beneficios: ['Seguro médico', 'Bonificación navideña', 'Vacaciones +5 días', 'Capacitación externa'], fechaIngreso: '2020-01-10', tipoContrato: 'Indefinido', estado: 'Activo', reclamaciones: 0, evaluaciones: 4.8 },
  { id: 4, nombre: 'Pedro Sánchez', cargo: 'Vendedor', departamento: 'Ventas', sede: 'Calle Norte 456', sindicato: 'SINDICAL', antiguedad: 2, cuotaMensual: 45, beneficios: ['Seguro médico', 'Bonificación navideña'], fechaIngreso: '2023-06-01', tipoContrato: 'Temporal', estado: 'Activo', reclamaciones: 0, evaluaciones: 3.2 },
  { id: 5, nombre: 'Laura Martínez', cargo: 'Cajera', departamento: 'Caja', sede: 'Calle Norte 456', sindicato: 'SINDICAL', antiguedad: 3, cuotaMensual: 45, beneficios: ['Seguro médico', 'Bonificación navideña', 'Vacaciones +5 días'], fechaIngreso: '2022-09-12', tipoContrato: 'Indefinido', estado: 'Activo', reclamaciones: 0, evaluaciones: 4.0 },
  { id: 6, nombre: 'Roberto Díaz', cargo: 'Gerente Tienda', departamento: 'Administración', sede: 'Calle Norte 456', sindicato: 'SINDICAL', antiguedad: 6, cuotaMensual: 80, beneficios: ['Seguro médico', 'Bonificación navideña', 'Vacaciones +5 días', 'Capacitación externa', 'Plan de jubilación'], fechaIngreso: '2019-04-05', tipoContrato: 'Indefinido', estado: 'Activo', reclamaciones: 0, evaluaciones: 4.5 },
  { id: 7, nombre: 'Sofía Torres', cargo: 'Vendedora', departamento: 'Ventas', sede: 'Av. Libertador 789', sindicato: 'SITRAD', antiguedad: 2, cuotaMensual: 45, beneficios: ['Seguro médico', 'Bonificación navideña'], fechaIngreso: '2023-02-18', tipoContrato: 'Temporal', estado: 'Activo', reclamaciones: 0, evaluaciones: 3.5 },
  { id: 8, nombre: 'Miguel Herrera', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Av. Libertador 789', sindicato: 'SITRAD', antiguedad: 4, cuotaMensual: 50, beneficios: ['Seguro médico', 'Bonificación navideña', 'Vacaciones +5 días'], fechaIngreso: '2021-11-30', tipoContrato: 'Indefinido', estado: 'Activo', reclamaciones: 0, evaluaciones: 4.0 },
  { id: 9, nombre: 'Oscar Jiménez', cargo: 'Cajero', departamento: 'Caja', sede: 'Calle Norte 456', sindicato: 'SINDICAL', antiguedad: 4, cuotaMensual: 50, beneficios: ['Seguro médico', 'Bonificación navideña', 'Vacaciones +5 días'], fechaIngreso: '2021-10-25', tipoContrato: 'Indefinido', estado: 'Activo', reclamaciones: 0, evaluaciones: 3.9 },
  { id: 10, nombre: 'Patricia Romero', cargo: 'Supervisora', departamento: 'Administración', sede: 'Av. Principal 123', sindicato: 'SITRAD', antiguedad: 4, cuotaMensual: 60, beneficios: ['Seguro médico', 'Bonificación navideña', 'Vacaciones +5 días'], fechaIngreso: '2021-06-18', tipoContrato: 'Indefinido', estado: 'Activo', reclamaciones: 0, evaluaciones: 4.4 },
  { id: 11, nombre: 'Daniela Rojas', cargo: 'Vendedora', departamento: 'Ventas', sede: 'Av. Principal 123', sindicato: 'SITRAD', antiguedad: 2, cuotaMensual: 45, beneficios: ['Seguro médico', 'Bonificación navideña'], fechaIngreso: '2023-04-15', tipoContrato: 'Temporal', estado: 'Activo', reclamaciones: 1, evaluaciones: 3.0 },
  { id: 12, nombre: 'Marcos Aguilar', cargo: 'Bodeguero', departamento: 'Bodega', sede: 'Av. Libertador 789', sindicato: 'SINDICAL', antiguedad: 3, cuotaMensual: 50, beneficios: ['Seguro médico', 'Bonificación navideña', 'Vacaciones +5 días'], fechaIngreso: '2022-02-28', tipoContrato: 'Indefinido', estado: 'Activo', reclamaciones: 0, evaluaciones: 4.0 }
]

export const acuerdosColectivos = [
  { id: 1, sindicato: 'SITRAD', titulo: 'Reajuste Salarial 2024', fechaInicio: '2024-01-01', fechaFin: '2024-12-31', estado: 'Vigente', descripcion: 'Aumento del 5% para todos los afiliados', montoImpacto: 12500 },
  { id: 2, sindicato: 'SINDICAL', titulo: 'Mejora Condiciones Bodega', fechaInicio: '2024-03-01', fechaFin: '2025-02-28', estado: 'Vigente', descripcion: 'Equipos de protección personal adicionales', montoImpacto: 3200 },
  { id: 3, sindicato: 'SITRAD', titulo: 'Capacitación Externa', fechaInicio: '2024-06-01', fechaFin: '2024-11-30', estado: 'Finalizado', descripcion: 'Programa de capacitación en ventas', montoImpacto: 8000 }
]

export const gestionesSindicato = [
  { id: 1, fecha: '2024-11-15', sindicato: 'SITRAD', tipo: 'Reclamación', empleado: 'Carlos Ruiz', descripcion: 'Solicitud de revisión de carga de trabajo en bodega', estado: 'Resuelto', fechaResolucion: '2024-11-25' },
  { id: 2, fecha: '2024-12-01', sindicato: 'SINDICAL', tipo: 'Negociación', empleado: null, descripcion: 'Revisión de tabla salarial para 2025', estado: 'En proceso', fechaResolucion: null },
  { id: 3, fecha: '2024-10-20', sindicato: 'SITRAD', tipo: 'Capacitación', empleado: null, descripcion: 'Solicitud de curso de seguridad industrial', estado: 'Aprobado', fechaResolucion: '2024-11-05' },
  { id: 4, fecha: '2024-12-05', sindicato: 'SINDICAL', tipo: 'Reclamación', empleado: 'Daniela Rojas', descripcion: 'Horas extras no pagadas octubre', estado: 'En proceso', fechaResolucion: null },
  { id: 5, fecha: '2024-09-10', sindicato: 'SITRAD', tipo: 'Beneficio', empleado: null, descripcion: 'Ampliación de seguro médico a familiares', estado: 'Aprobado', fechaResolucion: '2024-10-01' }
]

export const sstData = {
  indicadores: {
    incidentesMes: 2,
    diasPerdidos: 5,
    tasaFrecuencia: 1.2,
    capacitacionesSST: 3,
    pendientesRevisar: 4
  },
  incidentes: [
    { id: 1, fecha: '2024-08-05', empleado: 'Carlos Ruiz', tipo: 'Esguince', gravedad: 'Leve', sede: 'Av. Principal 123', estado: 'Cerrado', descripcion: 'Esguince de tobillo al bajar cajas' },
    { id: 2, fecha: '2024-08-12', empleado: 'Sofía Torres', tipo: 'Corte', gravedad: 'Leve', sede: 'Av. Libertador 789', estado: 'En seguimiento', descripcion: 'Corte en mano con caja de cartón' },
    { id: 3, fecha: '2024-07-20', empleado: 'Pedro Sánchez', tipo: 'Dolor lumbar', gravedad: 'Moderado', sede: 'Calle Norte 456', estado: 'Cerrado', descripcion: 'Dolor lumbar por carga pesada' },
    { id: 4, fecha: '2024-06-15', empleado: 'Miguel Herrera', tipo: 'Caída', gravedad: 'Grave', sede: 'Av. Libertador 789', estado: 'Cerrado', descripcion: 'Caída desde escalera en bodega' }
  ],
  auditoria: [
    { item: 'Extintores revisados', estado: 'Cumple', fecha: '2024-08-01' },
    { item: 'Señalización evacuación', estado: 'Cumple', fecha: '2024-08-01' },
    { item: 'Botiquín de primeros auxilios', estado: 'No cumple', fecha: '2024-08-01' },
    { item: 'Temperatura refrigeración', estado: 'Cumple', fecha: '2024-08-01' },
    { item: 'Pisos sin resbalones', estado: 'En revisión', fecha: '2024-08-01' },
    { item: 'Equipos de protección personal', estado: 'Cumple', fecha: '2024-08-01' }
  ]
}

export const auxilios = [
  { id: 1, empleado: 'Ana García', sede: 'Av. Principal 123', tipo: 'Navideño', monto: 500, estado: 'Aprobado', fechaSolicitud: '2024-11-15', fechaAprobacion: '2024-11-20', motivo: 'Ayuda navideña familiar' },
  { id: 2, empleado: 'Carlos Ruiz', sede: 'Av. Principal 123', tipo: 'Navideño', monto: 500, estado: 'Aprobado', fechaSolicitud: '2024-11-18', fechaAprobacion: '2024-11-22', motivo: 'Ayuda navideña familiar' },
  { id: 3, empleado: 'Pedro Sánchez', sede: 'Calle Norte 456', tipo: 'Emergencia', monto: 1000, estado: 'Aprobado', fechaSolicitud: '2024-08-10', fechaAprobacion: '2024-08-12', motivo: 'Gasto médico urgente' },
  { id: 4, empleado: 'Laura Martínez', sede: 'Calle Norte 456', tipo: 'Educación', monto: 800, estado: 'Pendiente', fechaSolicitud: '2024-09-05', fechaAprobacion: null, motivo: 'Colegiatura hijo' },
  { id: 5, empleado: 'Sofía Torres', sede: 'Av. Libertador 789', tipo: 'Navideño', monto: 500, estado: 'Aprobado', fechaSolicitud: '2024-11-20', fechaAprobacion: '2024-11-25', motivo: 'Ayuda navideña familiar' },
  { id: 6, empleado: 'Miguel Herrera', sede: 'Av. Libertador 789', tipo: 'Emergencia', monto: 1200, estado: 'En revisión', fechaSolicitud: '2024-10-15', fechaAprobacion: null, motivo: 'Reparación vivienda' },
  { id: 7, empleado: 'Carmen Vargas', sede: 'Av. Libertador 789', tipo: 'Educación', monto: 600, estado: 'Aprobado', fechaSolicitud: '2024-07-01', fechaAprobacion: '2024-07-10', motivo: 'Curso de capacitación' },
  { id: 8, empleado: 'José Morales', sede: 'Av. Libertador 789', tipo: 'Navideño', monto: 500, estado: 'Aprobado', fechaSolicitud: '2024-11-22', fechaAprobacion: '2024-11-28', motivo: 'Ayuda navideña familiar' },
  { id: 9, empleado: 'Isabel Flores', sede: 'Av. Principal 123', tipo: 'Emergencia', monto: 900, estado: 'Rechazado', fechaSolicitud: '2024-06-10', fechaAprobacion: '2024-06-15', motivo: 'Gasto médico' },
  { id: 10, empleado: 'Fernando Reyes', sede: 'Av. Principal 123', tipo: 'Navideño', monto: 500, estado: 'Aprobado', fechaSolicitud: '2024-11-25', fechaAprobacion: '2024-11-30', motivo: 'Ayuda navideña familiar' },
  { id: 11, empleado: 'Lucía Castillo', sede: 'Calle Norte 456', tipo: 'Navideño', monto: 500, estado: 'Aprobado', fechaSolicitud: '2024-11-19', fechaAprobacion: '2024-11-23', motivo: 'Ayuda navideña familiar' },
  { id: 12, empleado: 'Diego Navarro', sede: 'Calle Norte 456', tipo: 'Emergencia', monto: 800, estado: 'Pendiente', fechaSolicitud: '2024-12-01', fechaAprobacion: null, motivo: 'Gasto médico familiar' },
  { id: 13, empleado: 'Valentina Cruz', sede: 'Av. Principal 123', tipo: 'Educación', monto: 700, estado: 'Aprobado', fechaSolicitud: '2024-08-05', fechaAprobacion: '2024-08-12', motivo: 'Universidad' },
  { id: 14, empleado: 'Oscar Jiménez', sede: 'Calle Norte 456', tipo: 'Navideño', monto: 500, estado: 'Aprobado', fechaSolicitud: '2024-11-21', fechaAprobacion: '2024-11-26', motivo: 'Ayuda navideña familiar' },
  { id: 15, empleado: 'Renata Guerrero', sede: 'Calle Norte 456', tipo: 'Emergencia', monto: 1500, estado: 'Aprobado', fechaSolicitud: '2024-09-10', fechaAprobacion: '2024-09-15', motivo: 'Emergencia médica familiar' },
  { id: 16, empleado: 'Adriana Luna', sede: 'Av. Libertador 789', tipo: 'Educación', monto: 650, estado: 'Aprobado', fechaSolicitud: '2024-06-20', fechaAprobacion: '2024-06-28', motivo: 'Curso de especialización' },
  { id: 17, empleado: 'Daniela Rojas', sede: 'Av. Principal 123', tipo: 'Navideño', monto: 500, estado: 'Aprobado', fechaSolicitud: '2024-11-24', fechaAprobacion: '2024-11-29', motivo: 'Ayuda navideña familiar' },
  { id: 18, empleado: 'Marcos Aguilar', sede: 'Av. Libertador 789', tipo: 'Emergencia', monto: 950, estado: 'Rechazado', fechaSolicitud: '2024-10-05', fechaAprobacion: '2024-10-12', motivo: 'Reparación hogar' }
]

export const evaluaciones = [
  { id: 1, empleadoId: 1, empleado: 'Ana García', sede: 'Av. Principal 123', trimestre: 'Q1 2024', puntuacion: 4.2, fortalezas: 'Puntualidad, trato al cliente', areasMejora: 'Velocidad en cierre de caja' },
  { id: 2, empleadoId: 2, empleado: 'Carlos Ruiz', sede: 'Av. Principal 123', trimestre: 'Q1 2024', puntuacion: 3.8, fortalezas: 'Organización de bodega', areasMejora: 'Comunicación con equipo' },
  { id: 3, empleadoId: 3, empleado: 'María López', sede: 'Av. Principal 123', trimestre: 'Q1 2024', puntuacion: 4.8, fortalezas: 'Liderazgo, resolución de conflictos', areasMejora: 'Delegación de tareas' },
  { id: 4, empleadoId: 4, empleado: 'Pedro Sánchez', sede: 'Calle Norte 456', trimestre: 'Q1 2024', puntuacion: 3.2, fortalezas: 'Proactividad en ventas', areasMejora: 'Conocimiento de producto' },
  { id: 5, empleadoId: 5, empleado: 'Laura Martínez', sede: 'Calle Norte 456', trimestre: 'Q1 2024', puntuacion: 4.0, fortalezas: 'Precisión en cobros', areasMejora: 'Atención bajo presión' },
  { id: 6, empleadoId: 6, empleado: 'Roberto Díaz', sede: 'Calle Norte 456', trimestre: 'Q1 2024', puntuacion: 4.5, fortalezas: 'Gestión de equipo, resultados', areasMejora: 'Innovación en procesos' },
  { id: 7, empleadoId: 7, empleado: 'Sofía Torres', sede: 'Av. Libertador 789', trimestre: 'Q1 2024', puntuacion: 3.5, fortalezas: 'Empatía con clientes', areasMejora: 'Cierre de ventas' },
  { id: 8, empleadoId: 8, empleado: 'Miguel Herrera', sede: 'Av. Libertador 789', trimestre: 'Q1 2024', puntuacion: 4.0, fortalezas: 'Responsabilidad', areasMejora: 'Eficiencia en carga' },
  { id: 9, empleadoId: 13, empleado: 'Lucía Castillo', sede: 'Calle Norte 456', trimestre: 'Q2 2024', puntuacion: 3.6, fortalezas: 'Adaptabilidad', areasMejora: 'Manejo de efectivo' },
  { id: 10, empleadoId: 14, empleado: 'Diego Navarro', sede: 'Calle Norte 456', trimestre: 'Q2 2024', puntuacion: 4.1, fortalezas: 'Técnicas de venta', areasMejora: 'Reporte de inventario' },
  { id: 11, empleadoId: 20, empleado: 'Oscar Jiménez', sede: 'Calle Norte 456', trimestre: 'Q2 2024', puntuacion: 3.9, fortalezas: 'Puntualidad', areasMejora: 'Venta cruzada' },
  { id: 12, empleadoId: 9, empleado: 'Carmen Vargas', sede: 'Av. Libertador 789', trimestre: 'Q2 2024', puntuacion: 4.5, fortalezas: 'Velocidad, precisión', areasMejora: 'Mentoring a nuevos' },
  { id: 13, empleadoId: 10, empleado: 'José Morales', sede: 'Av. Libertador 789', trimestre: 'Q2 2024', puntuacion: 4.3, fortalezas: 'Organización', areasMejora: 'Motivación del equipo' },
  { id: 14, empleadoId: 25, empleado: 'Adriana Luna', sede: 'Av. Libertador 789', trimestre: 'Q2 2024', puntuacion: 3.7, fortalezas: 'Trato amable', areasMejora: 'Manejo de devoluciones' },
  { id: 15, empleadoId: 38, empleado: 'Javier Campos', sede: 'Calle Norte 456', trimestre: 'Q3 2024', puntuacion: 4.6, fortalezas: 'Estrategia comercial', areasMejora: 'Comunicación inter-sede' },
  { id: 16, empleadoId: 26, empleado: 'Sergio Delgado', sede: 'Av. Principal 123', trimestre: 'Q3 2024', puntuacion: 4.9, fortalezas: 'Visión estratégica, liderazgo', areasMejora: 'Delegación' },
  { id: 17, empleadoId: 16, empleado: 'Ricardo Ortega', sede: 'Av. Libertador 789', trimestre: 'Q3 2024', puntuacion: 4.7, fortalezas: 'Gestión financiera', areasMejora: 'Innovación' },
  { id: 18, empleadoId: 23, empleado: 'Renata Guerrero', sede: 'Calle Norte 456', trimestre: 'Q3 2024', puntuacion: 4.4, fortalezas: 'Resolución de problemas', areasMejora: 'Planeación estratégica' }
]

export const arbolRoles = {
  nombre: 'Gerente General',
  area: 'Dirección',
  personas: ['Directivos'],
  hijos: [
    {
      nombre: 'Gerente de Tienda',
      area: 'Operaciones',
      personas: ['Sergio Delgado', 'Roberto Díaz', 'Ricardo Ortega', 'Javier Campos'],
      hijos: [
        {
          nombre: 'Supervisora',
          area: 'Tienda',
          personas: ['María López', 'Patricia Romero', 'Renata Guerrero', 'Natalia Soto', 'Paula Ríos'],
          hijos: [
            { nombre: 'Cajera', area: 'Caja', personas: ['Ana García', 'Laura Martínez', 'Lucía Castillo', 'Valentina Cruz', 'Oscar Jiménez', 'Camila Espinoza', 'Fernanda Castro', 'Gabriela Solís', 'Catalina Vargas', 'Adriana Luna', 'Paola Vega', 'Mateo Silva', 'Alejandro Paz'], hijos: [] },
            { nombre: 'Vendedor', area: 'Ventas', personas: ['Pedro Sánchez', 'Sofía Torres', 'Daniela Rojas', 'Héctor Salazar', 'Claudia Miranda', 'Raúl Fuentes', 'Catalina Vargas', 'Camila Espinoza'], hijos: [] },
            { nombre: 'Bodeguero', area: 'Bodega', personas: ['Carlos Ruiz', 'Miguel Herrera', 'Andrés Medina', 'Marcos Aguilar', 'Tomás Reyes', 'Raúl Montoya', 'Fernando Reyes'], hijos: [] }
          ]
        }
      ]
    }
  ]
}

export const comparativas = {
  porSede: [
    { sede: 'Av. Principal 123', colaboradores: 16, rotacion: 4.2, capacitaciones: 8, satisfaccion: 4.2, ausentismo: 2.1 },
    { sede: 'Calle Norte 456', colaboradores: 13, rotacion: 5.1, capacitaciones: 7, satisfaccion: 3.9, ausentismo: 2.8 },
    { sede: 'Av. Libertador 789', colaboradores: 13, rotacion: 3.8, capacitaciones: 9, satisfaccion: 4.5, ausentismo: 1.9 }
  ],
  promedioGeneral: {
    colaboradores: 14,
    rotacion: 4.4,
    capacitaciones: 8,
    satisfaccion: 4.2,
    ausentismo: 2.3
  }
}

export const tabsConfig = [
  { key: 'resumen', label: 'Resumen', icon: BarChart3, path: '/' },
  { key: 'colaboradores', label: 'Colaboradores', icon: Users, path: '/colaboradores' },
  { key: 'rotacion', label: 'Rotación', icon: TrendingDown, path: '/rotacion' },
  { key: 'capacitacion', label: 'Capacitación', icon: GraduationCap, path: '/capacitacion' },
  { key: 'sindicalizados', label: 'Sindicalizados', icon: Shield, path: '/sindicalizados' },
  { key: 'sst', label: 'SST', icon: HeartPulse, path: '/sst' },
  { key: 'auxilios', label: 'Auxilios', icon: Gift, path: '/auxilios' },
  { key: 'evaluaciones', label: 'Evaluaciones', icon: Award, path: '/evaluaciones' },
  { key: 'arbol-roles', label: 'Árbol de Roles', icon: Network, path: '/arbol-roles' },
  { key: 'asistente-ia', label: 'Asistente IA', icon: Bot, path: '/asistente-ia' },
  { key: 'comparativas', label: 'Comparativas', icon: GitCompare, path: '/comparativas' }
]
