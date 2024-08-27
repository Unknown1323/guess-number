import React from "react";

const GameResult = ({ startGame }) => {
  return (
    <div className="fade-in">
      <img src="happy-owl.svg" alt="Congratulations" />
      <button onClick={startGame} className="start-button">
        Почати нову гру
      </button>
    </div>
  );
};

export default GameResult;
