function detectFocus() {
  /**
   *   Listens for an event if vscode lost/gained focus
   */
  inactiveTimer = null;
  patienceTime = 60 * 1000; // time in milliseconds

  function startTimer(patienceTime) {
    clearTimer();
    inactiveTimer = setTimeout(windowsNotif, patienceTime); // should call windowsNotif after timer runs out
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
      clearTimer();
    } else {
      // vscode lost focus
      startTimer();
    }
  });

  context.subscriptions.push(focusListener);
}
