# Discord Selfbot

A Discord selfbot built with `discord.js-selfbot-v13` and Node.js.

## ⚠️ WARNING

**Selfbots are against Discord's Terms of Service.** Using a selfbot can result in:
- Account termination
- IP bans
- Permanent blacklisting

**Use at your own risk.** This is provided for educational purposes only.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the environment file and add your token:
```bash
cp .env.example .env
```

3. Edit `.env` and add your Discord user token:
```
DISCORD_TOKEN=your_token_here
```

## Getting Your Token

1. Open Discord in browser
2. Open DevTools (F12)
3. Go to Application > Local Storage > discord.com
4. Find the `token` key and copy the value (remove the quotes)

**NEVER share your token with anyone!**

## Usage

Start the bot:
```bash
npm start
```

Or with auto-reload on changes:
```bash
npm run dev
```

## Commands (Prefix: `!!`)

| Command | Description |
|---------|-------------|
| `!!ping` | Check latency |
| `!!purge [amount]` | Delete your last messages (1-100) |
| `!!status [text]` | Set custom playing status |
| `!!ghostping @user` | Ping someone and delete message |
| `!!help` | Show help menu |

## Features

- Auto-respond to DMs
- React to mentions
- Custom status setting
- Bulk message deletion (purge)
- Low latency monitoring

## Customization

Edit `index.js` to add more commands or modify behavior. The bot uses the `discord.js-selfbot-v13` library which mimics the official Discord client.

## Troubleshooting

### "Captcha required" error
Discord is flagging your login. Try:
- Logging in via browser first
- Using a different network/VPN
- Waiting a few hours before retrying

### Token invalid
- Make sure you copied the token without quotes
- Tokens can expire if you change your password or enable 2FA
- Re-grab your token from browser DevTools

## License

This project is for educational purposes. I am not responsible for any consequences of using this software.
