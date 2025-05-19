const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '⚠️ *Y EL TEXTO?*', m)

  try {
    const avatar = await conn.profilePictureUrl(m.sender, 'image')
      .catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')

    const username = await conn.getName(m.sender)
    const url = `https://some-random-api.com/canvas/youtube-comment?avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(text)}&username=${encodeURIComponent(username)}`

    await conn.sendFile(m.chat, url, 'ytcomment.png', '*HAS COMENTADO EN YOUTUBE!!*', m)
  } catch (e) {
    console.error('[ERROR YT COMMENT]', e)
    conn.reply(m.chat, '*❌ No se pudo generar el comentario de YouTube.*', m)
  }
}

handler.help = ['ytcomment <texto>']
handler.tags = ['maker']
handler.command = ['ytcomment'] // ESTA ES LA CLAVE
handler.register = true
export default handler
