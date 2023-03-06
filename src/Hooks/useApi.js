import { useState } from "react";

export const useApi = () => {
  const [info, setInfo] = useState();

  const getPokemonData = async (idPokedex) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${idPokedex}`
      );
      const data = await response.json();
      setInfo(data);
      console.log(data);
    } catch (error) {
      return console.log(error);
    }
  };

  return {
    getPokemonData,
    info,
  };
};
