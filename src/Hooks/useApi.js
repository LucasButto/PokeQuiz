import { useState } from "react";
import { searchPokemon } from "../ApiCall";
import { hintsHandler } from "../Logic/Hints";
import { newNames } from "../Logic/Normalize";

export const useApi = () => {
  const [hints, setHints] = useState({});
  const [info, setInfo] = useState({});

  const getData = async (id) => {
    const data = await searchPokemon(id);
    data.name = await newNames({ oldName: data.name });
    setInfo(data);
    setHints(await hintsHandler(data));
  };

  return {
    hints,
    info,
    getData,
  };
};
