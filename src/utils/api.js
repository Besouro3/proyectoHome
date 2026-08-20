const API = '/api/auth'

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('El servidor no está disponible. Asegúrate de que el backend esté corriendo (cd server && node index.js)')
  }
  if (!res.ok) throw new Error(data.error || 'Error del servidor')
  return data
}
