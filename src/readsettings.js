const vscode = require("vscode");

/**
 * Reads the Telegram ID from VS Code settings
 * @returns {string | undefined}
 */
function getTelegramId() {
  const config = vscode.workspace.getConfiguration("inactivityReminder");
  const telegramId = config.get("telegramId");
  return telegramId;
}

/**
 * Reads notification interval (seconds) from settings
 * Default: 300 seconds (5 minutes)
 * Returns milliseconds for timers
 * @returns {number}
 */
function getNotificationInterval() {
  const config = vscode.workspace.getConfiguration("inactivityReminder");

  let seconds = config.get("notificationInterval");

  if (!seconds || typeof seconds !== "number") {
    seconds = 300; // default 5 minutes
  }

  return Math.max(10, seconds) * 1000;
}

module.exports = {
  getTelegramId,
  getNotificationInterval,
};
