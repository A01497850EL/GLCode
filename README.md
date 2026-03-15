# Badger Badger

_Welcome to Badger Badger!_

When you alt-tab away from VS Code, Badger Badger notices. If you stay away for too long, the system will send notifications that gradually intensify, nudging you to return to work before distractions take over.

Whether you want a gentle reminder or a more serious push, Badger Badger adapts to your preferred level of accountability.

## Download instructions

Download the .vsix extension in the releases tab.

**To integrate with VS Code:**

1. Install BurntToast via PowerShell Gallery

```powershell
Install-Module -Name BurntToast
```

2. Click the ⋯ menu in the top-right

3. Select Install from VSIX…

4. Choose the downloaded file

## Credits

Developers: Shubh, Taran, Enock, Grayson

Packages used: Telegram API (used for SMS notifications), BurntToast (used to send Windows Notifications through PowerShell)

# Connecting to the Telegram Notification Bot

Follow the steps below to enable notifications from the bot.

---

## Requirements

Before starting, make sure you have:

- A **Telegram account**
- The **Telegram app installed** on either:
  - Your **phone**
  - Your **computer**
- Installed the Badger VSCode extension

If you do not have Telegram installed, download it below:

[Telegram Signup Link](https://telegram.org/)

---

## Step 1 — Open the Bot

Open the bot using the link below:

[Telegram Bot](https://t.me/badger123_bot)

You can open this link in your browser or directly inside the Telegram app.

---

## Step 2 — Click **Start**

When the bot opens in Telegram:

1. Click the **Start** button.

This registers your account with the bot.

---

## Step 3 — Send a Message to the Bot

Before the bot can send you notifications, **you must send at least one message to the bot**.

For example, send:

```
hello
```

or

```
/start
```

Telegram bots **cannot send messages to users until the user has interacted with the bot first**.

---

## Step 4 — Get Your Telegram ID (Inside Telegram)

You can obtain your **Telegram ID** directly inside Telegram using a helper bot.

1. Open Telegram.
2. In the search bar, search for: `userinfobot`
3. Open the bot and click **Start**.
4. The bot will immediately reply with your **ID**.

Example:

```
Id: 123456789
First: YourName
Username: yourusername
```

Copy the number shown next to **Id**.
This number is your **Telegram ID**.

---

## Step 5 — Enter Your Telegram ID Into VSCode

1. Launch VSCode.
2. Navigate to the settings menu.
3. Under `Extensions` > `Badger Extension`, find the field labeled `Telegram ID`.
4. Paste your **Telegram ID** into the field.
5. Save the settings.

---

## Step 6 — Setup Complete

Once you have:

- Clicked **Start** on the telegram bot
- Sent **at least one message to the telegram bot**
- Entered your **Telegram ID into VSCode Settings**

The bot will now be able to send you notifications.

---

# Troubleshooting

### The bot does not send messages

Make sure you have done all of the following:

- Clicked **Start**
- Sent **at least one message**
- Entered the correct **Telegram ID**

### The link opens in a browser but nothing happens

Make sure the **Telegram app is installed** and allowed to open Telegram links.

---

# Telegram Bot Link

[Badger Bot](https://t.me/badger123_bot)
