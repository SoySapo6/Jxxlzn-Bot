import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, command, args }) => {
  if (!text.trim() && !args[0]) {
    return conn.reply(m.chat, '🔎 Ingresa el nombre o URL del video.', m);
  }

  const input = text.trim() || args[0];
  let youtubeUrl = input;
  let calidad = '360p';

  const calidadMatch = input.match(/(?:full\s*)?(\d{3,4}p)/i);
  if (calidadMatch) {
    calidad = calidadMatch[1];
    youtubeUrl = input.replace(calidadMatch[0], '').trim();
  }

  if (!/^https?:\/\//i.test(youtubeUrl)) {
    try {
      const search = await yts(youtubeUrl);
      if (!search.videos.length) {
        return conn.reply(m.chat, '❌ No se encontraron resultados.', m);
      }
      youtubeUrl = search.videos[0].url;
    } catch (e) {
      console.error(e);
      return conn.reply(m.chat, '❌ Error en la búsqueda.', m);
    }
  }

  try {
    // Reacción inicial ⏳
    await conn.sendMessage(m.chat, {
      react: {
        text: '⏳',
        key: m.key,
      }
    });

    const apiUrl = `http://api-nevi.ddns.net:8000/youtube?url=${encodeURIComponent(youtubeUrl)}&audio=false&calidad=${calidad}`;
    const res = await fetch(apiUrl);

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const error = await res.json();
      return conn.reply(m.chat, `❌ Error: ${error.error || 'No se pudo obtener el archivo'}`, m);
    }

    const buffer = await res.buffer();
    const fileName = res.headers.get("content-disposition")?.split("filename=")[1]?.replace(/"/g, '') || 'video.mp4';

    // Enviar el video rápidamente
    await conn.sendFile(m.chat, buffer, fileName, '', m, false, { mimetype: contentType });

    // Reacción final ✅
    await conn.sendMessage(m.chat, {
      react: {
        text: '✅',
        key: m.key,
      }
    });

  } catch (err) {
    console.error('Error al contactar la API:', err);
    conn.reply(m.chat, `❌ Error al contactar la API: ${err.message}`, m);
  }
};

handler.command = handler.help = ['play', 'playaudio', 'ytmp3', 'play2', 'ytv', 'ytmp4']
handler.tags = ['descargas']
handler.group = true

export default handler
