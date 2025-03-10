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

  const serverAdChannels = [
    '1346609266987110451', '1346609268375158834', '1346609275761332325', '1346609280291442708', '1346609283932094529'
  ];
  const partnershipAdChannel = '1346609247869337701';

  // Funkcja wysyłania reklam serwerowych z opóźnieniem między kanałami
  const sendServerAd = async () => {
    console.log(`Rozpoczynam wysyłanie serverAd: ${new Date().toISOString()}`);
    for (const channelId of serverAdChannels) {
      try {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          await channel.send(serverAd);
          console.log(`Wysłano reklamę na kanale: ${channelId}`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Opóźnienie między wysyłkami
        } else {
          console.error(`Nie znaleziono kanału o ID ${channelId}`);
        }
      } catch (err) {
        console.error(`Błąd wysyłania wiadomości na kanale ${channelId}:`, err);
      }
    }
  };

  // Funkcja wysyłania reklam partnerstwa
  const sendPartnershipAd = async () => {
    console.log(`Rozpoczynam wysyłanie partnershipAd: ${new Date().toISOString()}`);
    const channel = client.channels.cache.get(partnershipAdChannel);
    if (channel) {
      try {
        await channel.send(partnershipAd);
        console.log(`Wysłano partnershipAd na kanale: ${partnershipAdChannel}`);
      } catch (err) {
        console.error(`Błąd wysyłania partnershipAd:`, err);
      }
    } else {
      console.error(`Nie znaleziono kanału o ID ${partnershipAdChannel}`);
    }
  };

  // Harmonogram wysyłania reklam
  setInterval(sendServerAd, 11 * 60 * 1000); // 11 minut w milisekundach
  setInterval(sendPartnershipAd, 6 * 60 * 1000); // 6 minut w milisekundach
});

// Obsługa limitów API Discorda
client.on('rateLimit', (info) => {
  console.warn('Discord API rate limit:', info);
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
