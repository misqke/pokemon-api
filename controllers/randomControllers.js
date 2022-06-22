const pokemon = require("../pokemon.json");

const randomPokemon = (req, res) => {
  const currentPokemon = req.body.pokemon || [];
  const limit = Number(req.query.limit) || 12;

  try {
    const newPokemon = [];
    const newPokemonNames = [];
    while (newPokemon.length < limit) {
      const randomIndex = Math.floor(Math.random() * pokemon.length);
      if (
        !currentPokemon.includes(pokemon[randomIndex].name) &&
        !newPokemonNames.includes(pokemon[randomIndex].name)
      ) {
        newPokemon.push(pokemon[randomIndex]);
        newPokemonNames.push(pokemon[randomIndex].name);
      }
    }
    res.status(200).json({ data: newPokemon });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const whosThatPokemon = (req, res) => {
  const limit = Number(req.query.limit) || 15;
  const minNum = Number(req.query.min) || 1;
  const maxNum = Number(req.query.max) || 898;
  try {
    const pokemonList = pokemon.slice(minNum - 1, maxNum);
    const names = pokemonList.map((pokemon) => pokemon.name);
    const randomPokemon = [];
    while (randomPokemon.length < limit) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      randomPokemon.push(pokemonList.splice(randomIndex, 1)[0]);
    }
    res.status(200).json({ pokemon: randomPokemon, names });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = { randomPokemon, whosThatPokemon };
