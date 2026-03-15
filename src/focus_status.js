const vscode = require("vscode");
const { sendNotification, setupImage } = require("./notify2.js");
const { sendTelegramMessage } = require("../telegram_bot/bot.js");
const { getTelegramId, getNotificationInterval } = require("./readsettings.js");

function detectFocus(context) {
  /**
   *   Listens for an event if vscode lost/gained focus
   */
  let inactiveTimer = null;
  let idleTimer = null;
  let inactiveAnger = 0;
  let idleAnger = 0;
  let teleBool = false;
  const patienceTime = getNotificationInterval(); // time in milliseconds
  const idleTime = getNotificationInterval();

  if (getTelegramId) {
    teleBool = true;
  }

  function angerConv(anger) {
    if (anger === 1) {
      return "low";
    } else if (anger === 2) {
      return "medium";
    } else if (anger >= 3) {
      return "high";
    }
  }

  //
  // This fuction is for keyboard
  function resetIdleTimer() {
    idleAnger = 0;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(testNotif, idleTime);
  }
  //This function is for focus
  function startTimer() {
    clearTimer();
    inactiveTimer = setTimeout(windowsNotif, patienceTime); // should call windowsNotif after timer runs out
  }
  //Window Notification 1
  function windowsNotif() {
    inactiveAnger += 1;
    sendNotification(getTelegramId(), angerConv(inactiveAnger));
    console.log(`focus idle, anger:${inactiveAnger}`);

    inactiveTimer = setTimeout(windowsNotif, patienceTime);
  }
  //Test Notification
  function testNotif() {
    if (vscode.window.activeTextEditor && vscode.window.state.focused) {
      idleAnger += 1;
      if (idleAnger <= 3) {
        sendNotification(angerConv(idleAnger));
        console.log(`keyboard idle, anger:${idleAnger}`);
      } else if (idleAnger > 3 && teleBool) {
        sendTelegramMessage(
          getTelegramId(),
          sendNotification(angerConv(idleAnger)),
        );
        console.log(`keyboard idle, anger:${idleAnger}`);
      }
      idleTimer = setTimeout(testNotif, idleTime);
    }
  }

  function clearTimer() {
    if (inactiveTimer) {
      inactiveAnger = 0;
      clearTimeout(inactiveTimer);
      inactiveTimer = null;
    }
  }

  const testListener = vscode.workspace.onDidChangeTextDocument(resetIdleTimer);

  const focusListener = vscode.window.onDidChangeWindowState((windowState) => {
    if (windowState.focused) {
      // vscode gained focus
      console.log("gained focus");
      clearTimer();
      resetIdleTimer();
    } else {
      // vscode lost focus
      startTimer();
      console.log("lost focus");
    }
  });

  resetIdleTimer(); //initiate timer on startup

  context.subscriptions.push(focusListener, testListener);
}

function activate(context) {
  console.log("attempting setupimage");
  setupImage();
  console.log("attemping detectfocus");
  detectFocus(context);
}

module.exports = { activate, detectFocus };
