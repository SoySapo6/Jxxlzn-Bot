/**
 * ⋆｡˚ ☁︎｡⋆｡ ˚☽˚｡⋆ ✦ ⋆｡˚☁︎｡⋆｡ ˚☽˚｡⋆ ✦
 * 
 * 𝐓𝐨𝐢𝐥𝐞𝐭-𝐁𝐨𝐮𝐧𝐝 𝐇𝐚𝐧𝐚𝐤𝐨-𝐤𝐮𝐧 𝐑𝐞𝐜𝐨𝐦𝐩𝐞𝐧𝐬𝐚 𝐃𝐢𝐚𝐫𝐢𝐚
 * 
 * "Cada día, Hanako-kun deja pequeños obsequios para
 * sus fieles asistentes en el Reino Espiritual..."
 * 
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃        七不思議        ┃
 * ┃   Los Siete Misterios   ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * 
 * ⋆｡˚ ☁︎｡⋆｡ ˚☽˚｡⋆ ✦ ⋆｡˚☁︎｡⋆｡ ˚☽˚｡⋆ ✦
 */

import moment from 'moment-timezone'

// ✧ Emojis y configuración
const emojiHanako = '🇯🇵' 
const emojiTiempo = '⏳'
const moneda = 'MayCoins'
const canalId = '120363372883715167@newsletter'

