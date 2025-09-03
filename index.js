//==========[ MÓDULOS ]=============\\

const { Telegraf } = require('telegraf');
const fs = require('fs');
const fetch = require('node-fetch');
const cfonts = require('cfonts');

async function fetchJson(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`[fetchJson] Erro ao acessar ${url}:`, err.message);
        return null;
    }
}

// ===== Console Estilizado =====
function logComando(ctx, comando) {
const user = ctx.from?.username ? `@${ctx.from.username}` : ctx.from?.first_name || "Usuário";
const chat = ctx.chat?.title || "Privado";
const cor = "\x1b[35m";
const reset = "\x1b[0m";
console.log(`\n${cor}╔════════════════════════╗${reset}
${cor}║ 💖 Comando usado 🐹${reset}
${cor}╟────────────────────────${reset}
${cor}║ 👤 Usuário: ${user} ${reset}
${cor}║ 🌸 Chat: ${chat} ${reset}
${cor}║ 💬 Comando: /${comando} ${reset}
${cor}╚════════════════════════╝${reset}\n`);
}


//==========CONFIGURAÇÕES============//

const caminhoAutoDown = './arquivos/autodown.json';
if (!fs.existsSync(caminhoAutoDown)) fs.writeFileSync(caminhoAutoDown, JSON.stringify([]));

function jaProcessou(id) {
  const data = JSON.parse(fs.readFileSync(caminhoAutoDown));
  return data.includes(id);
}

function marcarComoProcessado(id) {
  const data = JSON.parse(fs.readFileSync(caminhoAutoDown));
  data.push(id);
  fs.writeFileSync(caminhoAutoDown, JSON.stringify(data));
  setTimeout(() => {
    const novo = JSON.parse(fs.readFileSync(caminhoAutoDown)).filter(x => x !== id);
    fs.writeFileSync(caminhoAutoDown, JSON.stringify(novo));
  }, 5000);
}

// Variável de controle do AutoDown
let autoDownloadAtivo = true;

var { tokenTelegram, donoName, botName, Logomenu, PREFIX } = require("./dono/settings.json");

// Pegue o token com o bot: @BotFather
// Entre no chat dele e digite: /newbot

// Banners console
const banner2 = cfonts.render(("CRIADOR: ZENOMODS\nINSTAGRAM: EUZENOM"), {
    font: 'console',
    align: 'center', 
    gradient: ['red', 'magenta'],
});
 
const banner3 = cfonts.render(("TESSIA"), {
  font: 'block',
  align: "center",
  gradient: ["red", "magenta"]
});

// Definição módulo de loguin
const bot = new Telegraf(tokenTelegram);

// Símbolo pelo qual o bot responde
const prefix = PREFIX

// Função para enviar mensagens
const enviar = (ctx, texto) => {
    ctx.reply(texto);
};

// Chave pras rotas api
const KEY_ZERO = "YatoDominas";

// Verifica se o usuário é admin
async function isAdmin(ctx) {
try {
const admins = await ctx.getChatAdministrators();
return admins.some(admin => admin.user.id === ctx.from.id);
} catch {
return false;
}
}

bot.use((ctx, next) => {
if (ctx.message && ctx.message.text) {
const messageText = ctx.message.text.trim();
if (messageText.startsWith(PREFIX)) {
const command = messageText.split(' ')[0].substring(PREFIX.length);
ctx.state.command = command;
ctx.state.args = messageText.split(' ').slice(1);
}
}
return next();
});

const yt = require("ytdl-core")
const yts = require("yt-search")

// Buscar o primeiro resultado do youTube
async function getFirstVideo(query) {
try {
const result = await yts(query);
if (!result || !result.videos || result.videos.length === 0) {
return null;
}
return result.videos[0];
} catch (err) {
console.error("Erro ao buscar vídeo:", err);
return null;
}
}

const { ytmp3 } = require("@vreden/youtube_scraper");

