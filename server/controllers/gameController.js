let secretNumber = null;

const generateSecretNumber = () => Math.floor(Math.random() * 100) + 1;

const startGame = (req, res) => {
  try {
    secretNumber = generateSecretNumber();
    res
      .status(200)
      .json({ status: "success", message: "Гру розпочато! Введіть число." });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Щось пішло не так. Спробуйте пізніше.",
    });
  }
};

const guessNumber = (req, res) => {
  try {
    const { guess } = req.body;

    if (secretNumber === null) {
      return res
        .status(400)
        .json({ status: "error", message: "Гра ще не розпочалася." });
    }

    if (guess > secretNumber) {
      return res
        .status(200)
        .json({ status: "continue", message: "Загадане число менше." });
    }

    if (guess < secretNumber) {
      return res
        .status(200)
        .json({ status: "continue", message: "Загадане число більше." });
    }

    res
      .status(200)
      .json({ status: "win", message: `Число вгадано! ${secretNumber}` });
    secretNumber = null;
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Щось пішло не так. Спробуйте пізніше.",
    });
  }
};

module.exports = {
  startGame,
  guessNumber,
};
