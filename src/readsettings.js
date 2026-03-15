// readsettings.js
const vscode = require("vscode");

/**
 * Reads the Telegram ID from VS Code settings and returns it.
 * @returns {string | undefined} telegramId or undefined if not set
 */
function getTelegramId() {
  const config = vscode.workspace.getConfiguration("inactivityReminder");
  const telegramId = config.get("telegramId"); // reads setting
  return telegramId; // returns as a string
}

/**
 * Reads the notification interval (seconds) from VS Code settings.
 * Converts to milliseconds for timers.
 * Defaults to 5 minutes (300 seconds) if not set or invalid.
 * @returns {number} interval in milliseconds
 */
function getNotificationInterval() {
  const config = vscode.workspace.getConfiguration("inactivityReminder");
  const seconds = config.get < number > ("notificationInterval", 300); // default 5 minutes
  return Math.max(1, seconds) * 1000; // convert to milliseconds
}

module.exports = { getTelegramId, getNotificationInterval };

// Usage example (optional):
// const telegramId = getTelegramId();
// const intervalMs = getNotificationInterval();
