let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid?.[0] || m.sender
  let user = global.db.data.users[userId]
  let name = conn.getName(userId)
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users).length

  // Saludo decorado
  let hour = new Intl.DateTimeFormat('es-PE', {
  hour: 'numeric',
  hour12: false,
  timeZone: 'America/Lima'
}).format(new Date())
  
  let saludo = hour < 6 ? "🌌 Buenas madrugadas" :
               hour < 12 ? "🌅 Buenos días" :
               hour < 18 ? "🌄 Buenas tardes" :
               "🌃 Buenas noches"

  // Agrupar comandos por categorías
  let categories = {}
  for (let plugin of Object.values(global.plugins)) {
    if (!plugin.help || !plugin.tags) continue
    for (let tag of plugin.tags) {
      if (!categories[tag]) categories[tag] = []
      categories[tag].push(...plugin.help.map(cmd => `#${cmd}`))
    }
  }

  // Emojis random por categoría
  let decoEmojis = ['✨', '🌸', '👻', '⭐', '🔮', '💫', '☁️', '🦋', '🪄']
  let emojiRandom = () => decoEmojis[Math.floor(Math.random() * decoEmojis.length)]

  // MENÚ HANAKO-KUN STYLE
  let menuText = `
╭───❖ 𝓖𝓸𝓴𝓾 𝓑𝓸𝓽 ❖───╮

  Hey*. ${name}.
> *_${saludo}_*

╰─────❖ 𝓜𝓮𝓷𝓾 ❖─────╯

👊 𝙸𝙽𝙵𝙾 𝙳𝙴 𝙶𝙾𝙺𝚄 𝙱𝙾𝚃 👊

💻 Sistema: Multi-Device (Modo Dios)
🧬 Guerrero: @${userId.split('@')[0]}
⏰ Tiempo de entrenamiento: ${uptime}
⚔️ Guerreros conectados: ${totalreg}

> Desarrollado con fuerza y orgullo Saiyajin por: *𝕵𝖝𝖝𝖑𝖟𝖓 (𝕯𝖗𝖆𝖐𝖎𝖙𝖔)*

≪──── ⋆☁️⚡☁️⋆ ────≫
`.trim()

for (let [tag, cmds] of Object.entries(categories)) {
  let tagName = tag.toUpperCase().replace(/_/g, ' ')
  let deco = emojiRandom()
  menuText += `

╭─━━━ ${deco} ${tagName} ${deco} ━━━╮
${cmds.map(cmd => `│ ➯ ${cmd}`).join('\n')}
╰─━━━━━━━━━━━━━━━━╯`
}
  
  // Mensaje previo cute
  await conn.reply(m.chat, '⌜ ⊹ Espera tantito, espíritu curioso... ⊹ ⌟', m, {
    contextInfo: {
      externalAdReply: {
        title: botname,
        body: "Ven y lucha conmigo MARICA",
        thumbnailUrl: 'https://files.catbox.moe/wd2yh6.jpg',
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      }
    }
  })

  // Enviar menú con video estilo gif
  await conn.sendMessage(m.chat, {
    video: { url: 'https://files.catbox.moe/lx84mt.mp4', gifPlayback: true },
    caption: menuText,
    gifPlayback: true,
    contextInfo: {
      mentionedJid: [m.sender, userId],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363418396587968@newsletter',
        newsletterName: '𝐉𝐱𝐱𝐥𝐳𝐧-𝐁𝐨𝐭',
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: botname,
        body: "Acaso quieres pelea idiota?",
        thumbnailUrl: banner,
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      },
    }
  }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
}
