// ✧･ﾟ: *✧･ﾟ:* 𝐉𝐢𝐛𝐚𝐤𝐮 𝐒𝐡𝐨𝐮𝐧𝐞𝐧 𝐇𝐚𝐧𝐚𝐤𝐨-𝐤𝐮𝐧 𝐓𝐡𝐞𝐦𝐞𝐝 *:･ﾟ✧*:･ﾟ✧
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path'
import ws from 'ws';

// ✦━━━━━━━━━━━━━✦
let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner }) => {
const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command)  
const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command)  
const isCommand3 = /^(bots|sockets|socket)$/i.test(command)  

async function reportError(e) {
await m.reply(`✖️⛓️ ¡𝐎𝐡 𝐧𝐨! Ocurrió un error inesperado en el mundo de los espíritus...`)
console.error(e)
}

// ╔═══[ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐒𝐨𝐛𝐫𝐞𝐧𝐚𝐭𝐮𝐫𝐚𝐥𝐞𝐬 ]═══╗
switch (true) {
case isCommand1: {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
const path = `./${jadi}/${uniqid}`

if (!await fs.existsSync(path)) {
await conn.sendMessage(m.chat, { 
text: `✖️ 𝑵𝒐 𝒆𝒙𝒊𝒔𝒕𝒆 𝒖𝒏𝒂 𝒔𝒆𝒔𝒊ó𝒏 𝒂𝒄𝒕𝒊𝒗𝒂. Puedes crear una con:\n${usedPrefix + command}\n\nSi tienes una *ID*, usa:\n*${usedPrefix + command}* \`\`\`(ID)\`\`\`` 
}, { quoted: m })
return
}
if (global.conn.user.jid !== conn.user.jid) {
return conn.sendMessage(m.chat, {text: `❌ Usa este comando con el *Bot Principal*\n\n➡️ https://wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix + command}`}, { quoted: m })
} else {
await conn.sendMessage(m.chat, { text: `☁️ La sesión como *Sub-Bot* ha sido eliminada por Hanako.` }, { quoted: m })
}
try {
fs.rmdir(`./${jadi}/` + uniqid, { recursive: true, force: true })
await conn.sendMessage(m.chat, { text: `🌙✨ ¡Sesión cerrada y exorcizada exitosamente!` }, { quoted: m })
} catch (e) {
reportError(e)
}
break
}

case isCommand2: {
if (global.conn.user.jid == conn.user.jid) {
conn.reply(m.chat, `⚠️ No eres un *Sub-Bot* aún. Solicita acceso con el espíritu principal del *Bot*.`, m)
} else {
await conn.reply(m.chat, `🔮 ${botname} ha entrado en modo descanso eterno...`, m)
conn.ws.close()
}
break
}

case isCommand3: {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];

function convertirMsADiasHorasMinutosSegundos(ms) {
var segundos = Math.floor(ms / 1000);
var minutos = Math.floor(segundos / 60);
var horas = Math.floor(minutos / 60);
var días = Math.floor(horas / 24);
segundos %= 60;
minutos %= 60;
horas %= 24;
var resultado = "";
if (días) resultado += `${días} días, `;
if (horas) resultado += `${horas} hrs, `;
if (minutos) resultado += `${minutos} min, `;
if (segundos) resultado += `${segundos} seg`;
return resultado;
}

const message = users.map((v, index) =>   
  `┏━━━━•(=^●ω●^=)•━━━━┓
🔸 𝕊𝕦𝕓-𝔹𝕠𝕥 #${index + 1}
┣━ ☎️: wa.me/${v.user.jid.replace(/[^0-9]/g, '')}
┣━ 👤 Usuario: ${v.user.name || 'Sub-Bot'}
┣━ 🇯🇵 Creador: SoyMaycol <3
┗━ ⏰ Online: ${v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido'}`
).join('\n┗━━━━•(=^●ω●^=)•━━━━┛\n\n');
  
const replyMessage = message.length === 0 
? `✖️ No hay *Sub-Bots* conectados con la Academia Kamome...`
: message;

const responseMessage = `✎ 𝐋𝐢𝐬𝐭𝐚 𝐃𝐞 𝐇𝐚𝐧𝐚𝐤𝐨-𝐁𝐨𝐭𝐬 ✎\n\nHola Jeje ^^ Estos son las personas que me tienen a mi jeje <3\n\n> Hecho por *_SoyMaycol <3_*\n\nSi Quieres puedes hacerte Hanako-Bot con #code o #qr jeje ^^\n\n~*Estas lindas personitas me tienen jeje <3 en cual en total son ${users.length || '0'}*~\n\n${replyMessage}`;
await _envio.sendMessage(m.chat, {text: responseMessage, mentions: _envio.parseMention(responseMessage)}, {quoted: m})
break
}
}}

handler.tags = ['serbot']
handler.help = ['sockets', 'deletesesion', 'pausarai']
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket']

export default handler
