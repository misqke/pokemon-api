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
  const minNum = Number(req.query.minNum) || 1;
  const maxNum = Number(req.query.maxNum) || 898;
  try {
    const pokemonList = pokemon.slice(minNum - 1, maxNum);
    const randomPokemon = [];
    while (randomPokemon.length < limit) {
      const randomNumbers = [];
      while (randomNumbers.length < 4) {
        const randIndex = Math.floor(Math.random() * pokemonList.length);
        if (!randomNumbers.includes(randIndex)) {
          randomNumbers.push(randIndex);
        }
      }
      const answer = {
        name: pokemonList[randomNumbers[0]].name,
        desc: pokemonList[randomNumbers[0]].desc1,
        img: pokemonList[randomNumbers[0]].img,
      };
      const question = {
        answer,
        choices: [
          pokemonList[randomNumbers[1]].name,
          pokemonList[randomNumbers[2]].name,
          pokemonList[randomNumbers[3]].name,
        ],
      };
      randomPokemon.push(question);
    }
    res.status(200).json({ pokemon: randomPokemon });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = { randomPokemon, whosThatPokemon };
