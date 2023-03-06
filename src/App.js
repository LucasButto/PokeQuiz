import { useState } from "react";
import "./App.css";
import logo from "./Img/logo.png";
import { Gens } from "./Constants.js";
import { useApi } from "./Hooks/useApi.js";

function App() {
  const { info, hints, setNewRequest, newRequest } = useApi();
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${info.id}.png`;

  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(5);
  const [statusImg, setStatusImg] = useState(false);

  const answerButtonHandler = () => {
    if (input === info.name) {
      setScore(score + 1);
      setStatusImg(true);
    } else {
      setScore(0);
      setStatusImg(false);
    }
  };

  const newPokemonButtonHandler = () => {
    setNewRequest(!newRequest);
    setStatusImg(false);
    setInput("");
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="logo" className="logo" />
        <div className="score">
          <p className="actual-score">Actual score: {score}</p>
          <p className="best-score">Personal best: {best}</p>
        </div>
      </header>
      <div className="quiz-container">
        <div className="img-container">
          <h3>¿Who's that pokemon?</h3>
          <img
            className={"pokemon-img " + (statusImg ? "show" : "hiden")}
            src={pokemonImg}
            alt="Pokemon"
          />
          {statusImg ? <p className="pokemon-name">{input}</p> : null}
        </div>
        <div className="options-container">
          <h3>Enter your answer</h3>
          <div className="form-container">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Insert the pokemon's name..."
              className="form-input"
            />
            <button className="form-button" onClick={answerButtonHandler}>
              Go!
            </button>
          </div>
          <div className="hints">
            <input
              type="text"
              placeholder={"His name has " + hints.letters + " letters"}
              className="hint"
              disabled
            />
            <input
              type="text"
              placeholder={"It's a " + hints.type + " pokemon"}
              className="hint"
              disabled
            />
            <input
              type="text"
              placeholder={"It's a pokemon from " + hints.gen}
              className="hint"
              disabled
            />
          </div>
          <button className="form-button" onClick={newPokemonButtonHandler}>
            Skip!
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
