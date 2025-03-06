require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL; // Ensure this is set in your .env

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(bodyParser.json());

// Webhook route
app.post('/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// Start Express server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);

    try {
        // Set the Telegram webhook
        const webhookSet = await bot.telegram.setWebhook(`${WEBHOOK_URL}/webhook`);
        if (webhookSet) {
            console.log(`✅ Webhook set to ${WEBHOOK_URL}/webhook`);
        } else {
            console.log("❌ Failed to set webhook");
        }
    } catch (error) {
        console.error("❌ Error setting webhook:", error);
    }
});

// Start bot in long polling mode (for local development)
bot.launch().then(() => {
    console.log("🤖 Bot is running!");
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