// Download de áudio por módulo
async function downloadMP3(ctx, url) {
try {
let result;
try {
 result = await ytmp3(url, "92");
} catch {
 result = await ytmp3(url, "128");
}
if (result.status && result.download) {
await ctx.replyWithAudio({url: result.download.url}, {
title: res.titulo,
performer: "YouTube",
reply_to_message_id: ctx.message.message_id});
} else {
console.error("Erro ao buscar audio:", error);
}
} catch (error) {
console.error("Erro no download MP3:", error.message);
}
}

const { ttdl, igdl, fbdown, youtube } = require('btch-downloader');

// All downloads de vídeo por módulos
async function DownMp4(ctx, url) {

try {
let res;

if (url.includes("tiktok.com")) {
res = await ttdl(url);
if (res && res.video) return ctx.replyWithVideo({url: res.video}, {parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id
});
}

if (url.includes("instagram.com")) {
res = await igdl(url);
if (res) return ctx.replyWithVideo({url: res.result[0].url}, {parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id
});
}

if (url.includes("facebook.com") || url.includes("fb.watch")) {
res = await fbdown(url);
if (res && res[0]?.url) return ctx.replyWithVideo({url: res[0].url}, {parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id
});
}

if (url.includes("youtube.com") || url.includes("youtu.be")) {
res = await youtube(url);
if (res) return ctx.replyWithVideo({url: videoUrl}, {parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id
});
}
} catch (error) {
console.error("Erro DownMp4:", error);
}
}

// Comandos do bot
bot.start((ctx) => {
enviar(ctx, `👋 𝖮𝗅𝖺! 𝖤𝗎 𝗌𝗈𝗎 ${botName}, 𝗌𝗎𝖺 𝖺𝗌𝗌𝗂𝗌𝗍𝖾𝗇𝗍𝖾 𝗂𝗇𝗍𝖾𝗅𝗂𝗀𝖾𝗇𝗍𝖾.

🧠 𝖢𝗈𝗆𝖺𝗇𝖽𝗈𝗌 𝖽𝗂𝗌𝗉𝗈𝗇𝗂𝗏𝖾𝗂𝗌: - 𝖯𝖺𝗋𝖺 𝖼𝗈𝗆𝖾𝖼𝖺𝗋, 𝗎𝗌𝖾 𝗈 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 /𝗆𝖾𝗇𝗎 𝖾 𝗏𝖾𝗃𝖺 𝗍𝗈𝖽𝖺𝗌 𝖺𝗌 𝗈𝗉𝖼𝗈𝖾𝗌 𝖽𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌.
  
𝖵𝖺𝗆𝗈𝗌 𝖼𝗈𝗆𝖾𝖼𝖺𝗋, 𝖲𝖾 𝗍𝗂𝗏𝖾𝗋 𝖺𝗅𝗀𝗎𝗆𝖺 𝖽𝗎𝗏𝗂𝖽𝖺 𝖾𝗌𝗍𝗈𝗎 𝖺𝗊𝗎𝗂 𝗉𝖺𝗋𝖺 𝖺𝗃𝗎𝖽𝖺𝗋! 😊`, {reply_to_message_id: ctx.message.message_id});
});

