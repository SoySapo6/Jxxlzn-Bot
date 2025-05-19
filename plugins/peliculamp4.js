import fetch from 'node-fetch';

const handler = async (m, { text, conn }) => {
  if (!text) return conn.reply(m.chat, `
✘ 「 ¡FALTA EL TÍTULO, GUERRERO! 」
Usa el comando así:
➤ *peliculamp4 <nombre de la película>*`, m);

  const apiUrl = `https://nightapioficial.onrender.com/api/movies/info?title=${encodeURIComponent(text)}`;

  await conn.reply(m.chat, `
╭━━━〔 ✦ BÚSQUEDA Z ACTIVADA ✦ 〕━━━╮
┃ 🔎 Buscando en la Cámara del Tiempo...
┃ 💫 Rastreo de energía de: *${text}*
┃ 🛰️ Contactando a NightAPI...
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`, m);

  try {
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!Array.isArray(json) || !json[0]?.enlace) {
      throw new Error('Película no encontrada en este universo.');
    }

    const movie = json[0];
    const videoUrl = movie.enlace;

    const head = await fetch(videoUrl, { method: 'HEAD' });
    if (!head.ok) throw new Error('El enlace está roto o fue destruido por Freezer.');

    const filename = `Kakaroto-${movie.nombre.slice(0, 30)}.mp4`;
    const caption = `
╭─────〔 ✦ PELÍCULA Z ✦ 〕─────╮
┃ 🎬 Título: ${movie.nombre}
┃ ⭐ Valoración: ${movie.estrellas} / 10
┃ 📆 Año: ${movie.año}
╰────────────────────────────╯`.trim();

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
    console.error('[Error peliculamp4]', e);
    conn.reply(m.chat, `
✘ 「 ¡ALERTA, KAIOSAMA! 」
Hubo un problema al traer el video.

${e?.message?.startsWith('http') 
  ? '➤ Intenta abrirlo manualmente:\n' + e.message
  : '⛓️ Enlace alternativo:\n' + (json?.[0]?.enlace || 'No disponible en este planeta.')}`, m);
  }
};

handler.command = ['peliculamp4'];
handler.help = ['peliculamp4 <título>'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;
