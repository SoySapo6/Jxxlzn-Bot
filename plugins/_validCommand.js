import stringSimilarity from 'string-similarity'

export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) return

  const usedPrefix = global.prefix.exec(m.text)[0]
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase()

  if (!command || command === 'bot') return

  const allCommands = Object.values(global.plugins)
    .flatMap(plugin => Array.isArray(plugin.command) ? plugin.command : [plugin.command])
    .filter(Boolean)
    .map(cmd => typeof cmd === 'string' ? cmd : (cmd instanceof RegExp ? cmd.source : null))
    .filter(cmd => typeof cmd === 'string')

  const exists = allCommands.includes(command)

  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]

  if (!exists) {
    const { bestMatch } = stringSimilarity.findBestMatch(command, allCommands)
    const suggestion = bestMatch.rating > 0.3 ? `¿Quisiste decir *${usedPrefix}${bestMatch.target}*?` : ''

    const mensaje = `╭─❍「 ✦ 𝚂𝚘𝚢𝙼𝚊𝚢𝚌𝚘𝚕 <𝟹 ✦ 」\n│\n├─ El hechizo *${usedPrefix}${command}* no existe en los registros del más allá.\n│\n├─ ${suggestion || 'Consulta los conjuros disponibles con:'}\n│   ⇝ *${usedPrefix}help*\n╰─✦`
    await m.reply(mensaje)
    return
  }

  if (chat?.isBanned) {
    const avisoDesactivado = `╭─❍「 ✦ 𝚂𝚘𝚢𝙼𝚊𝚢𝚌𝚘𝚕 <𝟹 ✦ 」\n│\n├─ El poder de Hanako ha sido *sellado* en este grupo.\n│\n├─ Invoca su regreso con:\n│   ⇝ *${usedPrefix}bot on*\n╰─✦`
    await m.reply(avisoDesactivado)
    return
  }

  if (!user.commands) user.commands = 0
  user.commands += 1
}
