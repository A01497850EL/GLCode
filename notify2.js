const { exec } = require("child_process");
const path = require("path");

// CORE FUNCTION
const INTENSITY = {
  low: {
    // logo: defaultlogo.png,
    sound: "Default",
    messages: [
      "Taking a little break, are we?",
      "No rush. The deadline can wait. (It can't.)",
      "A badger never loses focus. Take notes.",
      "Just a gentle reminder that your coding project exist.",
      " I hope that's reference material for your VSCode project you're looking at over there!",
      "You were so close to finishing that function. Probably.",
      "Your code misses you. Probably.",
      "This badger noticed you left. This badger is disappointed.",
      " Here's a quick reminder about your current VSCode project! Don't forget about me!",
    ],
  },

  medium: {
    // logo: mediumlogo.png,
    sound: "IM",
    messages: [
      "You've been gone a while now. Everything okay?",
      "The code is still broken. Just so you know.",
      "You have been badgered once. You will be badgered again.",
      "This is not a warning. This is a badgering.",
      "That tab you switched to isn't going to ship your project.",
      "The compiler is waiting. Patiently. Unlike me.",
      "Fun fact: the bug you're avoiding is getting worse.",
      "You are being badgered because you have earned it.",
      "This is your second reminder. There will be more. Can't wait :D!",
    ],
  },

  high: {
    // logo: angrylogo.png,
    sound: "Alarm2",
    messages: [
      "We know you alt-tabbed. We always know.",
      "Avoiding your work is an interesting life choice. Very brave.",
      "Your git history is embarrassing and you know it.",
      "The deadline is only getting shorter...",
      "I'm on the case of the missing developper. Any idea where they went?",
      "You have been found guilty of alt-tabbery.",
      "The badger is no longer asking nicely.",
      "STOP BEING BADGERED AND START BEING A BADGER.",
    ],
  },
};

const MODULE_PATH = path.join(__dirname, "lib", "BurntToast");
const IMAGE_PATH = path.join(__dirname, "assets", "logo.png");

function sendNotification(intensity) {
  const level = INTENSITY[intensity];
  if (!level) {
    console.error(`Invalid intensity level: ${intensity}`);
    return;
  }

  const message =
    level.messages[Math.floor(Math.random() * level.messages.length)];
  const sound = level.sound;

  const command = [
    `powershell -ExecutionPolicy Bypass -Command "`,
    `Import-Module '${MODULE_PATH}';`,
    `New-BurntToastNotification`,
    `-Text 'BadgerBadger', '${message}'`,
    `-AppLogo '${IMAGE_PATH}'`,
    `-Sound '${sound}'`,
    `"`,
  ].join(" ");

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error("BadgerBadger notification failed:", stderr);
    } else {
      console.log(`Notification sent: "${message}"`);
    }
  });
}

module.exports = {
  INTENSITY,
  sendNotification,
};

//testcall example: sendNotification('high');
