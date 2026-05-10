const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const app = express();
app.use(express.json());

const BOT_TOKEN = "8532558830:AAFM2LWWUc-91EwsaK4jKiIni3DwnRBlhCI";
const PARENT_CHAT_ID = "7931836122";

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// SMS receive karne ka endpoint
app.post("/sms", (req, res) => {
  const { sender, message, time } = req.body;

  const text = `
📱 *Naya SMS Aaya!*
👤 *From:* ${sender}
🕐 *Time:* ${time}
💬 *Message:* ${message}
  `;

  bot.sendMessage(PARENT_CHAT_ID, text, { parse_mode: "Markdown" });
  res.json({ status: "ok" });
});

// Server alive rakhne ke liye
app.get("/", (req, res) => {
  res.send("Bot chal raha hai! ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} pe chal raha hai`);
});
