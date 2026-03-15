const vscode = require("vscode");
const { sendNotification, setupImage } = require("./notify2.js");
const { sendTelegramMessage } = require("../telegram_bot/bot.js");
const { getTelegramId, getNotificationInterval } = require("./readsettings.js");

function detectFocus(context) {
  let inactiveTimer = null;
  let idleTimer = null;
  let inactiveAnger = 0;
  let idleAnger = 0;

  const patienceTime = getNotificationInterval();
  const idleTime = getNotificationInterval();
  const teleBool = !!getTelegramId();

  function angerConv(anger) {
    if (anger === 1) return "low";
    if (anger === 2) return "medium";
    if (anger >= 3) return "high";
    return "low";
  }

  function resetIdleTimer() {
    idleAnger = 0;
    clearTimeout(idleTimer);
    console.log("idle timer reset");
    idleTimer = setTimeout(testNotif, idleTime);
  }

  function startTimer() {
    clearInactiveTimer();
    console.log(`starting focus timer for ${patienceTime}ms`);
    inactiveTimer = setTimeout(windowsNotif, patienceTime);
  }

  function windowsNotif() {
    inactiveAnger += 1;
    console.log(`windowsNotif fired, anger:${inactiveAnger}`);

    sendNotification(angerConv(inactiveAnger));

    inactiveTimer = setTimeout(windowsNotif, patienceTime);
  }

  function testNotif() {
    console.log("testNotif fired");

    if (vscode.window.activeTextEditor && vscode.window.state.focused) {
      idleAnger += 1;
      console.log(`keyboard idle, anger:${idleAnger}`);

      if (idleAnger <= 3) {
        sendNotification(angerConv(idleAnger));
      } else if (teleBool) {
        const message = sendNotification(angerConv(idleAnger));

        sendTelegramMessage(getTelegramId(), message)
          .then((result) => {
            console.log("Telegram success:", result);
          })
          .catch((err) => {
            console.error("Telegram failed:", err);
          });
      }

      idleTimer = setTimeout(testNotif, idleTime);
    } else {
      console.log("testNotif skipped: window not focused or no active editor");
    }
  }

  function clearInactiveTimer() {
    if (inactiveTimer) {
      clearTimeout(inactiveTimer);
      inactiveTimer = null;
    }
    inactiveAnger = 0;
  }

  const textListener = vscode.workspace.onDidChangeTextDocument(() => {
    resetIdleTimer();
  });

  const selectionListener = vscode.window.onDidChangeTextEditorSelection(() => {
    resetIdleTimer();
  });

  const activeEditorListener = vscode.window.onDidChangeActiveTextEditor(() => {
    resetIdleTimer();
  });

  const focusListener = vscode.window.onDidChangeWindowState((windowState) => {
    if (windowState.focused) {
      console.log("gained focus");
      clearInactiveTimer();
      resetIdleTimer();
    } else {
      console.log("lost focus");
      startTimer();
    }
  });

  console.log("detectFocus initialized");
  resetIdleTimer();

  context.subscriptions.push(
    focusListener,
    textListener,
    selectionListener,
    activeEditorListener,
  );
}

function activate(context) {
  console.log("extension activated");
  setupImage();
  detectFocus(context);
}

module.exports = { activate, detectFocus };
