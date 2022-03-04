const pokemon = require("./pokemon.json");

const getPokemon = (req, res) => {
  const { search, type } = req.query;
  const exactType = Boolean(req.query.exactType) || false;
  let data = [];
  try {
    if (type) {
      const typeArr = type.split(",");
      for (let i = 0; i < pokemon.length; i++) {
        if (exactType === false) {
          for (let j = 0; j < pokemon[i].type.length; j++) {
            if (typeArr.includes(pokemon[i].type[j].toLowerCase())) {
              data.push(pokemon[i]);
              break;
            }
          }
        }
        if (exactType === true) {
          let exact = true;
          for (let j = 0; j < typeArr.length; j++) {
            let capType = typeArr[j];
            let firstLetter = capType[0].toUpperCase();
            if (!pokemon[i].type.includes(firstLetter + capType.slice(1))) {
              exact = false;
              break;
            }
          }
          if (exact) {
            data.push(pokemon[i]);
          }
          exact = true;
        }
      }
    }
    if (search) {
      if (Number(search)) {
        const poke = pokemon.filter((pok) => pok.number === Number(search));
        data.push(...poke);
      } else {
        const reg = new RegExp(search, "g");
        const poke = pokemon.filter(
          (pok) => pok.name.toLowerCase().search(reg) !== -1
        );
        data.push(...poke);
      }
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = getPokemon;
