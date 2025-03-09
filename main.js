const { Client, Intents } = require('discord.js-selfbot-v13');
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
  console.log(`Zalogowano jako ${client.user.tag}!`);

  // Dodaj poniższy kod do obsługi wysyłania reklam
  const serverAdChannels = [
    '1346609266987110451', '1346609268375158834', '1346609275761332325', '1346609280291442708', '1346609283932094529'
  ];
  const partnershipAdChannel = '1346609247869337701';

  // Wysyłanie serverAd co 11 minut
  setInterval(async () => {
    for (const channelId of serverAdChannels) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        await channel.send(serverAd);
      } else {
        console.error(`Nie znaleziono kanału o ID ${channelId}`);
      }
    }
  }, 11 * 60 * 1000); // 11 minut w milisekundach

  // Wysyłanie partnershipAd co 6 minut
  setInterval(async () => {
    const channel = client.channels.cache.get(partnershipAdChannel);
    if (channel) {
      await channel.send(partnershipAd);
    } else {
      console.error(`Nie znaleziono kanału o ID ${partnershipAdChannel}`);
    }
  }, 6 * 60 * 1000); // 6 minut w milisekundach
});

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
>  🛒 ・Gry – Minecraft,
