require("dotenv").config();
const connectDB = require("./src/database");
const bot = require("./src/bot");
const server = require("./src/server");

connectDB();
bot;
server;
