import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `
✘ 「 𝐅𝐀𝐋𝐓𝐀 𝐓𝐄𝐗𝐓𝐎 」
➤ Usa: *oogway La vida es un viaje...*`, m)
  }

  try {
    const api = `https://api.popcat.xyz/v2/oogway?text=${encodeURIComponent(text.trim())}`

    await conn.sendMessage(m.chat, {
      image: { url: api },
      caption: `
✦『 𝐌𝐀𝐄𝐒𝐓𝐑𝐎 𝐎𝐎𝐆𝐖𝐀𝐘 』✦
"${text.trim()}"
(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠❤`, 
    }, { quoted: m })
  } catch (err) {
    console.error('[ERROR OOGWAY]', err)
    conn.reply(m.chat, `
✘ 「 𝑬𝑹𝑹𝑶𝑹 」
➤ No se pudo contactar con el Maestro Oogway...
➤ Intenta de nuevo más tarde (⁠；⁠^⁠ω⁠^⁠）`, m)
  }
}

handler.command = ['oogway']
handler.help = ['oogway <texto>']
handler.tags = ['fun']

export default handler
