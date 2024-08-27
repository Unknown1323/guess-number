const express = require("express");
const router = express.Router();
const { startGame, guessNumber } = require("../controllers/gameController");

router.post("/start_game", startGame);
router.post("/guess", guessNumber);

module.exports = router;
