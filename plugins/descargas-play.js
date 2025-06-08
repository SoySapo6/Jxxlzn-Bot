import yts from "yt-search";
import { ytv, yta } from "./_ytdl.js";
const limit = 100; // MB

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply("> Ingresa el nombre de un video o una URL de YouTube.");

  await m.react("🕛");
  await m.reply("⌛ Procesando tu video, espera un momento por favor... (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠❤");

  console.log("🔍 Buscando en YouTube...");
  let res = await yts(text);

  if (!res || !res.all || res.all.length === 0) {
    return m.reply("No se encontraron resultados para tu búsqueda.");
  }

  let video = res.all[0];
  let total = Number(video.duration.seconds) || 0;

  const cap = `*「❀」${video.title}*
> *✧ Canal : »* ${video.author.name}
> *✧ Duración : »* ${video.duration.timestamp}
> *✧ Vistas : »* ${video.views}
> *✧ URL : »* ${video.url}

${wm}`;

  // ↓ Si quieres enviar la miniatura como imagen separada, deja esto
  // await conn.sendFile(m.chat, await (await fetch(video.thumbnail)).buffer(), "thumb.jpg", cap, m);

  try {
    if (command === "play" || command === "playaudio" || command === "ytmp3") {
      console.log("🎧 Solicitando audio...");
      const api = await yta(video.url);

      console.log("🎶 Enviando audio...");
      await conn.sendFile(m.chat, api.result.download, `${api.result.title}.mp3`, cap, m);
      await m.react("✅");

    } else if (command === "play2" || command === "playvid" || command === "ytv" || command === "ytmp4") {
      console.log("📹 Solicitando video...");
      const api = await ytv(video.url);

      const res = await fetch(api.url);
      const cont = res.headers.get('Content-Length');
      const bytes = parseInt(cont, 10);
      const sizemb = bytes / (1024 * 1024);
      const doc = sizemb >= limit;

      if (sizemb > limit) {
        return m.reply(`🚫 El archivo es muy pesado (${sizemb.toFixed(2)} MB). Intenta con un video más corto 🥲`);
      }

      console.log("🎥 Enviando video...");
      await conn.sendFile(m.chat, api.url, `${api.title}.mp4`, cap, m, null, {
        asDocument: doc,
        mimetype: "video/mp4",
      });
      await m.react("✅");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    m.reply("Hubo un error al descargar el archivo 😢\n\n" + error.message);
  }
};

handler.command = handler.help = ['play', 'playaudio', 'ytmp3', 'play2', 'ytv', 'ytmp4'];
handler.tags = ['descargas'];
handler.group = true;

export default handler;
