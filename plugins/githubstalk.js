import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, '*⚠️ INGRESE EL NOMBRE DE UN USUARIO DE GITHUB*', m)

  try {
    let user = text.trim()
    let data = await githubstalk(user)

    let {
      username,
      following,
      followers,
      type,
      bio,
      company,
      blog,
      location,
      email,
      public_repo,
      public_gists,
      profile_pic
    } = data

    let msg = `*⬤── 「 𝙂𝙄𝙏𝙃𝙐𝘽 𝙎𝙏𝘼𝙇𝙆 」 ──⬤*
➸ *Usuario:* ${username}
➸ *Biografía:* ${bio || 'No disponible'}
➸ *Compañía:* ${company || 'No disponible'}
➸ *Correo electrónico:* ${email || 'No disponible'}
➸ *Repos públicos:* ${public_repo}
➸ *Gists públicos:* ${public_gists}
➸ *Seguidores:* ${followers}
➸ *Siguiendo:* ${following}
➸ *Blog:* ${blog || 'No disponible'}
➸ *Ubicación:* ${location || 'No disponible'}
➸ *Tipo de cuenta:* ${type}`

    await conn.sendFile(m.chat, profile_pic, 'perfil.jpg', msg, m)
  } catch (e) {
    console.error('[ERROR GITHUB]', e)
    conn.reply(m.chat, '*❌ Ocurrió un error al buscar el usuario. Asegúrate de que existe.*', m)
  }
}

handler.help = ['githubstalk']
handler.tags = ['tools']
handler.command = ['githubstalk', 'github']
handler.register = true
export default handler

async function githubstalk(user) {
  const { data } = await axios.get(`https://api.github.com/users/${user}`)
  return {
    username: data.login,
    bio: data.bio,
    company: data.company,
    blog: data.blog,
    location: data.location,
    email: data.email,
    public_repo: data.public_repos,
    public_gists: data.public_gists,
    followers: data.followers,
    following: data.following,
    type: data.type,
    profile_pic: data.avatar_url
  }
}
