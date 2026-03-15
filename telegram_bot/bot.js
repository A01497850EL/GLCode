const { getTelegramId } = require("../src/readsettings");

const allowedId = getTelegramId();

async function sendTelegramMessage(telegramId, message) {
  const response = await fetch(
    "https://telegrammessager-production.up.railway.app/send-telegram/send-telegram",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_INTERNAL_API_KEY",
      },
      body: JSON.stringify({
        telegramId,
        message,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to send Telegram message");
  }

  return data;
}

module.exports = {
  sendTelegramMessage,
};