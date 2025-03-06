const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Raffle = require("./models");

dotenv.config();
const app = express();
app.use(cors());

app.get("/raffle/:id", async (req, res) => {
  const raffle = await Raffle.findById(req.params.id);
  if (!raffle) {
    return res.status(404).send("Raffle not found");
  }
  res.json({ participants: raffle.participants });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
