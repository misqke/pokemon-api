require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { searchPokemon, advancedSearchPokemon } = require("./pokemonController");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("public"));

app.get("/api", searchPokemon);
app.post("/api", advancedSearchPokemon);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server listening on port ${port}...`));
