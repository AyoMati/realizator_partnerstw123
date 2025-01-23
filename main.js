const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Self-bot działa!");
});

app.listen(PORT, () => {
  console.log(`Serwer pingujący działa na porcie ${PORT}`);
});
client.on("ready", () => {
  console.log("Self-bot działa na Render!");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "!ping") {
    message.reply("Pong z Render! 🚀");
  }
});

client.login(process.env.DISCORD_TOKEN);
