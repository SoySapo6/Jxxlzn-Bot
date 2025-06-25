import fs from 'fs';
import path from 'path';
import axios from 'axios';

let handler = async (m, { conn, usedPrefix }) => {
    let frases = [
        {
            personaje: ' 【 MENU PREM BOTS 】 ',
            frase: 'Hola Soy Tanjiro (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Tanjiro\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Tanjiro\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Dark Brxzzz.
',
            imagen: 'https://qu.ax/SGDrw.jpg',
            icono: 'https://qu.ax/uLhOy.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/iUBoW.jpg',
            icono: 'https://qu.ax/XRsZZ.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/ldtsS.jpg',
            icono: 'https://qu.ax/HLqhy.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/R0v7T.jpg',
            icono: 'https://qu.ax/tv36s.jpg',
            canal: 'https://whatsapp.com/channel/0029VakLbM76mYPPFL0IFI3P'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/zEktf.png',
            icono: 'https://qu.ax/eYQPF.jpeg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/NjfcJ.jpg',
            icono: 'https://qu.ax/hKVCD.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/5y0lM.jpg',
            icono: 'https://qu.ax/m7e2Y.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '♥️ 【 MENU PREM BOTS 】 ♥️',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/JETiZ.jpg',
            icono: 'https://qu.ax/GLoHn.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/dqRiC.png',
            icono: 'https://qu.ax/tgqkZ.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/eUzLi.jpg',
            icono: 'https://qu.ax/uxSvb.png',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
.',
            imagen: 'https://qu.ax/zupOV.jpg',
            icono: 'https://qu.ax/JbEnl.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/CrNBM.jpg',
            icono: 'https://qu.ax/OaBwM.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/DKlAD.jpg',
            icono: 'https://qu.ax/Ariqh.jpeg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/SnQfR.png',
            icono: 'https://qu.ax/uUcYq.jpeg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'si no arriesgas tu vida, no puedes crear un futuro.',
            imagen: 'https://files.catbox.moe/9ccgaf.jpg',
            icono: 'https://files.catbox.moe/2mdcxf.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAOVajAO7RQt3rS683e'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://files.catbox.moe/42fduv.jpg',
            icono: 'https://files.catbox.moe/v0nxvk.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://files.catbox.moe/e6qji2.png',
            icono: 'https://files.catbox.moe/oc9zwf.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://files.catbox.moe/vtyjh0.jpg',
            icono: 'https://files.catbox.moe/9rugzk.webp',
            canal: 'https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://files.catbox.moe/64f81b.jpg',
            icono: 'https://files.catbox.moe/88xgpo.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://files.catbox.moe/kl0gim.jpg',
            icono: 'https://files.catbox.moe/r4yx7z.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAa5sNCsU9Hlzsn651S'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://files.catbox.moe/izrj29.jpg',
            icono: 'https://files.catbox.moe/zyrq8w.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAa5sNCsU9Hlzsn651S'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://files.catbox.moe/uhkl02.jpg',
            icono: 'https://files.catbox.moe/vzykg3.jpg',
            canal: 'https://whatsapp.com/channel/0029VbAa5sNCsU9Hlzsn651S'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://files.catbox.moe/8ukw2l.jpg',
            icono: 'https://files.catbox.moe/g5bisg.jpg',
            canal: 'https://chat.whatsapp.com/DEGsbJYf7BBDe8c7R2dUxU'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://files.catbox.moe/8ukw2l.jpg',
            icono: 'https://files.catbox.moe/g5bisg.jpg',
            canal: 'https://chat.whatsapp.com/DEGsbJYf7BBDe8c7R2dUxU'
        },
        {
            personaje: '🩵 【 MENU PREM BOTS 】 🩵',
            frase: 'Hola Soy Makima (Prem-Bot)\n\n╭━━━━━━━━━━\n┃Prem-Bots Makima\n┃Makima\n╰━━━━━━━━━━━━━\n\nAquí va a ir la lista de los comandos para Premium Bots de Makima\n\nLa versión premium está en proceso de desarrollo.\n\n> Made with Félix.
',
            imagen: 'https://qu.ax/nmpSD.jpeg',
            icono: 'https://qu.ax/XPrwK.jpg',
            canal: 'https://chat.whatsapp.com/DEGsbJYf7BBDe8c7R2dUxU'
        }
    ];

    const elegido = frases[Math.floor(Math.random() * frases.length)];
    let str = ` *${elegido.personaje}* dice:\n\n_"${elegido.frase}"_`;

    // Descargar el icono como buffer
    const thumb = await axios.get(elegido.icono, { responseType: 'arraybuffer' }).then(res => res.data);

    m.react('✉️');

    conn.sendMessage(m.chat, {
        image: { url: elegido.imagen },
        caption: str,
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 3,
                showAdAttribution: true,
                title: elegido.personaje,
                body: wm,
                previewType: 0,
                thumbnail: thumb,
                sourceUrl: channel,
            },
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363418804796632@newsletter',
                newsletterName: 'PREM BOTS MAKIMA ',
                serverMessageId: '-1'
            }
        }
    }, { quoted: m });
}

handler.help = ['fraseanime'];
handler.tags = ['anime'];
handler.command = ['menuprembots', 'makima'];

export default handler;