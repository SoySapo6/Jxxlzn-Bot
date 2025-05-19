// ┏━━━━━━༻❀༺━━━━━━┓
// ┋ 『 ᴴᵃⁿᵃᵏᵒ⋆⁺₊𝕂𝕌ℕ 』 ⋆ Bienvenidas & Despedidas ⋆
// ┗━━━━━━༻❀༺━━━━━━┛

import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

// ♡～(‘▽^人) antes de que llegue el mensajitooo
export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  const fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ =>
    'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  // ✦゜.* Hanako vibes ✧.*゜
  let txt = '╭─━━━⊰ゲ⊱━━━─╮\n      🕯️ Nuevo Espíritu\n╰─━━━⊰ゲ⊱━━━─╯'
  let txt1 = '╭─━━━⊰ゲ⊱━━━─╮\n      🕯️ Espíritu Perdido\n╰─━━━⊰ゲ⊱━━━─╯'

  let groupSize = participants.length
  if (m.messageStubType == 27) groupSize++;
  else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--;

  // ❖ Bienvenida Hanako Style ❖
  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `
✧･ﾟ: *✧･ﾟ:* 𝒲𝑒𝓁𝒸𝑜𝓂𝑒 *:･ﾟ✧*:･ﾟ✧
𓂃𓈒𓏸 Bienvenido al reino de ${groupMetadata.subject}
➤ Espíritu invocado: @${m.messageStubParameters[0].split`@`[0]}
${global.welcom1}

✦ Población sobrenatural: ${groupSize} almas
✧ Usa *#help* para invocar mis habilidades~
✧ Que tu estancia sea mágica y misteriosa...
𓆩𓆪 ━━━━━━━━━━━━━━━━
    `.trim()
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }

  // ❖ Despedida Hanako Style ❖
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `
✧･ﾟ: *✧･ﾟ:* 𝒢𝑜𝑜𝒹𝒷𝓎𝑒 *:･ﾟ✧*:･ﾟ✧
𓂃𓈒𓏸 Un espíritu ha partido de ${groupMetadata.subject}
➤ Espíritu perdido: @${m.messageStubParameters[0].split`@`[0]}
${global.welcom2}

✦ Ahora quedamos: ${groupSize} espíritus
✧ Vuelve cuando la luna esté llena...
✧ Invócame con *#help* si me necesitas...
𓆩𓆪 ━━━━━━━━━━━━━━━━
    `.trim()
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }
}
