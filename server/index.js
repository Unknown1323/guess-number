require("dotenv").config();
const cors = require("cors");
const express = require("express");

const gameRoutes = require("./routes/gameRoutes");
const { bot } = require("./telegram-bot/index");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/", gameRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const shutdown = () => {
  bot.stopPolling();
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
