import React from "react";

const FormContainer = ({
  inputValue,
  setInputValue,
  handleSubmit,
  gameStarted,
}) => {
  return (
    <div className="form-container fade-in">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!gameStarted}
          placeholder="Введіть число"
          className="input-field"
        />
        <button type="submit" disabled={!gameStarted} className="submit-button">
          Відправити
        </button>
        <img className="img" src="talking-owl.svg" alt="Congratulations" />
      </form>
    </div>
  );
};

export default FormContainer;
