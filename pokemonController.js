const pokemon = require("./pokemon.json");

const getSinglePokemon = (req, res) => {
  const num = Number(req.query.num) || 1;
  try {
    const requestedPokemon = pokemon[num - 1];
    res.status(200).json({ data: requestedPokemon });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const advancedSearchPokemon = (req, res) => {
  const { search, types, weaknesses, ability, heights, weights } = req.body;
  const minNum = Number(req.body.minNum) || 1;
  const maxNum = Number(req.body.maxNum) || pokemon.length;
  const page = Number(req.query.page) || 1;
  const sortBy = req.query.sort || "01";
  const limit = 12;
  const skip = (page - 1) * limit;
  try {
    let data = pokemon;
    // filter for search
    if (search) {
      if (Number(search)) {
        const reg = new RegExp(search, "i");
        data = data.filter(
          (pokemon) => pokemon.number.toString().search(reg) !== -1
        );
      } else {
        const reg = new RegExp(search, "i");
        data = data.filter((pokemon) => pokemon.name.search(reg) !== -1);
      }
    }

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

    if (sortBy !== "01") {
      const sortedData = [];
      if (sortBy === "10") {
        for (let i = data.length - 1; i >= 0; i--) {
          sortedData.push(data[i]);
        }
        data = sortedData;
      } else if (sortBy === "az" || sortBy === "za") {
        const dataToSort = [...data];
        dataToSort.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });
        if (sortBy === "za") {
          for (let i = data.length - 1; i >= 0; i--) {
            sortedData.push(dataToSort[i]);
          }
          data = sortedData;
        } else {
          data = dataToSort;
        }
      }
    }

    const pages = Math.ceil(data.length / limit);
    data = data.slice(skip, skip + limit);
    res.status(200).json({ pages, data });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const randomPokemon = (req, res) => {
  const currentPokemon = req.body.pokemon;
  const limit = req.query.limit || 12;
  const minNum = Number(req.query.minNum) || 1;
  const maxNum = Number(req.query.maxNum) || 898;
  try {
    const availablePokemon = pokemon.slice(minNum - 1, maxNum);
    const newPokemon = [];
    const newPokemonNames = [];
    while (newPokemon.length < limit) {
      const randomIndex = Math.floor(Math.random() * availablePokemon.length);
      if (
        !currentPokemon.includes(availablePokemon[randomIndex].name) &&
        !newPokemonNames.includes(availablePokemon[randomIndex].name)
      ) {
        newPokemon.push(availablePokemon[randomIndex]);
        newPokemonNames.push(availablePokemon[randomIndex].name);
      }
    }
    res.status(200).json({ data: newPokemon });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = { getSinglePokemon, advancedSearchPokemon, randomPokemon };
