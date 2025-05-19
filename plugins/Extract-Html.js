import fetch from 'node-fetch';
import { writeFileSync, unlinkSync } from 'fs';
import path from 'path';

const handler = async (m, { args, text, conn }) => {
  if (!text) {
    return conn.reply(m.chat, `
✘ 「 𝑬𝑵𝑳𝑨𝑪𝑬 𝑭𝑨𝑳𝑻𝑨𝑵𝑻𝑬 」
➤ Usa: *html https://example.com*`, m);
  }

  const url = text.trim();
  const api = `https://delirius-apiofc.vercel.app/tools/htmlextract?url=${encodeURIComponent(url)}`;

  await conn.reply(m.chat, `
╭─〔 𝑯𝑨𝑵𝑨𝑲𝑶 𝑲𝑼𝑵 ✦ 𝑬𝑺𝑻𝑨́ 𝑬𝑺𝑷𝑰𝑨𝑵𝑫𝑶 𝑬𝑳 𝑺𝑰𝑻𝑰𝑶... 〕─╮
┃⌛ 𝑰𝒏𝒗𝒐𝒄𝒂𝒏𝒅𝒐 𝒍𝒂 𝒆𝒔𝒆𝒏𝒄𝒊𝒂 HTML...
╰────────────────────────────╯`, m);

  try {
    const res = await fetch(api);
    const data = await res.json();

    if (!data.status || !data.html) throw new Error('Respuesta no válida');

    const filename = `hanako-html-${Date.now()}.html`;
    const filepath = path.join('./temp', filename);

    writeFileSync(filepath, data.html);

    await conn.sendMessage(m.chat, {
      document: { url: filepath },
      mimetype: 'text/html',
      fileName: 'hanako-html-source.html',
      caption: `
╭─〔 𝑯𝑻𝑴𝑳 𝑬𝑿𝑻𝑹𝑨𝑰́𝑷𝑂 〕─╮
┃✔️ 𝑬𝒍 𝒄𝒐́𝒅𝒊𝒈𝒐 HTML 𝒅𝒆 𝒕𝒖 𝒆𝒏𝒍𝒂𝒄𝒆 𝒆𝒔𝒕𝒂́ 𝒂𝒒𝒖𝒊́.
┃✦ 𝑰𝒏𝒗𝒐𝒄𝒂𝒅𝒐 𝒑𝒐𝒓 𝑯𝒂𝒏𝒂𝒌𝒐-𝒌𝒖𝒏.
╰────────────────╯
🌐 ${url}
`.trim()
    }, { quoted: m });

    unlinkSync(filepath);
  } catch (err) {
    console.error('[ERROR en html extract]', err);
    conn.reply(m.chat, `
✘ 「 𝑬𝑹𝑹𝑶𝑹 𝑭𝑨𝑻𝑨𝑳 」
➤ No pude recuperar el HTML.
➤ ¿Seguro que el enlace es válido?`, m);
  }
};

handler.command = ['html'];
handler.help = ['html <enlace>'];
handler.tags = ['tools'];
handler.register = true;

export default handler;
