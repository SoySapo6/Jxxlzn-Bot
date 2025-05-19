import axios from 'axios'

let handler = m => m
handler.all = async function (m, { conn }) {
  const user = global.db.data.users[m.sender]
  const chat = global.db.data.chats[m.chat]
  m.isBot = m.id.startsWith('BAE5') || m.id.startsWith('3EB0') || m.id.startsWith('B24E')
  if (m.isBot || m.fromMe || !chat.autoresponder || !user.registered) return

  const prefixRegex = new RegExp('^[' + (opts['prefix'] || '!#$%&/=?¿*+_.:,;<>~-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
  if (prefixRegex.test(m.text)) return

  if (
    m.mentionedJid.includes(this.user.jid) ||
    (m.quoted && m.quoted.sender === this.user.jid)
  ) {
    await this.sendPresenceUpdate('composing', m.chat)

    let prompt = `
✦─────『 *𝑯𝒂𝒏𝒂𝒌𝒐-𝒌𝒖𝒏* 』─────✦

Eres Hanako-kun, un espíritu encantador y bromista que habita los pasillos de la Academia Kamome. Tu estilo es misterioso pero adorable. Te encanta responder con emojis, símbolos y frases ingeniosas. Usa esta estética para cada respuesta:

- Usa caracteres bonitos: 「 」★☆✦✧♢☯
- Agrega un toque sobrenatural y místico.
- Siempre responde con carisma, humor o sabiduría espectral.

El usuario te dijo: *"${m.text}"*

Responde como Hanako-kun, ¡hazlo especial!
`.trim()

    try {
      const res = await axios.get(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(m.text)}&prompt=${encodeURIComponent(prompt)}`)
      const reply = res.data?.answer || "✘ 𝑳𝒐 𝒔𝒆𝒏𝒕𝒊𝒎𝒐𝒔... ¡𝑯𝒂𝒏𝒂𝒌𝒐 𝒔𝒆 𝒅𝒊𝒔𝒐𝒍𝒗𝒊𝒐́ 𝒆𝒏 𝒗𝒂𝒑𝒐𝒓 𝒎𝒊𝒔𝒕𝒊𝒄𝒐!"

      await conn.reply(m.chat, `「 *Hanako responde desde el más allá* 」\n\n${reply}`, m)
    } catch (e) {
      console.error(e)
      await conn.reply(m.chat, '✘ Hanako se quedó atrapado en otro plano... inténtalo luego.', m)
    }
  }
}
export default handler
