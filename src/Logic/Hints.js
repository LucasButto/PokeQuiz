import { Gens } from "../Constants";

export const hintsHandler = async (data) => {
  let types = "";
  if (data.types.length === 1) {
    types = data.types[0].type.name;
  } else {
    types = data.types[0].type.name + " and " + data.types[1].type.name;
  }

  let generation = Gens.filter(
    (gen) => data.id >= gen.start && data.id <= gen.end
  )[0].name;

  let hints = {
    letters: data.name.length,
    gen: generation,
    type: types,
  };

  return hints;
};
