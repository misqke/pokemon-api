const pokemon = require("./pokemon.json");

const searchPokemon = (req, res) => {
  const { search } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  let data = [];
  try {
    if (search) {
      if (Number(search)) {
        const reg = new RegExp(search, "g");
        const poke = pokemon.filter(
          (pok) => pok.number.toString().search(reg) !== -1
        );
        data.push(...poke);
      } else {
        const reg = new RegExp(search, "g");
        const poke = pokemon.filter(
          (pok) => pok.name.toLowerCase().search(reg) !== -1
        );
        data.push(...poke);
      }
    } else {
      data = pokemon;
    }
    const pages = Math.ceil(data.length / limit);
    data = data.slice(skip, skip + limit);

    res.status(200).json({ pages, data });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const advancedSearchPokemon = (req, res) => {
  const { types, weaknesses, ability, heights, weights } = req.body;
  const minNum = Number(req.body.minNum) || 1;
  const maxNum = Number(req.body.maxNum) || pokemon.length;
  const page = Number(req.query.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  try {
    let data = pokemon;
    // filter by number range
    if (minNum > 1 || maxNum < pokemon.length) {
      const numFilteredData = data.slice(minNum - 1, maxNum);
      data = numFilteredData;
    }
    // filter for type match
    if (types) {
      const typeFilteredData = [];
      data.forEach((pokemon) => {
        let matchedTypes = 0;
        pokemon.type.forEach((pokemonType) => {
          if (types.includes(pokemonType)) {
            matchedTypes++;
          }
        });
        if (matchedTypes === types.length) {
          typeFilteredData.push(pokemon);
        }
      });
      data = typeFilteredData;
    }

    // filter for weakness match
    if (weaknesses) {
      const weaknessesFilteredData = [];
      data.forEach((pokemon) => {
        let matchedWeaknesses = 0;

        pokemon.weaknesses.forEach((pokemonWeakness) => {
          if (weaknesses.includes(pokemonWeakness)) {
            matchedWeaknesses++;
          }
        });
        if (matchedWeaknesses === weaknesses.length) {
          weaknessesFilteredData.push(pokemon);
        }
      });
      data = weaknessesFilteredData;
    }

    // filter for ability match
    if (ability) {
      data = data.filter((pokemon) => {
        let match = false;
        pokemon.info[4].value.forEach((pokemonAbility) => {
          if (pokemonAbility.name.toLowerCase() === ability.toLowerCase()) {
            match = true;
          }
        });
        if (match === true) {
          return true;
        } else {
          return false;
        }
      });
    }

    // filter by heights
    if (heights && heights.length < 3) {
      const heightFilteredData = [];
      data.forEach((pokemon) => {
        const pokemonHeight = Number(pokemon.info[0].value.split("'")[0]);
        if (heights.includes("small")) {
          if (pokemonHeight < 4) {
            heightFilteredData.push(pokemon);
          }
        }
        if (heights.includes("medium")) {
          if (pokemonHeight < 7 && pokemonHeight >= 4) {
            heightFilteredData.push(pokemon);
          }
        }
        if (heights.includes("large")) {
          if (pokemonHeight >= 7) {
            heightFilteredData.push(pokemon);
          }
        }
      });
      data = heightFilteredData;
    }

    // filter by weights
    if (weights && weights.length < 3) {
      const weightFilteredData = [];
      data.forEach((pokemon) => {
        const pokemonWeight = Number(pokemon.info[1].value.split(" ")[0]);
        if (weights.includes("small")) {
          if (pokemonWeight < 90) {
            weightFilteredData.push(pokemon);
          }
        }
        if (weights.includes("medium")) {
          if (pokemonWeight < 500 && pokemonWeight >= 90) {
            weightFilteredData.push(pokemon);
          }
        }
        if (weights.includes("large")) {
          if (pokemonWeight >= 500) {
            weightFilteredData.push(pokemon);
          }
        }
      });
      data = weightFilteredData;
    }

    const pages = Math.ceil(data.length / limit);
    data = data.slice(skip, skip + limit);
    res.status(200).json({ pages, data });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = { searchPokemon, advancedSearchPokemon };
