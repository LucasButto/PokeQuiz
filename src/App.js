import { useState } from "react";
import "./App.css";
import logo from "./Img/logo.png";
import { useApi } from "./Hooks/useApi.js";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function App() {
  const { info, hints, setNewRequest, newRequest } = useApi();
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${info.id}.png`;

  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(5);
  const [trys, setTrys] = useState(0);
  const [statusImg, setStatusImg] = useState(false);
  const [modalStyles, setModalStyles] = useState("modal - hide-modal");

  const answerButtonHandler = () => {
    if (input === info.name) {
      setScore(score + 1);
      setStatusImg(true);
    } else {
      setTrys(trys + 1);
      setStatusImg(false);
    }
  };

  const newPokemonButtonHandler = () => {
    setNewRequest(!newRequest);
    setStatusImg(false);
    setInput("");
  };

  const openModalHandler = () => {
    setModalStyles("modal");
  };

  const closeModalHandler = () => {
    setModalStyles("modal - hide-modal");
  };

  return (
    <div className="app">
      <header className="app-header">
        <button className="settings-button" onClick={openModalHandler}>
          <SettingsIcon />
        </button>
        <img src={logo} alt="logo" className="logo" />
        <div className="score">
          <p className="actual-score">Actual score: {score}</p>
          <p className="best-score">Personal best: {best}</p>
        </div>
      </header>
      <div className="quiz-container">
        <div className="img-container">
          <h3>¿Who's that pokemon?</h3>
          {info ? (
            <img
              className={"pokemon-img " + (statusImg ? "show" : "hiden")}
              src={pokemonImg}
              alt="Pokemon"
            />
          ) : (
            <h2>Loading...</h2>
          )}

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
            {trys === 1 ? (
              <input
                type="text"
                placeholder={"His name has " + hints.letters + " letters"}
                className="hint"
                disabled
              />
            ) : (
              <input
                type="text"
                placeholder={"Try a pokemon for the first hint"}
                className="hint show-hint"
                disabled
              />
            )}
            {trys === 2 ? (
              <input
                type="text"
                placeholder={"It's a " + hints.type + " pokemon"}
                className="hint"
                disabled
              />
            ) : (
              <input
                type="text"
                placeholder={"Try a pokemon for the second hint"}
                className="hint show-hint"
                disabled
              />
            )}
            {trys === 3 ? (
              <input
                type="text"
                placeholder={"It's a pokemon from " + hints.gen}
                className="hint"
                disabled
              />
            ) : (
              <input
                type="text"
                placeholder={"Try a pokemon for the third hint"}
                className="hint show-hint"
                disabled
              />
            )}
          </div>
          <button className="form-button" onClick={newPokemonButtonHandler}>
            Skip!
          </button>
        </div>
      </div>
      <div className={modalStyles}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Settings</h2>
            <button className="close-modal-button" onClick={closeModalHandler}>
              <CloseRoundedIcon />
            </button>
          </div>
          <div className="modal-body">
            <div className="settings-gens">
              <h4>Select generations:</h4>
              <div className="generations">
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen1"
                    id="gen1"
                  />
                  <label htmlFor="gen1">Kanto</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen2"
                    id="gen2"
                  />
                  <label htmlFor="gen2">Johto</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen3"
                    id="gen3"
                  />
                  <label htmlFor="gen3">Hoenn</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen4"
                    id="gen4"
                  />
                  <label htmlFor="gen4">Sinnoh</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen5"
                    id="gen5"
                  />
                  <label htmlFor="gen5">Unova</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen6"
                    id="gen6"
                  />
                  <label htmlFor="gen6">Kalos</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen7"
                    id="gen7"
                  />
                  <label htmlFor="gen7">Alola</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen8"
                    id="gen8"
                  />
                  <label htmlFor="gen8">Galar</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
