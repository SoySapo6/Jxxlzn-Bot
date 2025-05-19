const chistes = [
  "¿Por qué los pájaros vuelan hacia el sur en invierno? ¡Porque caminar es demasiado lejos! (≧◡≦)",
  "¿Qué le dice un semáforo a otro? ¡No me mires, me estoy cambiando! ♡",
  "¿Cuál es el pez más presumido? El pez-ume. (⌒▽⌒)",
  "¿Qué hace una abeja en el gimnasio? ¡Zum-ba! >w<",
  "¿Por qué los fantasmas son malos mentirosos? ¡Porque se les ve transparentes! (o˘◡˘o)",
];

const handler = async (m, { conn }) => {
  const texto = m.text || '';
  if (/chistemalo/i.test(texto)) {
    const chisteAleatorio = chistes[Math.floor(Math.random() * chistes.length)];
    await conn.reply(m.chat, chisteAleatorio, m);
  }
};

handler.help = ['chistemalo'];
handler.tags = ['fun'];
handler.command = ['chistemalo'];
handler.register = true;

export default handler;
