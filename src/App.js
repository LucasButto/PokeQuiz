import { useState, useEffect } from "react";
import "./App.css";
import logo from "./Img/logo.png";
import { useApi } from "./Hooks/useApi";
import { Gens } from "./Constants.js";

function App() {
  const [hints, setHints] = useState({});
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(5);
  const [statusImg, setStatusImg] = useState(false);
  const { getPokemonData, info } = useApi();

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 898) + 1;

    // TODO
    // const hintsHandler = () => {
    //   let types = "";
    //   if (info.types.length === 1) {
    //     types = info.types[0].type.name;
    //   } else {
    //     types = info.types[0].type.name + " and " + info.types[1].type.name;
    //   }

    //   let generation = Gens.filter(
    //     (gen) => info.id >= gen.start && info.id <= gen.end
    //   )[0].name;

    //   let hints = {
    //     letters: info.name.length,
    //     gen: generation,
    //     type: types,
    //   };

    //   return hints;
    // };

    const getData = async () => {
      await getPokemonData(6);
      // TODO setHints(hintsHandler());
    };
    getData();
  }, []);

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
    console.log(info);
    console.log(info.name);
    console.log(info.types.length);
    console.log(info.types[0].type.name);
    console.log(info.types[1].type.name);
    console.log(Gens);
    console.log(
      Gens.filter((gen) => info.id >= gen.start && info.id <= gen.end)
    );
    console.log(hints);
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
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/156.png"
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
            Next!
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
