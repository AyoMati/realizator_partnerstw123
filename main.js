const { Client } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();
const PORT = 8080;

// Konfiguracja klienta Discord
const client = new Client({
  checkUpdate: false,
});

// Serwer HTTP do utrzymania aktywności na Render (dla darmowego tieru)
app.get('/', (req, res) => {
  res.send('Self-bot działa na Render! 🚀');
});

app.listen(PORT, () => {
  console.log(`Serwer pingujący działa na porcie ${PORT}`);
});



// Obsługa zdarzeń Discorda
client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);
  // Wysyłanie wiadomości co 6 minut
  const channelId_partnerstwa = '1346609247869337701';
  const serverId = '1175916293816332318';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_partnerstwa);
    if (channel) {
      await channel.send(partnershipAd);
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_partnerstwa}`);
    }
  }, 6 * 60 * 1000); // 6 minut w milisekundach



  const channelId_shops = '1346609275761332325';
  const channelId_global = '1252285992396918835';
  const zimoweall = '1252286465635782657';
  const zimowethematic = '1252289621274923152';
  const zimoweeconomy = '1346609280291442708';
  const zimowe6h = '1252301768394543207';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_shops);
    const channel_global = client.channels.cache.get(channelId_global);
    const zimoweall1 = client.channels.cache.get(zimoweall);
    const zimowethematic1 = client.channels.cache.get(zimowethematic);
    const zimowetech1 = client.channels.cache.get(zimoweeconomy);
    const zimowe6h1 = client.channels.cache.get(zimowe6h);
    if (channel) {
      await channel.send(serverAd);
      await channel_global.send(serverAd);
      await zimoweall1.send(serverAd);
      await zimowethematic1.send(serverAd);
      await zimowetech1.send(serverAd);
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_programming}`);
    }
  }, 11 * 60 * 1000); // 11 minut w milisekundach
});

// Obsługa błędów
client.on('error', (error) => {
  console.error('Błąd Discorda:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Nieobsłużony błąd:', error);
});

// Reklamy
const partnershipAd = '# PV PO PARTNERSTWO';
// Reklama serwera
const serverAd = `
# 🚀 Flexify - Twój sklep Discord!
> szybko, tanio i wygodnie. Zobacz, co dla Ciebie mamy!

# Dlaczego Flexify?

### ⭐ ・Szeroki wybór – Nitro, gry, doładowania i więcej!
### ⭐ ・Błyskawiczna obsługa – Zamówienia realizujemy szybko i sprawnie!
### ⭐ ・Niskie ceny – Tylko najlepsze oferty na rynku!
# Co znajdziesz w Flexify?

>  🛒 ・Nitro Boosty oraz Basic
>  🛒 ・Personalizacja kont i dekoracje
>  🛒 ・Doładowania do gier (Fortnite, Roblox, Brawl Stars...)
>  🛒 ・Social Boosting – Zwiększ swoje zasięgi!
>  🛒 ・Gry – Minecraft, GTA i inne hity!
>  🛒 ・ Wymiany – Prosto i bezpiecznie!
# Dlaczego warto?

🔹・Konkursy i eventy – Czekają na Ciebie nagrody!
🔹・PartnerAI – Automatyczne partnerstwa na Discordzie!
🔹・Szybka pomoc – Zawsze gotowi, by Ci pomóc!
# Czas to pieniądz!
Z nami oszczędzisz czas i pieniądze. Zaufaj Flexify!

# 💸 0,60 zł za każde partnerstwo!


Dołącz do nas teraz i sprawdź, co Flexify ma dla Ciebie!
discord.gg/Flexify
`;

// Logowanie do Discorda
client.login(process.env.DISCORD_TOKEN);