bot.on('text', (ctx) => {
const command = ctx.state.command;

// ================= AUTO DOWNLOAD ==================
if (autoDownloadAtivo && ctx.message && ctx.message.text) {
const texto = ctx.message.text;

// Evitar processar 2x a mesma mensagem
if (!jaProcessou(ctx.message.message_id)) {
marcarComoProcessado(ctx.message.message_id);

const dominioInsta = ["instagram.com/reel", "instagram.com/share/reel"];
const dominioTikTok = ["tiktok.com", "https://vm.tiktok.com", "www.tiktok.com"];
const dominioFacebook = ["https://facebook.com", "facebook.com", "fb.com", "www.facebook.com"];
const dominioKwai = ["kwai.com", "www.kwai.com", "s.kw.ai"];
const dominioYouTube = ["youtube.com", "www.youtube.com", "youtu.be"];

// Função extrair link
const link = (texto) => {
const start = texto.indexOf("https://");
const end = texto.indexOf(" ", start) !== -1 ? texto.indexOf(" ", start) : texto.length;
return texto.substring(start, end);
};

(async () => {
try {
if (dominioInsta.some((d) => texto.includes(d))) {
const instagramLink = link(texto);
const aguarde = await ctx.reply("⏳ Baixando vídeo do Instagram..");
await DownMp4(ctx, instagramLink);
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, "✅ Vídeo enviado com sucesso.");
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
}

if (dominioTikTok.some((d) => texto.includes(d))) {
const tikTokLink = link(texto);
const aguarde = await ctx.reply("⏳ Baixando vídeo do Tiktok..");
await DownMp4(ctx, tikTokLink);
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, "✅ Vídeo enviado com sucesso.");
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
}

if (dominioFacebook.some((d) => texto.includes(d))) {
const facebookLink = link(texto);
const aguarde = await ctx.reply("⏳ Baixando vídeo do Facebook..");
await DownMp4(ctx, facebookLink);
await ctx.reply("✅ Vídeo enviado!");
}

if (dominioKwai.some((d) => texto.includes(d))) {
const kwaiLink = link(texto);
const aguarde = await ctx.reply("⏳ Baixando vídeo do Kwai..");
const ABC = await fetchJson(`https://zero-two-apis.com.br/api/kwai/video?url=${kwaiLink}&apikey=${KEY_ZERO}`);
if (ABC && ABC.resultados) {
await ctx.replyWithVideo({url: ABC.resultados.video});
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, "✅ Vídeo enviado com sucesso.");
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
}
}

if (dominioYouTube.some((d) => texto.includes(d))) {
const ytLink = link(texto);
const aguarde = await ctx.reply("⏳ Baixando vídeo do Youtube..");
await DownMp4(ctx, ytLink);
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, "✅ Vídeo enviado com sucesso.");
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
}

} catch (error) {
console.error("Erro AutoDownload:", error);
ctx.reply("⚠️ Ocorreu um erro ao baixar o vídeo.");
}
})();
}
}

if (!command) return;
logComando(ctx, command);

