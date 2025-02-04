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
const partnershipAd = '# JEZELI CHCESZ PARTNERSTWO TO PISZ PV!'
// Reklama serwera
const serverAd = `
## Taniej!
> Twój **ULUBIONY** sklep na discordzie.
> Wiesz **dlaczego?**
## OFERUJEMY:
🤝 ╎ Profesjonalne podejście do klienta, dzięki nam, dogodzimy ci i znajdziemy odpowiednie produkty, aby zadowolić ciebie, i zbytnio nie naruszać twojego budżetu!

💵 ╎Wiesz skąd wzięła się nazwa? Nie bez powodu nazywamy się **TANIEJ**
- **Najtańsze ceny** w stosunku do rynku - to, to czego poszukiwałeś!

🤖╎Profesjonalne systemy w naszych botach, które umożliwiają na szerokiego zakresu udogodnienia. **Już nie musisz** szukać kanału ticket, możesz to zrobic z poziomu **cennika** __Oferujemy też bota, dodawanego do konta z ciekawymi opcjami! Sprawdź <#1334663153983815680> __

🤑╎ Nie uwierze ci, że nigdy nie chciałeś sobie dorobić łatwych pieniędzy - **PŁACIMY REALIZATOROM PARTNERSTW __0.60PLN__ ZA JEDNO PARTNERSTWO**

🟣╎ **N!tro?**, może **boosty?**, albo może macie jakieś **konta streamingowe?** A **chatgpt?** hmm... A co powiecie na **wymiane pieniędzy?** **__TAK!__ MAMY TO WSZYSTKO!**

🦔╎**Zaufanie**, to nasza druga nazwa serwera, bo jesteśmy najbardziej **zaufanym** sklepem, na którym bez obaw - nie musisz sie bać o utracenie swoich środków **dołożymy wszelkich starań aby bylo __bezpiecznie i prosto__**

## SPRAWDZ I SIE PRZEKONAJ 

discord.gg/taniej
# Poszukujemy realizatorów partnerstw - płacimy 0,60PLN z możliwymi bonusami
`;

// Lista użytkowników partnerstwa i ich czas ostatniego partnerstwa
const partneringUsers = new Map();
const partnershipTimestamps = new Map();
const channel_1 = '1252280791946235915';
const planeta = '1242810199987716158';
const adzone = '1210910952476905522';
const miasto = '1332399570872832151';
const blyskawiczne = '1001579382827143298';
const hyperAds = '1286351421691793466';

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy.`);
  // Wysyłanie wiadomości co 6 minut
  const channelId_partnerstwa = '1252280791946235915';
  const serverId = '1175916293816332318';
  setInterval(async () => {
    const channel = client.channels.cache.get(channelId_partnerstwa);
    if (channel) {
      await channel.send(partnershipAd);
    
    } else {
      console.error(`Nie znaleziono kanału o ID ${channelId_partnerstwa}`);
    }
  }, 6 * 60 * 1000); // 6 minut w milisekundach

  // reklamowanie serwera
  const channelId_programming = '1252290252328927353';
  //adzone
  setInterval(async () => {
    
    const channel1 = client.channels.cache.get(adzone);
    
    if (channel1) {
      await channel1.send(partnershipAd);
    }
  }, 241 * 60 * 1000); //koniec

  //blyskawiczne
  setInterval(async () => {
    const channel2 = client.channels.cache.get(blyskawiczne);
    if (channel2) {
      await channel2.send(partnershipAd);
    }
  }, 121 * 60 * 1000); //koniec

  //planeta
  setInterval(async () => {
    const channel3 = client.channels.cache.get(planeta);
    if (channel3) {
      await channel3.send(partnershipAd);
    }
  }, 31 * 60 * 1000); //koniec

  //miasto
  setInterval(async () => {
    const channel4 = client.channels.cache.get(miasto);
    if (channel4) {
      await channel4.send(partnershipAd);
    }
  }, 121 * 60 * 1000); //koniec

  //hyperAds
  setInterval(async () => {
    const channel5 = client.channels.cache.get(hyperAds);
    if (channel5) {
      await channel5.send(partnershipAd);
    }
  }, 60 * 60 * 1000); //koniec
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
        // Dodajemy pytanie o dołączenie na serwer
        await message.channel.send("Czy wymagane jest dołączenie na twój serwer?");
        const filter = m => m.author.id === message.author.id;
        const reply = await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] }).catch(() => null);

        if (reply && !reply.first().content.toLowerCase().includes('nie')) {
          await message.channel.send("Jako bot nie mogę automatycznie dołączyć na serwer, ale jeśli masz 100 osób na serwerze to mój właściciel @ayomati1 niedługo na pewno to zrobi");
          const notificationUser = await client.users.fetch('1238567838948659264');
          await notificationUser.send(`Wymagane dołączenie na serwer:\n${userAd}`);
        }
        const guild = client.guilds.cache.get('1327335941299241044');
        if (!guild) {
          await message.channel.send("❕ Nie znaleziono serwera.");
          return;
        }

        const member = await guild.members.fetch(message.author.id).catch(() => null);
        if (!member) {
          await message.channel.send("❕ Dołącz na serwer, aby kontynuować!");
          return;
        }

        const channel = guild.channels.cache.get('1329229884048019520');
        if (!channel) {
          await message.channel.send("Nie znaleziono kanału o ID '1329229884048019520'.");
          return;
        }

        const displayName = member ? member.displayName : message.author.username;
        await channel.send(`${userAd}\n\nPartnerstwo z: ${member}`);
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
    const channel = guild.channels.cache.get('1329229884048019520');
    if (channel) {
      const displayName = member ? member.displayName : message.author.username;
      await channel.send(`${userAd}\n\nPartnerstwo z: ${member}`);
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
