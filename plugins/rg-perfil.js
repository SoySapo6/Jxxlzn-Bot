import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    }

    let user = global.db.data.users[userId];
    let name = conn.getName(userId);
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let pareja = user.marry || 'Nadie';
    let description = user.description || 'Sin descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Sin Rango';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;

    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    let profileText = `
╭─────⋞❁༻ 𝑷𝑬𝑹𝑭𝑰𝑳 ༺❁⋟─────╮
│ ✦ 𝙐𝙨𝙪𝙖𝙧𝙞𝙤: @${userId.split('@')[0]}
│ ✦ 𝙉𝙤𝙢𝙗𝙧𝙚: ${name}
│ ✦ 𝘿𝙚𝙨𝙘.: ${description}
│
│ ☪ 𝙀𝙙𝙖𝙙: ${user.age || 'Desconocida'}
│ ☾ 𝘾𝙪𝙢𝙥𝙡𝙚: ${cumpleanos}
│ ⚥ 𝙂é𝙣𝙚𝙧𝙤: ${genero}
│ ♡ 𝘾𝙖𝙨𝙖𝙙𝙤 𝙘𝙤𝙣: ${pareja}
│
│ ✦ 𝙀𝙭𝙥: ${exp.toLocaleString()}
│ ✦ 𝙉𝙞𝙫𝙚𝙡: ${nivel}
│ ✦ 𝙍𝙖𝙣𝙜𝙤: ${role}
│
│ ⛁ 𝘾𝙖𝙧𝙩𝙚𝙧𝙖: ${coins.toLocaleString()} ${moneda}
│ ⛃ 𝘽𝙖𝙣𝙘𝙤: ${bankCoins.toLocaleString()} ${moneda}
│ ❁ 𝙋𝙧𝙚𝙢𝙞𝙪𝙢: ${user.premium ? '✅ Activo' : '❌ Inactivo'}
╰────────────────────────╯`.trim();

    await conn.sendMessage(m.chat, { 
        text: profileText,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '✧ 𝙋𝙚𝙧𝙛𝙞𝙡 𝘿𝙚 𝙐𝙨𝙪𝙖𝙧𝙞𝙤 ✧',
                body: dev,
                thumbnailUrl: perfil,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;
