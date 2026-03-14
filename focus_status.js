const vscode = require("vscode");

function detectFocus(context) {
  /**
   *   Listens for an event if vscode lost/gained focus
   */
  let inactiveTimer = null;
  let idleTimer = null;
  const patienceTime = 10 * 1000; // time in milliseconds
  const idleTime = 15 * 1000;

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(testNotif, idleTime);
  }

  function startTimer() {
    clearTimer();
    inactiveTimer = setTimeout(windowsNotif, patienceTime); // should call windowsNotif after timer runs out
  }

  function windowsNotif() {
    console.log("Hey!!!!");
  }

  function testNotif() {
    if (vscode.window.activeTextEditor) {
      console.log("keyboard idle");
      idleTimer = setTimeout(testNotif, idleTime);
    }
  }

  function clearTimer() {
    if (inactiveTimer) {
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
  detectFocus(context);
}

module.exports = { activate, detectFocus };
