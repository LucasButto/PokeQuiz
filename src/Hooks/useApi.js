import { useState } from "react";
import { searchPokemon } from "../ApiCall";
import { hintsHandler } from "../Logic/Hints";

export const useApi = () => {
  const [hints, setHints] = useState({});
  const [info, setInfo] = useState({});

  const getData = async (id) => {
    const data = await searchPokemon(id);
    setInfo(data);
    setHints(await hintsHandler(data));
  };

  return {
    hints,
    info,
    getData,
  };
};