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
});

// Reklama serwera
const serverAd = `
## 🛒 Kupuj.
> 🚀 Najszybciej rozwijający się sklep na Discord.
> Nie jest tak bez powodu.

**Przedstawiamy:**
💎  **__KUPUJ__** - Centrum dla twoich zakupów.
🤝 Nigdy nie było wygodniej, szybciej i taniej niż teraz.

💡 **System, pozwalający odnaleźć twój wymarzony produkt w sekundy.**
- 💫 Nie musisz wiedzieć, co chcesz zakupić. Zainspiruj się nami.

⭐ **Zebraliśmy najbardziej doświadczonych sprzedawców - razem na jeden serwer.**
- Odpowiemy na wszystkie twoje pytania praktycznie NATYCHMIASTOWO.

✅ **Część naszego asortymentu:**
- 🛒 N1tro BOOST oraz BASIC - wysyłane prezentem na twoje konto!
-# W NAJNIŻSZEJ cenie jaką znajdziesz.
- 🛒 Dekoracje, logo, konta... - do WIELU platform.
-# Wyglądaj jak profesjonalista!
- 🛒 Doładowania do gier (fortnite, roblox, brawl stars itd...)
-# Mamy też Social Boosting - czyli np. obserwacje do instagram, tiktok...
- 🛒 Najpopularniejsze GRY!
-# Minecraft, GTA... ChatGPT? Jednak mamy ZDECYDOWANIE więcej niż gierki.
- 🛒 Wymiany? Również mamy. I to z jakimi niskimi prowizjami!
-# Wymieniać dalej? Sam dołącz i sprawdź.

> 💪 **Mnóstwo darmowych konkursów, eventów...**
~Jesteśmy zaufanym sklepem któremu zaufała **ogromna ilość** klientów, oferujemy zdecydowanie więcej.

> 🌎 **Coś dla twojego serwera...**
- Kojarzysz **PartnerAI**? Taka tam rewolucja w partnerstwach, tzw. **Automatyczny Realizator Partnerstw.**
-# Szczegóły poznasz na serwerze.

> 💡 **Tak, mamy najniższe możliwie ceny, ale nie tylko to się liczy.**
Czas to pieniądz. Oszczędzimy Ci go. 
Mamy zgrany zespół, pozwól nam polepszyć twoje doznania w świecie Discorda - jak i poza nim.
-# 💸 Płacimy 0,60zł za partnerstwo!

# ❗ TRWA KONKURS NA __500PLN__ KTÓRY KOŃCZY SIĘ: <t:1738339200:R>

**Dołącz i sprawdź.**
discord.gg/kupuj
`;

// Lista użytkowników partnerstwa i ich czas ostatniego partnerstwa
const partneringUsers = new Map();
const partnershipTimestamps = new Map();
const channel_1 = '1252280791946235915';
const channel_2 = '1242810199987716158';
const channel_3 = '1210910952476905522';
const channel_4 = '1332399570872832151';
const channel_5 = '1001579382827143298';

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);
  // Wysyłanie wiadomości co 6 minut
  const channelId_partnerstwa = '1252280791946235915';
  const serverId = '1175916293816332318';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_partnerstwa);
    if (channel) {
      await channel.send('# PARTNERSTWA PV');
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_partnerstwa}`);
    }
  }, 6 * 60 * 1000); // 6 minut w milisekundach

  // reklamowanie serwera
  const channelId_programming = '1252290252328927353';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_programming, channel_1, channel_2, channel_3, channel_4, channel_5);
    if (channel) {
      await channel.send(serverAd);
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_programming}`);
    }
  }, 11 * 60 * 1000); // 11 minut w milisekundach
});

client.on('messageCreate', async (message) => {
  // Sprawdzenie, czy wiadomość pochodzi od innego użytkownika
  if (!message.guild && !message.author.bot && message.author.id !== client.user.id) {
    const now = Date.now();
    const lastPartnership = partnershipTimestamps.get(message.author.id);

    if (lastPartnership && now - lastPartnership < 7 * 24 * 60 * 60 * 1000) {
      // Jeśli użytkownik chce nawiązać partnerstwo wcześniej niż tydzień, wyślij wiadomość
      await message.channel.send("⏳ Musisz jeszcze poczekać, zanim będziesz mógł nawiązać kolejne partnerstwo. Spróbuj ponownie za tydzień.");
      return;
    }

    if (!partneringUsers.has(message.author.id)) {
      partneringUsers.set(message.author.id, null);
      await message.channel.send("🌎 Jeśli chcesz nawiązać partnerstwo, wyślij swoją reklamę (maksymalnie 1 serwer).");
    } else {
      const userAd = partneringUsers.get(message.author.id);

      if (userAd === null) {
        partneringUsers.set(message.author.id, message.content);
        await message.channel.send(`✅ Wstaw naszą reklamę:\n${serverAd}`);
        await message.channel.send("⏰ Daj znać, gdy wstawisz reklamę!");
      } else if (message.content.toLowerCase().includes('wstawi') || message.content.toLowerCase().includes('już') || message.content.toLowerCase().includes('gotowe') || message.content.toLowerCase().includes('juz')) {
        const guild = client.guilds.cache.get('1289583756620988518');
        if (!guild) {
          await message.channel.send("❕ Nie znaleziono serwera.");
          return;
        }

        const member = await guild.members.fetch(message.author.id).catch(() => null);
        if (!member) {
          await message.channel.send("❕ Dołącz na serwer, aby kontynuować!");
          return;
        }

        const channel = guild.channels.cache.find(ch => ch.name === '〔🌎〕・partnerstwa' && ch.isText());
        if (!channel) {
          await message.channel.send("Nie znaleziono kanału '〔🌎〕・partnerstwa'.");
          return;
        }

        await channel.send(userAd);
        await message.channel.send("✅ Dziękujemy za partnerstwo! W razie jakichkolwiek pytań prosimy o kontakt z użytkownikiem .b_r_tech. (bRtech)");

        // Zaktualizuj czas ostatniego partnerstwa
        partnershipTimestamps.set(message.author.id, now);
        partneringUsers.delete(message.author.id);
      }
    }
  }
});

// Obsługa zdarzeń, kiedy użytkownik dołącza na serwer
client.on('guildMemberAdd', async (member) => {
  // Sprawdź, czy użytkownik znajduje się w mapie partneringUsers
  if (partneringUsers.has(member.id)) {
    // Wyślij wiadomość powitalną lub dalsze instrukcje do użytkownika
    const userAd = partneringUsers.get(member.id);
    const channel = member.guild.channels.cache.find(ch => ch.name === '💼・partnerstwa' && ch.isText());
    if (channel) {
      await channel.send(userAd);
      const dmChannel = await member.createDM();
      await dmChannel.send("✅ Dziękujemy za dołączenie! Twoja reklama została wstawiona.");
      // Usuń użytkownika z mapy partneringUsers
      partneringUsers.delete(member.id);
      // Zaktualizuj czas ostatniego partnerstwa
      const now = Date.now();
      partnershipTimestamps.set(member.id, now);
    } else {
      console.error("Nie znaleziono kanału '💼・partnerstwa'.");
    }
  }
});

// Obsługa błędów
client.on('error', (error) => {
  console.error('Błąd Discorda:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Nieobsłużony błąd:', error);
});

// Logowanie do Discorda
client.login(process.env.DISCORD_TOKEN);
