import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';

const handler = async (m, { conn }) => {
  const texto = m.text || '';
  if (/poeta/i.test(texto)) {
    try {
      // 1. Lista de frases de poetas (¡añade más para que sea aún más mágico!)
      const frasesDePoeta = [
        "El amor es la poesía de los sentidos. - Honoré de Balzac",
        "En un beso, sabrás todo lo que he callado. - Pablo Neruda",
        "Ama y haz lo que quieras. Si callas, callarás con amor; si gritas, gritarás con amor. - San Agustín",
        "El amor no tiene cura, pero es la única cura para todos los males. - Leonardo Cohen"
      ];

      // 2. Elegir una frase aleatoria
      const fraseAleatoria = frasesDePoeta[Math.floor(Math.random() * frasesDePoeta.length)];

      // 3. Construir la URL de la API con la frase aleatoria
      const apiUrl = `https://nightapi-6hbx.onrender.com/api/mayeditor?url=https://files.catbox.moe/vf6lhl.png&texto=${encodeURIComponent(fraseAleatoria)}&textodireccion=Arriba%20Izquierda&opacity=0.8&fontsize=60`;

      // 4. Hacer la petición a la API
      const response = await fetch(apiUrl);
      const data = await response.json();

      // 5. Verificar si la API devolvió una URL editada
      if (data && data.edited_url) {
        const imageUrl = data.edited_url;

        // 6. Descargar la imagen
        const tmpDir = tmpdir(); // Obtiene el directorio temporal del sistema
        const fileName = 'poeta_image.jpg'; // Nombre del archivo temporal
        const filePath = path.join(tmpDir, fileName); // Ruta completa al archivo temporal

        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.buffer();

        // 7. Guardar la imagen en el sistema de archivos temporalmente
        await writeFile(filePath, imageBuffer);

        // 8. Enviar la imagen al usuario
        await conn.sendFile(m.chat, filePath, 'poeta.jpg', `¡Aquí tienes tu frase de poeta! UwU`, m);
      } else {
        await conn.reply(m.chat, '¡Ups! No pude crear la imagen del poeta (╥﹏╥)', m);
      }
    } catch (error) {
      console.error(error);
      await conn.reply(m.chat, '¡Ay! Algo salió mal, no pude traer la frase del poeta :(', m);
    }
  }
};

handler.help = ['poeta'];
handler.tags = ['fun'];
handler.command = ['poeta'];
handler.register = true;

export default handler;
