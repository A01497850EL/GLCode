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

module.exports = { getTelegramId };

// reading the getTelegramId
//const { getTelegramId } = require('./readsetting');

//const telegramId = getTelegramId();
//console.log("Telegram ID:", telegramId);

// passing the function
//tarans_function(telegramId);
