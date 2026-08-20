export function validateHomecenterDomain(req, res, next) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email es requerido' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Formato de email inválido' })
  }

  const domain = email.split('@')[1].toLowerCase()
  if (domain !== 'homecenter.co') {
    return res.status(400).json({
      error: 'Solo se permiten correos @homecenter.co'
    })
  }

  next()
}