let handler = async (m, { conn }) => {
    try {
        // ✧ Si global.db o global.db.data no están inicializados
        if (!global.db || !global.db.data || !global.db.data.users) {
            conn.reply(m.chat, '『❗』 Base de datos no disponible o no inicializada', m)
            return
        }

        // ✧ Asegurarse de que exista el usuario en la base de datos
        if (!global.db.data.users[m.sender]) {
            global.db.data.users[m.sender] = {
                exp: 0,
                coin: 0,
                diamond: 0,
                lastclaim: 0,
                registered: false,
                name: conn.getName(m.sender)
            }
        }

        // ✧ Obtener datos del usuario
        const user = global.db.data.users[m.sender]
        const name = user.name || conn.getName(m.sender)

        // ✧ Verificar si está registrado (si es requerido)
        if (handler.register && !user.registered) {
            return conn.reply(
                m.chat,
                `『❗』 *¡No estás registrado!*
                
Para registrarte primero debes hacer un pacto con Hanako-kun.
Usa el comando: *_.registrar nombre.edad_*`,
                m
            )
        }

        // ✧ Generar recompensas
        let coin = Math.floor(Math.random() * (500 - 100 + 1)) + 100
        let exp = Math.floor(Math.random() * (500 - 100 + 1)) + 100
        let d = Math.floor(Math.random() * (500 - 100 + 1)) + 100

        // ✧ Verificar tiempo (inicializar lastclaim si es 0)
        if (!user.lastclaim) user.lastclaim = 0
        
        let time = user.lastclaim + 7200000 // 2 horas
        if (new Date() - user.lastclaim < 7200000) {
            return conn.reply(
                m.chat,
                `${emojiTiempo} *Los espíritus necesitan descansar...*

❀ Vuelve en ${msToTime(time - new Date())} para recibir más obsequios, ${name}-kun.

"La paciencia es una virtud incluso en el mundo espiritual..."`,
                m
            )
        }

        // ✧ Otorgar recompensas
        user.diamond += d
        user.coin += coin
        user.exp += exp

        // ✧ Preparar mensaje para el usuario
        const mensajeRecompensa = `
╭─「 ⋆｡˚☽˚｡⋆ 𝑶𝒃𝒔𝒆𝒒𝒖𝒊𝒐 𝑬𝒔𝒑𝒊𝒓𝒊𝒕𝒖𝒂𝒍 ⋆｡˚☽˚｡⋆ 」─╮
│    
│ ୨୧ *Asistente:* ${name}
│    
├─ ✧ 𝑩𝒆𝒏𝒅𝒊𝒄𝒊𝒐𝒏𝒆𝒔 𝑶𝒕𝒐𝒓𝒈𝒂𝒅𝒂𝒔:
│ ✦ *${moneda}:* +${coin}
│ ✨ *Energía Espiritual:* +${exp}
│ 💎 *Gemas Místicas:* +${d}
│ 🗨️ *Canal:* https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R
│ 📜 *Fecha:* ${moment().format('YYYY-MM-DD HH:mm:ss')}
│    
╰─「 ⋆｡˚☽˚｡⋆ ✧ ⋆｡˚☽˚｡⋆ 」─╯
`.trim()

        // ✧ Reacción mística (manejo de errores para esta operación)
        try {
            await m.react(emojiHanako)
        } catch (reactError) {
            console.error('Error al reaccionar:', reactError)
            // Continuar sin reacción si falla
        }

        // ✧ Método básico de respuesta en caso de fallo del método avanzado
        try {
            await conn.sendMessage(m.chat, {
                text: mensajeRecompensa,
                contextInfo: {
                    externalAdReply: {
                        title: '✧ Obsequio Diario de Hanako-kun ✧',
                        body: 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R',
                        thumbnailUrl: 'https://files.catbox.moe/xr2m6u.jpg',
                        sourceUrl: 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R',
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m })
        } catch (sendError) {
            console.error('Error al enviar mensaje avanzado:', sendError)
            // Si falla, intentar método simple
            conn.reply(m.chat, mensajeRecompensa, m)
        }

        // ✧ Enviar al canal (con manejo de errores)
        try {
            // ✧ Preparar mensaje para el canal
            const mensajeCanal = `
╭─「 ❀ 𝑹𝒆𝒄𝒐𝒎𝒑𝒆𝒏𝒔𝒂 𝑬𝒏𝒕𝒓𝒆𝒈𝒂𝒅𝒂 ❀ 」─╮
│ 🗨️ *Recompensa:* Diaria
│ ୨୧ *Asistente:* ${name}
│ 📱 *Número:* wa.me/${m.sender.split('@')[0]}
│
├─ ✧ 𝑩𝒆𝒏𝒅𝒊𝒄𝒊𝒐𝒏𝒆𝒔:
│ ✦ ${moneda}: +${coin}
│ ✨ Energía Espiritual: +${exp}
│ 💎 Gemas Místicas: +${d}
│
│ 📜 *Fecha:* ${moment().format('YYYY-MM-DD HH:mm:ss')}
╰─「 𝑷𝒐𝒓 𝒍𝒐𝒔 𝑺𝒊𝒆𝒕𝒆 𝑴𝒊𝒔𝒕𝒆𝒓𝒊𝒐𝒔 」─╯

> Reclama tu recompensa diaria con *_.diario_*.`

            // ✧ Método 1: Intentar desde el objeto global.conn
            if (global.conn && typeof global.conn.sendMessage === 'function') {
                // Obtener foto de perfil (con manejo de error)
                let pp
                try {
                    pp = await conn.profilePictureUrl(m.sender, 'image')
                } catch (ppError) {
                    pp = 'https://files.catbox.moe/xr2m6u.jpg'
                }

                await global.conn.sendMessage(canalId, {
                    image: { url: pp },
                    caption: mensajeCanal
                })
            } 
            // ✧ Método 2: Intentar desde el objeto conn local
            else if (conn && typeof conn.sendMessage === 'function') {
                let pp
                try {
                    pp = await conn.profilePictureUrl(m.sender, 'image')
                } catch (ppError) {
                    pp = 'https://files.catbox.moe/xr2m6u.jpg'
                }

                await conn.sendMessage(canalId, {
                    image: { url: pp },
                    caption: mensajeCanal
                })
            }
            // ✧ Método 3: Intentar un enfoque más simple si los anteriores fallan
            else {
                await conn.sendMessage(canalId, { text: mensajeCanal })
            }
        } catch (canalError) {
            console.error('Error al enviar al canal:', canalError)
            // Intentar un último método muy básico
            try {
                conn.reply(canalId, mensajeCanal)
            } catch (finalError) {
                console.error('Error en último intento de envío al canal:', finalError)
            }
        }

        // ✧ Actualizar el tiempo de reclamo al final, después de todo procesamiento
        user.lastclaim = Date.now()

    } catch (mainError) {
        console.error('Error principal en handler:', mainError)
        conn.reply(m.chat, `『❗』 Ocurrió un error: ${mainError.message}`, m)
    }
}

// ✧ Configuración del comando
handler.help = ['daily', 'claim', 'diario']
handler.tags = ['rpg']
handler.command = ['daily', 'diario', 'claim', 'reclamar', 'obsequio']
handler.group = true
handler.register = true

export default handler

/**
 * ✧ Convertir milisegundos a formato de tiempo legible
 */
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
    hours = (hours < 10) ? '0' + hours : hours
    minutes = (minutes < 10) ? '0' + minutes : minutes
    seconds = (seconds < 10) ? '0' + seconds : seconds
    
    return hours + ' Horas ' + minutes + ' Minutos'
}

/**
 * ─────────────────────────────────
 *      ╭──❁ Hanako-kun ❁──╮
 *      │ "Acepta este regalo│
 *      │  como muestra de   │
 *      │  nuestro pacto..." │
 *      ╰──────✦❘✦──────╯
 * ─────────────────────────────────
 */
