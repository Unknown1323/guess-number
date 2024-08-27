import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ConfettiEffect from "./components/ConfettiEffect";
import FormContainer from "./components/FormContainer";
import GameResult from "./components/GameResult";
import ClipLoader from "react-spinners/ClipLoader";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);

  const startGame = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3001/start_game");
      setMessage("Гру розпочато! Введіть число.");
      setGameStarted(true);
      setShowForm(true);
      setShowConfetti(false);
    } catch (error) {
      console.error("Error starting game:", error);
      setMessage("Помилка при запуску гри.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (inputValue === "") return;

      try {
        const response = await axios.post("http://localhost:3001/guess", {
          guess: parseInt(inputValue),
        });
        setMessage(response.data.message);

        if (response.data.status === "win") {
          setInputValue("");
          setGameStarted(false);
          setShowForm(false);
          setShowConfetti(true);
        }
      } catch (error) {
        console.error("Error submitting guess:", error);
        setMessage("Помилка при перевірці числа.");
      }
    },
    [inputValue]
  );

  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color={"#36d7b7"} loading={loading} size={100} />
        </div>
      ) : (
        <div className="app-container">
          <h1 className="title">Гра "Вгадай число"</h1>
          {showForm && (
            <FormContainer
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSubmit={handleSubmit}
              gameStarted={gameStarted}
            />
          )}
          <p className="message">{message}</p>
          {showConfetti && <ConfettiEffect />}
          {!gameStarted && !showForm && <GameResult startGame={startGame} />}
        </div>
      )}
    </>
  );
}

export default App;
