const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Replace 'YOUR_BOT_TOKEN' with your actual bot token from BotFather
const token = process.env.BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello! I am your Telegram bot. How can I help you?');
});

// Handle /help command
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 
        'Available commands:\n' +
        '/start - Start the bot\n' +
        '/help - Show this help message'
    );
});

// Handle regular messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    
    // Ignore commands
    if (msg.text && !msg.text.startsWith('/')) {
        bot.sendMessage(chatId, `You said: ${msg.text}`);
    }
});

// Error handling
bot.on('polling_error', (error) => {
    console.error(error);
});

console.log('Bot is running...'); 