switch (command) {
case 'menu':
let caption = `╔──── ୨୧ ──────── ୨୧ ────╗
┊
┊ ⚙️ 𝖠𝖽𝗆𝗂𝗇𝗂𝗌𝗍𝗋𝖺𝗍𝗂𝗏𝗈𝗌:
┊
┊𓆩♡𓆪 /ban [mencione] - [motivo]
┊𓆩♡𓆪 /mute [mencione] - [tempo]
┊𓆩♡𓆪 /desmute [mencione]
┊𓆩♡𓆪 /limpar [quantidade]
┊
┊ 🗂 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗌:
┊
┊𓆩♡𓆪 /playaudio [nome] - audio
┊𓆩♡𓆪 /playvideo [nome] - video
┊𓆩♡𓆪 /instavideo [url] - video
┊𓆩♡𓆪 /tiktokvideo [url] - video
┊𓆩♡𓆪 /pinterest [nome] - image
┊𓆩♡𓆪 /pinvideo [url] - video
┊
┊ 🤖 𝖨𝗇𝗍𝖾𝗅𝗂𝗀𝖾𝗇𝖼𝗂𝖺:
┊
┊𓆩♡𓆪 /gpt [sua pergunta]
┊
┊ 📥 𝖲𝗂𝗌𝗍𝖾𝗆𝖺 𝖺𝗎𝗍𝗈𝖽𝗈𝗐𝗇 [ url ]
┊
┊ ℹ️ 𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝖼𝗈𝖾𝗌:
┊
┊𓆩♡𓆪 𝖢𝗋𝗂𝖺𝖽𝗈𝗋: ${donoName}
┊𓆩♡𓆪 𝖭𝗈𝗆𝖾: ${botName}
┊𓆩♡𓆪 𝖧𝗈𝗌𝗍: hostscale.shop
┊
╚──── ୨୧ ──────── ୨୧ ────╝`;
return enviar(ctx, caption);
break;

case 'ban':
if (!isAdmin(ctx)) {
return enviar(ctx, '❌ Apenas administradores podem usar este comando.');
}
if (!ctx.message.reply_to_message) {
return enviar(ctx, '❗ Responda a uma mensagem do usuário que deseja banir.');
}
const motivoBan = ctx.state.args.join(' ') || 'Sem motivo informado';
ctx.kickChatMember(ctx.message.reply_to_message.from.id)
    .then(() => enviar(ctx, `🚫 Usuário banido com sucesso!\n📝 Motivo: ${motivoBan}`))
    .catch(() => enviar(ctx, '❌ Não consegui banir o usuário. Verifique se tenho permissões.'));
break;

case 'mute':
if (!isAdmin(ctx)) {
return enviar(ctx, '❌ Apenas administradores podem usar este comando.');
}
if (!ctx.message.reply_to_message) return enviar(ctx, '❗ Responda ao usuário que deseja silenciar.');
const minutos = parseInt(ctx.state.args[0]) || 10;
const untilDate = Math.floor(Date.now() / 1000) + (minutos * 60);

ctx.restrictChatMember(ctx.message.reply_to_message.from.id, {
    permissions: { can_send_messages: false },
    until_date: untilDate
}).then(() => {
    enviar(ctx, `🔇 Usuário silenciado por ${minutos} minuto(s).`);
}).catch(() => enviar(ctx, '❌ Erro ao silenciar o usuário.'));
break;

case 'desmute':
if (!isAdmin(ctx)) {
return enviar(ctx, '❌ Apenas administradores podem usar este comando.');
}
if (!ctx.message.reply_to_message) return enviar(ctx, '❗ Responda ao usuário que deseja desmutar.');

ctx.restrictChatMember(ctx.message.reply_to_message.from.id, {
    permissions: {
        can_send_messages: true,
        can_send_media_messages: true,
        can_send_polls: true,
        can_send_other_messages: true,
        can_add_web_page_previews: true,
        can_change_info: false,
        can_invite_users: true,
        can_pin_messages: false
    }
}).then(() => {
enviar(ctx, `🔊 Usuário desmutado com sucesso.`);
}).catch(() => enviar(ctx, '❌ Não consegui desmutar o usuário.'));
break;

case 'limpar':
(async () => {
if (!isAdmin(ctx)) {
return enviar(ctx, '❌ Apenas administradores podem usar este comando.');
}
if (!ctx.from || !ctx.chat || !ctx.message) return;

const quantidade = parseInt(ctx.state.args[0]) || 5;
  if (quantidade > 100) return enviar(ctx, '❗ Máximo permitido é 100 mensagens.');

const chatId = ctx.chat.id;

try {
    // Apenas deleta mensagens recentes do próprio bot
const mensagensApagadas = [];
for (let i = ctx.message.message_id - 1; i > ctx.message.message_id - quantidade - 1; i--) {
try {
await ctx.telegram.deleteMessage(chatId, i);
        mensagensApagadas.push(i);
} catch {}
}

} catch (err) {
enviar(ctx, '❌ Não consegui apagar mensagens. Verifique minhas permissões.');
}
})();
break;


case 'playaudio':
if (ctx.state.args.length === 0) {
return ctx.reply('❗ Use: /playaudio nome_da_música', {reply_to_message_id: ctx.message.message_id});
}

(async () => {
const aguarde = await ctx.reply('⏳ Buscando música..', { reply_to_message_id: ctx.message.message_id});
const con = encodeURIComponent(ctx.state.args.join(' '));
try {
const data = await getFirstVideo(con);
const reson = await ytmp3(data.url, "92");

const caption = `☇ ᨞⁞🎧⃞⃞⚝ *TITULO:* ${data.title}\n‒\n` +
                `☇ ᨞⁞👤⃞⃞⚝ *CANAL:* ${data.author.name}\n‒\n` +
                `☇ ᨞⁞⏳⃞⃞⚝ *TEMPO:* ${data.timestamp}\n‒\n` +
                `☇ ᨞⁞📆⃞⃞⚝ *PUBLICADO:* ${data.ago || "não encontrado"}\n‒\n` +
                `️☇ ᨞⁞👁⃞⃞⚝ *VIEWS:* ${data.views}\n‒\n` +
                `☇ ᨞⁞💬⃞⃞⚝ *DESCRIÇÃO:* ${data.description || "não encontrado"}\n‒\n` +
                `*OBS: ENVIANDO SUA MUSICA.*`;

await ctx.replyWithPhoto({url: data.thumbnail}, {caption,
parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id});

await ctx.replyWithAudio({url: reson.download.url}, {
title: data.title,
performer: "YouTube",
reply_to_message_id: ctx.message.message_id});

await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '✅ Música enviada com sucesso.');
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
} catch (error) {
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '❌ Música não encontrada.');
}
})();
break;

