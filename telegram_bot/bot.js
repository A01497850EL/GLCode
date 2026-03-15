const { Telegraf } = require("telegraf");

const BOT_TOKEN = "8764943029:AAEAMghjeF3AUK8f3HSFYdQ4sI6-17IKBp0";
const TELEGRAM_ID = 8603235738;

const bot = new Telegraf(BOT_TOKEN);
const allowedId = Number(TELEGRAM_ID);

async function sendTelegramMessage(text) {
  return bot.telegram.sendMessage(allowedId, text);
}

function startEchoBot() {
  bot.on("text", async (ctx) => {
    if (ctx.chat.id !== allowedId) {
      return;
    }

    await ctx.reply(ctx.message.text);
  });

  return bot.launch();
}

// return bot.telegram.sendMessage(allowedId, "hello")

module.exports = {
  sendTelegramMessage,
  startEchoBot,
};
