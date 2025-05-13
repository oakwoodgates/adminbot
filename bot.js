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

// Add command to launch the Mini App
bot.onText(/\/webapp/, (msg) => {
    const chatId = msg.chat.id;
    
    // Create an inline keyboard with a Web App button
    const keyboard = {
        inline_keyboard: [[
            {
                text: "Open Mini App",
                web_app: {url: "YOUR_MINI_APP_URL"} // Replace with your deployed Mini App URL
            }
        ]]
    };
    
    bot.sendMessage(chatId, "Click below to open our Mini App:", {
        reply_markup: keyboard
    });
});

// Add handler for Mini App data
bot.on('web_app_data', (msg) => {
    const chatId = msg.chat.id;
    const data = msg.web_app_data.data;
    
    // Handle data received from Mini App
    bot.sendMessage(chatId, `Received data from Mini App: ${data}`);
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