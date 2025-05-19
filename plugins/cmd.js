import fs from 'fs'
import path from 'path'

const handler = async (m, { conn }) => {
  const pluginDir = './plugins'
  const posibles = []

  const clavesPeligrosas = ['child_process', 'exec', 'spawn', 'execSync', 'system']

  try {
    const archivos = fs.readdirSync(pluginDir).filter(file => file.endsWith('.js'))

    for (const archivo of archivos) {
      const contenido = fs.readFileSync(path.join(pluginDir, archivo), 'utf-8')
      if (clavesPeligrosas.some(clave => contenido.includes(clave))) {
        posibles.push(archivo)
      }
    }

    if (posibles.length === 0) {
      await conn.reply(m.chat, '✅ No encontré comandos que parezcan ejecutar terminal.', m)
    } else {
      await conn.reply(m.chat, `
⚠️ *Comandos potencialmente de terminal encontrados:*

${posibles.map(p => `• ${p}`).join('\n')}

¡Revisa estos archivos con cuidado!
`, m)
    }
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, '❌ Error al buscar comandos.', m)
  }
}

handler.help = ['logcmd']
handler.tags = ['owner']
handler.command = ['logcmd']
handler.owner = true  // solo el dueño puede usarlo

export default handler