case 'playvideo':
if (ctx.state.args.length === 0) {
return ctx.reply('❗ Use: /playvideo nome_do_video', {
reply_to_message_id: ctx.message.message_id});
}

(async () => {

const aguarde = await ctx.reply('⏳ Baixando vídeo..', {
reply_to_message_id: ctx.message.message_id});
const son = encodeURIComponent(ctx.state.args.join(' '));
try {
const date = await getFirstVideo(son);
let rss = await youtube(date.url);

const caption = `☇ ᨞⁞🎧⃞⃞⚝ *TITULO:* ${date.title}\n‒\n` +
                `☇ ᨞⁞👤⃞⃞⚝ *CANAL:* ${date.author.name}\n‒\n` +
                `☇ ᨞⁞⏳⃞⃞⚝ *TEMPO:* ${date.timestamp}\n‒\n` +
                `☇ ᨞⁞📆⃞⃞⚝ *PUBLICADO:* ${date.ago || "não encontrado"}\n‒\n` +
                `️☇ ᨞⁞👁⃞⃞⚝ *VIEWS:* ${date.views}\n‒\n` +
                `☇ ᨞⁞💬⃞⃞⚝ *DESCRIÇÃO:* ${date.description || "não encontrado"}\n‒\n` +
                `*OBS: ENVIANDO SEU VIDEO.*`;

await ctx.replyWithPhoto({url: date.thumbnail}, {caption,
parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id});

await ctx.replyWithVideo({url: rss.mp4}, {
parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id
});

await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '✅ Vídeo enviado com sucesso.');
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
} catch (error) {
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '❌ Video não encontrado.');
}
})();
break;

case 'instavideo':
if (ctx.state.args.length === 0) {
return ctx.reply('❗ Use: /instavideo url', {
reply_to_message_id: ctx.message.message_id});
}

(async () => {

const aguarde = await ctx.reply('⏳ Baixando vídeo..', {
reply_to_message_id: ctx.message.message_id});
const zin = encodeURIComponent(ctx.state.args.join(' '));
try {
let rus = await igdl(zin);

await ctx.replyWithVideo({url: rus.result[0].url}, {
parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id
});

await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '✅ Vídeo enviado com sucesso.');
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
} catch (error) {
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '❌ Video não encontrado.');
}
})();
break;

case 'tiktokvideo':
if (ctx.state.args.length === 0) {
return ctx.reply('❗ Use: /tiktokvideo url', {
reply_to_message_id: ctx.message.message_id});
}

(async () => {

const aguarde = await ctx.reply('⏳ Baixando vídeo..', {
reply_to_message_id: ctx.message.message_id});
const zun = encodeURIComponent(ctx.state.args.join(' '));
try {
let rws = await ttdl(zun);

await ctx.replyWithVideo({url: rws.video }, {
parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id
});

await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '✅ Vídeo enviado com sucesso.');
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
} catch (error) {
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '❌ Video não encontrado.');
}
})();
break;

