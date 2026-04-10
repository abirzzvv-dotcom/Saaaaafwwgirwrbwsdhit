require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const client = new Client({
  checkUpdate: false,
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`User ID: ${client.user.id}`);
});

// Auto-respond to DMs
client.on('messageCreate', async (message) => {
  // Ignore own messages
  if (message.author.id === client.user.id) return;

  // Log received messages
  console.log(`[${message.guild?.name || 'DM'}] ${message.author.tag}: ${message.content}`);

  // Example: Auto-respond to DMs
  if (message.channel.type === 'DM') {
    await message.reply('Hello! This is an auto-response from my selfbot.');
  }

  // Example: Respond to ping
  if (message.content.includes(`<@${client.user.id}>`)) {
    await message.react('👋');
  }
});

// Command handler example (prefix: !!)
client.on('messageCreate', async (message) => {
  if (message.author.id !== client.user.id) return;

  const prefix = '!!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'ping':
      const msg = await message.reply('Pinging...');
      const ping = msg.createdTimestamp - message.createdTimestamp;
      await msg.edit(`Pong! Latency: ${ping}ms | API: ${Math.round(client.ws.ping)}ms`);
      break;

    case 'purge':
      const amount = parseInt(args[0]);
      if (!amount || amount < 1 || amount > 100) {
        return message.reply('Please provide a number between 1 and 100');
      }

      const messages = await message.channel.messages.fetch({ limit: amount + 1 });
      const myMessages = messages.filter(m => m.author.id === client.user.id);

      for (const [, msg] of myMessages) {
        await msg.delete().catch(() => {});
      }
      break;

    case 'status':
      const status = args.join(' ');
      if (!status) {
        client.user.setActivity(null);
        return message.reply('Status cleared');
      }
      client.user.setActivity(status);
      await message.reply(`Status set to: ${status}`);
      break;

    case 'ghostping':
      if (!message.mentions.users.size) {
        return message.reply('Mention someone to ghost ping');
      }
      await message.delete();
      break;

    case 'help':
      const helpText = `
**Selfbot Commands:**
\`!!ping\` - Check latency
\`!!purge [amount]\` - Delete your last messages
\`!!status [text]\` - Set custom status
\`!!ghostping @user\` - Ping and delete
\`!!help\` - Show this help
      `;
      await message.reply(helpText);
      break;
  }
});

// Error handling
client.on('error', (error) => {
  console.error('Client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

// Login with token
const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('ERROR: DISCORD_TOKEN not found in environment variables');
  process.exit(1);
}

client.login(token);
