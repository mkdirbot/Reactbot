const mongoose = require("mongoose");

const raffleSchema = new mongoose.Schema({
  chatId: String,
  messageId: String,
  participants: [{ userId: String, username: String }],
  createdAt: { type: Date, default: Date.now },
});

const Raffle = mongoose.model("Raffle", raffleSchema);

module.exports = Raffle;
