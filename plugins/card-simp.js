const handler = async (m, { conn }) => {
  try {
    const who = m.quoted?.sender || m.mentionedJid?.[0] || m.fromMe ? conn.user.jid : m.sender

    const avatar = await conn.profilePictureUrl(who, 'image')
      .catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')

    const url = `https://some-random-api.com/canvas/simpcard?avatar=${encodeURIComponent(avatar)}`

    await conn.sendFile(m.chat, url, 'simp.png', '*¡WTF ERES SIMP!* 😆', m)
  } catch (e) {
    console.error('[ERROR SIMPCARD]', e)
    conn.reply(m.chat, '*❌ Ocurrió un error al generar la tarjeta simp.*', m)
  }
}

handler.help = ['simp', 'simpcard']
handler.tags = ['tools']
handler.command = ['simp', 'simpcard']
handler.register = true
export default handler
