import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

let globalBot = null;
let botRestartInterval = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Ruta para escribir el número manualmente
app.get('/auth/:numero', (req, res) => {
  const numero = req.params.numero;
  console.log(`Escribiendo número manualmente: ${numero}`);

  if (globalBot && globalBot.stdin) {
    globalBot.stdin.write(numero + '\n');
    res.send(`Número ${numero} enviado al bot correctamente`);
  } else {
    res.send('El bot no está iniciado o no acepta entrada estándar');
  }
});

const server = app.listen(PORT, () => {
  console.log(`Servidor web iniciado en el puerto ${PORT}`);
});

// Función para iniciar el bot
function startBot() {
  console.log('Iniciando YukiBot-MD con --max-old-space-size=146...');

  if (globalBot) {
    globalBot.kill();
    console.log('Bot anterior detenido');
  }

  const bot = spawn('node', ['index.js'], {
  stdio: ['pipe', 'inherit', 'inherit']
});

  globalBot = bot;

  bot.on('close', (code) => {
    console.log(`Bot finalizado con código ${code}`);
    if (code !== 0) {
      console.log('Reiniciando bot en 5 segundos...');
      setTimeout(startBot, 5000);
    }
  });

  // Reinicio programado cada 30 minutos
  if (botRestartInterval) clearInterval(botRestartInterval);
  botRestartInterval = setInterval(() => {
    console.log('Reiniciando bot automáticamente cada 30 minutos...');
    startBot();
  }, 30 * 60 * 1000); // 30 minutos
}

startBot();

// Cierre del servidor y del bot
process.on('SIGINT', () => {
  console.log('Cerrando servidor y bot...');
  if (globalBot) globalBot.kill();
  if (botRestartInterval) clearInterval(botRestartInterval);
  server.close(() => {
    process.exit(0);
  });
});
