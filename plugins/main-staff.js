let handler = async (m, { conn, command, usedPrefix }) => {
  let img = 'https://files.catbox.moe/67ulz8.jpeg';
  let staff = `╭─❍「 ✦ Staff ✦ 」 
│
├─ ✧ *Dueño:* SoyMaycol <3
├─ ✧ *Número:* wa.me/51921826291
├─ ✧ *GitHub:* https://github.com/SoySapo6
│
├─ ✦ *Bot:* ${botname}
├─ ⚘ *Versión:* ${vs}
├─ ❖ *Librería:* ${libreria} ${baileys}
│
╰─✦ Que los espíritus te guíen...`;

  await conn.sendFile(m.chat, img, 'hanako-staff.jpg', staff.trim(), fkontak);
};

handler.help = ['staff'];
handler.command = ['colaboradores', 'staff'];
handler.register = true;
handler.tags = ['main'];

export default handler;
