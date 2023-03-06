import { useEffect, useState } from "react";
import { searchPokemon } from "../ApiCall";
import { hintsHandler } from "../Logic/Hints";

export const useApi = () => {
  const [hints, setHints] = useState({});
  const [info, setInfo] = useState({});
  const [newRequest, setNewRequest] = useState(false);

  const getData = async (id) => {
    const data = await searchPokemon(id);
    setInfo(data);
    setHints(await hintsHandler(data));
  };
  // TODO see why its call the api twice
  useEffect(() => {
    let randomPokemon = Math.floor(Math.random() * 898) + 1;
    getData(randomPokemon);
  }, [newRequest]);

  return {
    hints,
    info,
    setNewRequest,
    newRequest,
  };
};
