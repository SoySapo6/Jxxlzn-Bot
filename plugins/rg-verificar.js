import db from '../lib/database.js'
import { createHash } from 'crypto'

const regex = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  const who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)
  const user = global.db.data.users[m.sender]
  const nameSender = conn.getName(m.sender)

  if (user.registered) {
    return m.reply(`Ya estás registrado, ${nameSender}.
Si deseas reiniciar tu registro, usa: *${usedPrefix}unreg*`)
  }

  if (!regex.test(text)) {
    return m.reply(`Formato incorrecto.
Usa: *${usedPrefix + command} nombre.edad*
Ejemplo: *${usedPrefix + command} ${nameSender}.18*`)
  }

  let [_, name, __, age] = text.match(regex)

  if (!name) return m.reply('Debes proporcionar un nombre.')
  if (!age) return m.reply('Debes indicar tu edad.')
  if (name.length >= 100) return m.reply('Nombre demasiado largo.')
  
  age = parseInt(age)
  if (age > 1000) return m.reply('Edad no válida.')
  if (age < 5) return m.reply('Edad demasiado baja.')

  user.name = name.trim()
  user.age = age
  user.regTime = +new Date()
  user.registered = true

  user.coin += 46
  user.exp += 310
  user.joincount += 25

  const sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  const registroConfirmado = `
╭───〔 REGISTRO EXITOSO 〕───╮
│ Nombre: ${name}
│ Edad: ${age}
│ ID: ${sn}
│
│ Registro completado con éxito.
╰─────────────────────────╯`.trim()

  await m.react('✅')
  await conn.reply(m.chat, registroConfirmado, m)
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler
