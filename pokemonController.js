const pokemon = require("./pokemon.json");

const searchPokemon = (req, res) => {
  const { search } = req.query;
  let data = [];
  try {
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

const advancedSearchPokemon = (req, res) => {
  const { type, weaknesses, ability, minNum, maxNum, height, weight } =
    req.body;
  try {
    let data = pokemon;
    // filter for type match
    if (type) {
      const typeFilteredData = [];
      data.forEach((pokemon) => {
        let matchedTypes = 0;
        if (pokemon.type.length === type.length) {
          pokemon.type.forEach((pokemonType) => {
            if (type.includes(pokemonType)) {
              matchedTypes++;
            }
          });
          if (matchedTypes === type.length) {
            typeFilteredData.push(pokemon);
          }
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

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = { searchPokemon, advancedSearchPokemon };
