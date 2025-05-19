import fetch from 'node-fetch';
import { writeFileSync, unlinkSync } from 'fs';
import path from 'path';

const handler = async (m, { args, text, conn }) => {
  if (!text) {
    return conn.reply(m.chat, `
✘ 「 FALTA EL ENLACE 」
➤ Usa: *html https://example.com*`, m);
  }

  const url = text.trim();
  const api = `https://delirius-apiofc.vercel.app/tools/htmlextract?url=${encodeURIComponent(url)}`;

  await conn.reply(m.chat, `
╭──〔 ✦ ANÁLISIS Z ACTIVADO ✦ 〕──╮
┃ Goku está escaneando la estructura...
┃ Procesando enlace: ${url}
╰────────────────────────────────╯`, m);

  try {
    const res = await fetch(api);
    const data = await res.json();

    if (!data.status || !data.html) throw new Error('El contenido no pudo recuperarse.');

    const filename = `goku-html-${Date.now()}.html`;
    const filepath = path.join('./temp', filename);

    writeFileSync(filepath, data.html);

    await conn.sendMessage(m.chat, {
      document: { url: filepath },
      mimetype: 'text/html',
      fileName: 'html-source-z.html',
      caption: `
╭─〔 ✦ CÓDIGO HTML OBTENIDO ✦ 〕──╮
┃ ✅ Análisis completo.
┃ 📄 Contenido entregado por Goku.
╰────────────────────────────────╯
🌐 ${url}`.trim()
    }, { quoted: m });

    unlinkSync(filepath);
  } catch (err) {
    console.error('[Error en html extract]', err);
    conn.reply(m.chat, `
✘ 「 ERROR DETECTADO 」
➤ No se pudo recuperar el HTML.
➤ Verifica que el enlace sea válido y accesible.`, m);
  }
};

handler.command = ['html'];
handler.help = ['html <enlace>'];
handler.tags = ['tools'];
handler.register = true;

export default handler;
