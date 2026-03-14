const vscode = require("vscode");

function detectFocus(context) {
  /**
   *   Listens for an event if vscode lost/gained focus
   */
  let inactiveTimer = null;
  const patienceTime = 10 * 1000; // time in milliseconds

  function startTimer() {
    clearTimer();
    inactiveTimer = setTimeout(windowsNotif, patienceTime); // should call windowsNotif after timer runs out
  }

  function windowsNotif() {
    console.log("Hey!!!!");
  }

  function clearTimer() {
    if (inactiveTimer) {
      clearTimeout(inactiveTimer);
      inactiveTimer = null;
    }
  }

  const focusListener = vscode.window.onDidChangeWindowState((windowState) => {
    if (windowState.focused) {
      // vscode gained focus
      console.log("gained focus");
      clearTimer();
    } else {
      // vscode lost focus
      startTimer();
      console.log("lost focus");
    }
  });

  context.subscriptions.push(focusListener);
}

function activate(context) {
  detectFocus(context);
}

module.exports = { activate, detectFocus };
