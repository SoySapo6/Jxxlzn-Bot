import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 51921826291

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = ['51939260619', '51971285104']

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = [] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.vs = '2.2.0'
global.nameqr = 'Jxxlzn-Bot'
global.namebot = 'Jxxlzn-Bot'
global.sessions = 'JxxlznSession'
global.jadi = 'Jxxlzn-Bot' 
global.yukiJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '★𓊈𒆜ᴊxxʟᴢɴ-ʙᴏᴛ ᴍᴅ𒆜𓊉★'
global.botname = '𝕁𝕩𝕩𝕝𝕫𝕟-𝔹𝕠𝕥'
global.wm = '𝙹𝚡𝚡𝚕𝚣𝚗-𝙱𝚘𝚝'
global.author = '𝐉𝐱𝐱𝐥𝐳𝐧-𝐁𝐨𝐭'
global.dev = '𝐇𝐞𝐜𝐡𝐨 𝐩𝐨𝐫 𝕯𝖗𝖆𝖐𝖎𝖙𝖔'
global.textbot = '𝐉𝐱𝐱𝐥𝐳𝐧-𝐁𝐨𝐭 • 𝐇𝐞𝐜𝐡𝐨 𝐩𝐨𝐫 𝕯𝖗𝖆𝖐𝖎𝖙𝖔'
global.etiqueta = '𝕯𝖗𝖆𝖐𝖎𝖙𝖔'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = '𝐃𝐫𝐚𝐤𝐢𝐂𝐨𝐢𝐧𝐬'
global.welcom1 = '❍ Edita Con El Comando setwelcome'
global.welcom2 = '❍ Edita Con El Comando setbye'
global.banner = 'https://files.catbox.moe/wd2yh6.jpg'
global.avatar = 'https://files.catbox.moe/4jcr93.jpg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://chat.whatsapp.com/EprzCjr7XFyAIFr9OfBh2o'
global.comunidad1 = 'https://whatsapp.com/channel/0029Vb5SVuN7j6g43YZTR20b'
global.channel = 'https://whatsapp.com/channel/0029Vb5SVuN7j6g43YZTR20b'
global.channel2 = 'https://whatsapp.com/channel/0029Vb5SVuN7j6g43YZTR20b'
global.md = 'https://github.com/SoySapo6/Jxxlzn-Bot'
global.correo = '@gmail.com'
global.cn ='https://whatsapp.com/channel/0029Vb5SVuN7j6g43YZTR20b';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363372883715167@newsletter',
}
global.multiplier = 70

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
  
