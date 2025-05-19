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

    const mensaje = `╭──❖『 ✦ CENTRO DE ENTRENAMIENTO Z ✦ 』\n│\n├─ El comando *${usedPrefix}${command}* no fue reconocido por el radar del dragón.\n│\n├─ ${suggestion || 'Consulta todos los poderes disponibles con:'}\n│   ⇝ *${usedPrefix}help*\n╰───────────────────────────────╯`
    await m.reply(mensaje)
    return
  }

  if (chat?.isBanned) {
    const avisoDesactivado = `╭──❖『 ✦ ENERGÍA SELLADA ✦ 』\n│\n├─ Este grupo ha sido encerrado por los Kaioshin.\n│   El poder del bot fue sellado aquí.\n│\n├─ Para liberar su energía usa:\n│   ⇝ *${usedPrefix}bot on*\n╰────────────────────────────╯`
    await m.reply(avisoDesactivado)
    return
  }

  if (!user.commands) user.commands = 0
  user.commands += 1
}
