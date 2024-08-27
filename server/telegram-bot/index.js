const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const webAppUrl = "https://charming-baklava-f0c3db.netlify.app/";
  if (text == "/start") {
    await bot.sendMessage(
      chatId,
      "Ласкаво просимо! Натисніть кнопку нижче, щоб пограти в гру.",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Грати в «Вгадай число».", web_app: { url: webAppUrl } }],
          ],
        },
      }
    );
  }
});

module.exports = { bot };
