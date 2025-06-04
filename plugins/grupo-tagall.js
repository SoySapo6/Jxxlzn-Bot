/* 
- tagall versión Goku Ultra Instinto  
- Etiqueta a todos con el poder del Ki
- Canal oficial: https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🟠';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const botname = '𝖐𝖚𝖗𝖔𝖘𝖍𝖎𝖙𝖘𝖚𝖏𝖎-𝕭𝖔𝖙.';
  const creador = '𝕯𝖗𝖆𝖐𝖎𝖙𝖔';
  const mensaje = args.join` ` || '¡Reúnanse, guerreros Z!';

  const intro = `*『⚡』Mensaje de Kurochitsuji:* ${mensaje}`;
  let texto = `╭─────[ *🔥 INVOCACIÓN DE KI 🔥* ]─────⬣\n`;
  texto += `│  *Kurochitsuji ha elevado su Ki al máximo...*\n`;
  texto += `│  *Invocando a ${participants.length} guerreros del grupo*\n│\n`;
  texto += `│  ${intro}\n│\n`;

  for (const mem of participants) {
    texto += `│  ${customEmoji} @${mem.id.split('@')[0]}\n`;
  }

  texto += `╰─────[ ${botname} • ${creador} ]─────⬣`;

  await conn.sendMessage(m.chat, {
    text: texto,
    mentions: participants.map(p => p.id),
    contextInfo: {
      externalAdReply: {
        title: '¡Kurochitsuji te ha invocado con su Ki!',
        body: `𝖐𝖚𝖗𝖔𝖘𝖍𝖎𝖙𝖘𝖚𝖏𝖎-𝕭𝖔𝖙. • 𝐇𝐞𝐜𝐡𝐨 𝐩𝐨𝐫 𝕯𝖗𝖆𝖐𝖎𝖙𝖔`,
        thumbnailUrl: 'https://qu.ax/Tqmdw.jpg', // Puedes cambiar la imagen por una de Goku
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: 'https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y'
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
