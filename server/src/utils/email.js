export function simulatedEmail(to, subject, body) {
  console.log('\n' + '='.repeat(60))
  console.log('📧 EMAIL SIMULADO (no se envía realmente)')
  console.log('='.repeat(60))
  console.log(`Para:      ${to}`)
  console.log(`Asunto:    ${subject}`)
  console.log('─'.repeat(60))
  console.log(body)
  console.log('='.repeat(60) + '\n')
}
