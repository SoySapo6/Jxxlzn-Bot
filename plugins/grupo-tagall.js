/* 
- tagall By Angel-OFC  
- etiqueta en un grupo a todos
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🍫';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const botname = 'MaycolAIUltraMD';
  const vs = 'SoyMaycol';
  const pesan = args.join` ` || '¡Sean bienvenidos, fantasmas del baño!';

  const oi = `*『✧』 Mensaje de Hanako-kun: ${pesan}`;
  let teks = `╭───╼⃝𖣔⃟ۜ۬ۢۦ۬۟ۜ۬۟ۧ۬۟۟ۧ۬۟۟۬ۦ۬ۧ۬۬ۧ۫۬ۦ۟ۧ۬۟۬ۧ۬۟۟۬۟۟۬۟۟۬۟ۧ۬\n`;
  teks += `│        *⛩️ Invocación Espiritual* \n`;
  teks += `│  *Hanako-kun ha llamado a ${participants.length} espíritus* 👻\n│\n`;
  teks += `│  ${oi}\n│\n`;

  for (const mem of participants) {
    teks += `│  ${customEmoji} @${mem.id.split('@')[0]}\n`;
  }

  teks += `╰───╼⃝𖣔 𝕸𝖆𝖞𝖈𝖔𝖑𝕬𝕴 • 𝕾𝖔𝖞𝕸𝖆𝖞𝖈𝖔𝖑 ⛩️`;

  await conn.sendMessage(m.chat, {
    text: teks,
    mentions: participants.map(p => p.id),
    contextInfo: {
      externalAdReply: {
        title: 'Hanako-kun te ha invocado',
        body: 'MaycolAIUltraMD • SoyMaycol',
        thumbnailUrl: 'https://files.catbox.moe/rgi9f7.jpeg',
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R'
      }
    }
  }, { quoted: m });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;
