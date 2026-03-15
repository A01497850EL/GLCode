// const { getTelegramId } = require("../src/readsettings");

// const allowedId = 8603235738; //getTelegramId();

async function sendTelegramMessage(telegramId, message) {
  const response = await fetch(
    "https://telegrammessager-production.up.railway.app/send-telegram",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer b44e4b154d1b3608ba0098f1a6ca56287f9b2daba8f25fa7f72c63f020a4fcbc",
      },
      body: JSON.stringify({
        telegramId,
        message,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to send Telegram message");
  }

  return data;
}

//test
// sendTelegramMessage(allowedId, "yerr")

module.exports = {
  sendTelegramMessage,
};
