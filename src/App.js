import { useState, useEffect } from "react";
import "./App.css";
import logo from "./Img/logo.png";
import { useApi } from "./Hooks/useApi.js";
import { SelectedGenId } from "./Logic/SelectedGenId";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function App() {
  const { info, hints, getData } = useApi();

  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [trys, setTrys] = useState(0);
  const [statusImg, setStatusImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newRequest, setNewRequest] = useState(false);

  const [isCheckedGen1, setIsCheckedGen1] = useState(true);
  const [isCheckedGen2, setIsCheckedGen2] = useState(true);
  const [isCheckedGen3, setIsCheckedGen3] = useState(true);
  const [isCheckedGen4, setIsCheckedGen4] = useState(true);
  const [isCheckedGen5, setIsCheckedGen5] = useState(true);
  const [isCheckedGen6, setIsCheckedGen6] = useState(true);
  const [isCheckedGen7, setIsCheckedGen7] = useState(true);
  const [isCheckedGen8, setIsCheckedGen8] = useState(true);
  let selectedGens = [
    isCheckedGen1,
    isCheckedGen2,
    isCheckedGen3,
    isCheckedGen4,
    isCheckedGen5,
    isCheckedGen6,
    isCheckedGen7,
    isCheckedGen8,
  ];

  const [modalStyles, setModalStyles] = useState("modal - hide-modal");
  const [inputStyles, setInputStyles] = useState("form-input");
  const [skipButton, setSkipButton] = useState(true);
  const [nextButtonStyles, setNextButtonStyles] = useState(
    "disabled form-button"
  );

  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${info.id}.png`;

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("best") !== null) {
      setBest(JSON.parse(localStorage.getItem("best")));
    }
    let randomPokemon = SelectedGenId(selectedGens);
    getData(randomPokemon);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [newRequest]);

  useEffect(() => {
    if (score > best) {
      setBest(score);
      localStorage.removeItem("best");
      localStorage.setItem("best", JSON.stringify(best + 1));
    }
  }, [score, best]);

  const answerButtonHandler = () => {
    if (input !== "") {
      if (statusImg === false) {
        if (input.toLowerCase() === info.name.toLowerCase()) {
          setScore(score + 1);
          setStatusImg(true);
          setNextButtonStyles("form-button");
          setSkipButton(false);
        } else {
          setTrys(trys + 1);
          setStatusImg(false);
          setInput("");
        }

        if (trys >= 3) {
          setTrys(0);
          setScore(0);
          setStatusImg(true);
          setInput("");
          setInputStyles("form-input input-disabled");
        }
      }
    }
  };

  const enterPressed = (e) => {
    if (e.key === "Enter") {
      if (nextButtonStyles === "form-button") {
        nextPokemonButtonHandler();
      } else {
        answerButtonHandler();
      }
    }
  };

  window.onkeydown = enterPressed;

  const skipPokemonButtonHandler = () => {
    setStatusImg(true);
    setTimeout(() => {
      setNewRequest(!newRequest);
      setStatusImg(false);
      setInput("");
      setScore(0);
      setTrys(0);
      setInputStyles("form-input");
    }, 2000);
  };

  const nextPokemonButtonHandler = () => {
    setNewRequest(!newRequest);
    setStatusImg(false);
    setInput("");
    setTrys(0);
    setNextButtonStyles("form-button disabled");
    setSkipButton(true);
  };

  //TODO settings logic

  const openModalHandler = () => {
    setModalStyles("modal");
  };

  const closeModalHandler = () => {
    setModalStyles("modal - hide-modal");
  };

  const applyChangesHandler = () => {
    closeModalHandler();
    setNewRequest(!newRequest);
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
      <main className="quiz-container">
        <div className="img-container">
          <h3>¿Who's that pokemon?</h3>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <img
              className={"pokemon-img " + (statusImg ? "show" : "hiden")}
              src={pokemonImg}
              alt="Pokemon"
            />
          )}
          {statusImg ? <p className="pokemon-name">{info.name}</p> : null}
        </div>
        <div className="options-container">
          <h3>Enter your answer</h3>
          <div className="form-container">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Insert the pokemon's name..."
              className={inputStyles}
            />
            <button
              className={statusImg ? "form-button disabled" : "form-button"}
              onClick={answerButtonHandler}
            >
              Go!
            </button>
          </div>
          <div className="hints">
            {trys >= 1 ? (
              <input
                type="text"
                placeholder={"His name has " + hints.letters + " letters"}
                className="hint show-hint"
                disabled
              />
            ) : (
              <input
                type="text"
                placeholder={"Try a pokemon for the first hint"}
                className="hint"
                disabled
              />
            )}
            {trys >= 2 ? (
              <input
                type="text"
                placeholder={"It's a " + hints.type + " pokemon"}
                className="hint show-hint"
                disabled
              />
            ) : (
              <input
                type="text"
                placeholder={"Try a pokemon for the second hint"}
                className="hint"
                disabled
              />
            )}
            {trys >= 3 ? (
              <input
                type="text"
                placeholder={"It's a pokemon from " + hints.gen}
                className="hint show-hint"
                disabled
              />
            ) : (
              <input
                type="text"
                placeholder={"Try a pokemon for the third hint"}
                className="hint"
                disabled
              />
            )}
          </div>
          <div className="buttons-container">
            <button
              className={skipButton ? "form-button" : "form-button disabled"}
              onClick={skipPokemonButtonHandler}
            >
              Skip!
            </button>
            <button
              className={nextButtonStyles}
              onClick={nextPokemonButtonHandler}
            >
              Next!
            </button>
          </div>
        </div>
      </main>
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
                    checked={isCheckedGen1}
                    onChange={() => setIsCheckedGen1(!isCheckedGen1)}
                  />
                  <label htmlFor="gen1">Kanto</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen2"
                    id="gen2"
                    checked={isCheckedGen2}
                    onChange={() => setIsCheckedGen2(!isCheckedGen2)}
                  />
                  <label htmlFor="gen2">Johto</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen3"
                    id="gen3"
                    checked={isCheckedGen3}
                    onChange={() => setIsCheckedGen3(!isCheckedGen3)}
                  />
                  <label htmlFor="gen3">Hoenn</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen4"
                    id="gen4"
                    checked={isCheckedGen4}
                    onChange={() => setIsCheckedGen4(!isCheckedGen4)}
                  />
                  <label htmlFor="gen4">Sinnoh</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen5"
                    id="gen5"
                    checked={isCheckedGen5}
                    onChange={() => setIsCheckedGen5(!isCheckedGen5)}
                  />
                  <label htmlFor="gen5">Unova</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen6"
                    id="gen6"
                    checked={isCheckedGen6}
                    onChange={() => setIsCheckedGen6(!isCheckedGen6)}
                  />
                  <label htmlFor="gen6">Kalos</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen7"
                    id="gen7"
                    checked={isCheckedGen7}
                    onChange={() => setIsCheckedGen7(!isCheckedGen7)}
                  />
                  <label htmlFor="gen7">Alola</label>
                </div>
                <div className="generation">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="gen8"
                    id="gen8"
                    checked={isCheckedGen8}
                    onChange={() => setIsCheckedGen8(!isCheckedGen8)}
                  />
                  <label htmlFor="gen8">Galar</label>
                </div>
              </div>
              <button className="form-button" onClick={applyChangesHandler}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
