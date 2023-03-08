export const SelectedGenId = (selectedGens) => {
  let validNumber = false;

  if (selectedGens.includes(false)) {
    while (!validNumber) {
      let gen = Math.floor(Math.random() * 8);
      if (selectedGens[gen] === true) {
        validNumber = true;
        switch (gen + 1) {
          case 1:
            console.log("kanto");
            return Math.floor(Math.random() * 151) + 1;
          case 2:
            console.log("johto");
            return Math.floor(Math.random() * 100) + 152;
          case 3:
            console.log("hoenn");
            return Math.floor(Math.random() * 135) + 252;
          case 4:
            console.log("sinnoh");
            return Math.floor(Math.random() * 107) + 387;
          case 5:
            console.log("unova");
            return Math.floor(Math.random() * 156) + 494;
          case 6:
            console.log("kalos");
            return Math.floor(Math.random() * 72) + 650;
          case 7:
            console.log("alola");
            return Math.floor(Math.random() * 88) + 722;
          case 8:
            console.log("galar");
            return Math.floor(Math.random() * 89) + 810;

          default:
            break;
        }
      }
    }
  } else {
    return Math.floor(Math.random() * 898) + 1;
  }
};
