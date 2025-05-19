import fetch from 'node-fetch'
import { createWriteStream, unlinkSync, existsSync } from 'fs'
import path from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const streamPipeline = promisify(pipeline)

const handler = async (m, { args, conn }) => {
  if (!args[0]) return conn.reply(m.chat, '✘ 「 𝙁𝙖𝙡𝙩𝙖 𝙚𝙡 𝙚𝙣𝙡𝙖𝙘𝙚 」\n➤ Usa: *playmp4 https://youtu.be/xxxx*', m)

  const url = args[0]
  const api = `https://nightapioficial.onrender.com/api/ytvideo?url=${encodeURIComponent(url)}&format=mp4&quality=720p`

  await conn.reply(m.chat, `
╭━━━━〔 𝑯𝑨𝑵𝑨𝑲𝑶 𝑬𝑺𝑻Á 𝑬𝑵 𝑨𝑪𝑪𝑰Ó𝑵 〕━━━━╮
┃⏳ 𝙄𝙣𝙫𝙤𝙘𝙖𝙣𝙙𝙤 𝙫𝙞𝙙𝙚𝙤 𝙙𝙚𝙨𝙙𝙚 𝙚𝙡 𝙞𝙣𝙛𝙧𝙖𝙢𝙪𝙣𝙙𝙤...
┃ 𝙋𝙤𝙧 𝙛𝙖𝙫𝙤𝙧, 𝙚𝙨𝙥𝙚𝙧𝙖 𝙪𝙣𝙤𝙨 𝙨𝙚𝙜𝙪𝙣𝙙𝙤𝙨...
╰━━━━━━━━━━━━━━━━━━━━━╯`, m)

  try {
    const res = await fetch(api)
    if (!res.ok || !res.body || !res.headers.get('content-type')?.includes('video')) {
      throw new Error('Respuesta no válida o no es un video')
    }

    const filename = `hanako-video-${Date.now()}.mp4`
    const filepath = path.join('./temp', filename)

    await streamPipeline(res.body, createWriteStream(filepath))

    await conn.sendMessage(m.chat, {
      video: { url: filepath },
      caption: `
╭━━━〔 𝙑𝙄𝘿𝙀𝙊 𝘼𝙍𝙍𝙄𝘽𝘼 〕━━━╮
┃✨ *𝙃𝙪𝙢𝙖𝙣𝙤, 𝙖𝙦𝙪í 𝙩𝙞𝙚𝙣𝙚𝙨 𝙩𝙪 𝙫𝙞𝙙𝙚𝙤~*
┃🎬 *𝙏𝙧𝙖í𝙙𝙤 𝙙𝙚𝙨𝙙𝙚 𝙤𝙩𝙧𝙖 𝙙𝙞𝙢𝙚𝙣𝙨𝙞ó𝙣*
┃🔗 ${url}
╰━━━━━━━━━━━━━━━━━╯`.trim()
    }, { quoted: m })

    if (existsSync(filepath)) unlinkSync(filepath)
  } catch (err) {
    console.error('[ERROR en playmp4]', err)
    conn.reply(m.chat, `
✘ 「 𝑭𝑨𝑳𝑳𝑶 𝑬𝑵 𝑬𝑳 𝑹𝑰𝑻𝑼𝑨𝑳 」
➤ No pude traer tu video...
➤ Verifica el enlace o invócame de nuevo más tarde.`, m)
  }
}

handler.command = ['playmp4']
handler.help = ['playmp4 <enlace>']
handler.tags = ['downloader']
handler.register = true

export default handler
