const handler = async (m, {conn, args}) => {
  if (!args[0]) throw 'Escribe la nueva descripción.';

  const firma = '\n\n> MaycolAIUltraMD • SoyMaycol';
  const nuevaDescripcion = `${args.join(' ')}${firma}`;

  await conn.groupUpdateDescription(m.chat, nuevaDescripcion);

  const textoRespuesta = `🇯🇵 Hanako Kun 🇯🇵\n\nHola querido usuario ^^,\nHe cambiado la descripción a:\n\n${nuevaDescripcion}\n\nEspero disfrutes de esta nueva descripción jeje ^^`;

  await conn.sendMessage(m.chat, {
    text: textoRespuesta,
    contextInfo: {
      externalAdReply: {
        title: 'Descripción actualizada',
        body: 'MaycolAIUltraMD • SoyMaycol',
        thumbnailUrl: 'https://files.catbox.moe/rgi9f7.jpeg', // Cambia esto por tu imagen
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R'
      }
    }
  }, { quoted: m });
};

handler.help = ['groupdesc <texto>'];
handler.tags = ['grupo'];
handler.command = ['gpdesc', 'groupdesc'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
