import fetch from 'node-fetch';

const handler = async (m, { text, conn }) => {
  if (!text) return conn.reply(m.chat, `
✘ 「 𝑻𝑰́𝑻𝑼𝑳𝑶 𝑭𝑨𝑳𝑻𝑨𝑵𝑻𝑬 」
➤ Usa: *peliculamp4 <título>*`, m);

  const apiUrl = `https://nightapioficial.onrender.com/api/movies/info?title=${encodeURIComponent(text)}`;

  await conn.reply(m.chat, `
╭──〔 ✦ 𝑯𝑨𝑵𝑨𝑲𝑶-𝑲𝑼𝑵 𝑬𝑺𝑻𝑨́ 𝑬𝑿𝑷𝑳𝑶𝑹𝑨𝑵𝑫𝑶... ✦ 〕──╮
┃⌛ Buscando entre los archivos malditos de NightAPI...
┃✨ Encontrando la esencia de *${text}*...
╰──────────────────────────────╯`, m);

  try {
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!Array.isArray(json) || !json[0]?.enlace) {
      throw new Error('Película no encontrada.');
    }

    const movie = json[0];
    const videoUrl = movie.enlace;

    const head = await fetch(videoUrl, { method: 'HEAD' });
    if (!head.ok) throw new Error('Enlace inválido o caído.');

    const filename = `Hanako-${movie.nombre.slice(0, 30)}.mp4`;
    const caption = `
╭─〔 ✦ 𝑷𝑬𝑳𝑰́𝑪𝑼𝑳𝑨 ✦ 〕─╮
┃🎬 ${movie.nombre}
┃⭐ ${movie.estrellas} / 10
┃📆 Año: ${movie.año}
╰────────────────╯`.trim();

    await conn.sendFile(
      m.chat,
      videoUrl,
      filename,
      caption,
      m,
      false,
      { mimetype: 'video/mp4' }
    );
  } catch (e) {
    console.error('[peliculamp4 error]', e);
    conn.reply(m.chat, `
✘ 「 ERROR AL ENVIAR 」
➤ No pude enviar el video.
➤ Puedes abrirlo tú desde aquí:
${e?.message?.startsWith('http') ? e.message : '⛓️ ' + (json?.[0]?.enlace || 'No disponible')}
`, m);
  }
};

handler.command = ['peliculamp4'];
handler.help = ['peliculamp4 <título>'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;
