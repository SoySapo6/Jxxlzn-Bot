import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const handler = async (m, { conn }) => {
  const pluginDir = path.resolve('./plugins');
  let report = '❌ *ERRORES DETECTADOS EN PLUGINS*\n\n';
  let errores = 0;

  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'));

  for (let file of files) {
    const filePath = path.join(pluginDir, file);
    try {
      await import(pathToFileURL(filePath).href);
    } catch (err) {
      errores++;
      report += `*${file}* — ${err.message.split('\n')[0]}\n`;
    }
  }

  if (errores === 0) {
    report = '✅ Todos los plugins están bien, sin errores.';
  }

  await conn.sendMessage(m.chat, { text: report }, { quoted: m });
};

handler.command = ['log'];
handler.tags = ['tools'];
handler.help = ['log'];
handler.register = true;
handler.group = false;

export default handler;
