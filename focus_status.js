const vscode = require("vscode");

function detectFocus(context) {
  /**
   *   Listens for an event if vscode lost/gained focus
   */
  let inactiveTimer = null;
  let inactiveTimer_2 = null;
  let idleTimer = null;
  const patienceTime = 10 * 1000; // time in milliseconds
  const idleTime = 15 * 1000;
  // 
  // This fuction is for keyboard
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(testNotif, idleTime);
  }
  //This function is for focus
  function startTimer() {
    clearTimer();
    inactiveTimer = setTimeout(windowsNotif, patienceTime); // should call windowsNotif after timer runs out
    inactiveTimer_2 = setTimeout(windowsNotif_2, patienceTime*2 );
  }
  //Window Notification 1
  function windowsNotif() {
    console.log("Hey!!!!");
  }
  //Test Notification
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