case 'pinvideo':
if (ctx.state.args.length === 0) {
return ctx.reply('❗ Use: /pinvideo url', {
reply_to_message_id: ctx.message.message_id});
}

(async () => {

const aguarde = await ctx.reply('⏳ Baixando vídeo..', {
reply_to_message_id: ctx.message.message_id});
const zw = encodeURIComponent(ctx.state.args.join(' '));
try {
const datu = await fetchJson(`https://zero-two-apis.com.br/api/pinterest_mp4?url=${zw}&apikey=${KEY_ZERO}`);

await ctx.replyWithVideo({url: datu.resultados.videoLinks[0].link }, {
parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id
});

await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '✅ Vídeo enviado com sucesso.');
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
} catch (error) {
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '❌ Video não encontrado.');
}
})();
break;

case 'pinterest':
if (ctx.state.args.length === 0) {
return ctx.reply('❗ Use: /pinterest nome', {
reply_to_message_id: ctx.message.message_id});
}

(async () => {

const aguarde = await ctx.reply('⏳ Buscando imagem..', {
reply_to_message_id: ctx.message.message_id});
const ax = encodeURIComponent(ctx.state.args.join(' '));
try {
const randin = Math.floor(Math.random() * 100000);

await ctx.replyWithPhoto({url: `https://zero-two-apis.com.br/api/pinterest?text=${ax}&apikey=${KEY_ZERO}&r=${randin}`}, {
parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id
});

await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '✅ Imagem enviada com sucesso.');
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
} catch (error) {
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '❌ Imagem não encontrada.');
}
})();
break;

case 'gpt':
if (ctx.state.args.length === 0) {
return ctx.reply('❗ Use: /gpt sua pergunta', {
reply_to_message_id: ctx.message.message_id
});
}

(async () => {
const pergunta = encodeURIComponent(ctx.state.args.join(' '));

const aguarde = await ctx.reply('⏳ Pensando..', {
reply_to_message_id: ctx.message.message_id});
const syn = encodeURIComponent(ctx.state.args.join(' '));

const openan = await fetchJson(`https://zero-two-apis.com.br/gemini/texto/imagem?query=${syn}&apikey=${KEY_ZERO}`);

try {

if (!openan.resposta) {
throw new Error("Resposta inválida da API.");
}

await ctx.reply(`🤖 resposta:\n-\n${openan.resposta}`, {
parse_mode: "Markdown",
reply_to_message_id: ctx.message.message_id});

await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '✅ Resposta enviada com sucesso.');
setTimeout(() => {
ctx.telegram.deleteMessage(ctx.chat.id, aguarde.message_id).catch(() => {});
}, 5000);
} catch (error) {
console.error(error);
await ctx.telegram.editMessageText(ctx.chat.id, aguarde.message_id, null, '❌ Ocorreu um erro ao buscar a resposta.');
}
})();
break;

default:
(async () => {
const resposta = await ctx.reply(`🤖 *${botName} diz:*\n\n❌ Opa! Esse comando não existe.

Use */menu* para ver todos os comandos disponíveis.`, {
parse_mode: 'Markdown',
reply_to_message_id: ctx.message.message_id});
})();
break;
}
});

//=========LIGA O BOT AQUI==========//
bot.launch().then(() => {
try {
console.log(banner2.string);
console.log(banner3.string);
} catch (err) {
console.log('TESSIA-BOT DEU ERRO.');
}
console.log('>>> TESSIA BOT INICIADA <<<');
}).catch(err => {
console.error('Erro ao iniciar o bot:', err);
});

//=======( ÁREA DAS ATUALIZAÇÕES )=======\\
fs.watchFile('./index.js', (curr, prev) => {
    if (curr.mtime.getTime() !== prev.mtime.getTime()) {
        console.log('A index foi editada, irei reiniciar..');
        process.exit();
    }
});

//=============(  )=============\\

