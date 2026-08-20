import db from '../config/database.js'

export const User = {
  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  },

  findById(id) {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id)
  },

  create({ nombre, email, password }) {
    const stmt = db.prepare(
      'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)'
    )
    const result = stmt.run(nombre, email, password)
    return this.findById(result.lastInsertRowid)
  },

  setConfirmationCode(userId, code, expires) {
    db.prepare(
      'UPDATE users SET confirmation_code = ?, confirmation_expires = ? WHERE id = ?'
    ).run(code, expires, userId)
  },

  confirmEmail(userId) {
    db.prepare(
      'UPDATE users SET email_confirmed = 1, confirmation_code = NULL, confirmation_expires = NULL WHERE id = ?'
    ).run(userId)
  },

  setTotpSecret(userId, secret) {
    db.prepare('UPDATE users SET totp_secret = ? WHERE id = ?').run(secret, userId)
  },

  enableTotp(userId) {
    db.prepare(
      'UPDATE users SET totp_enabled = 1 WHERE id = ?'
    ).run(userId)
  }
}
