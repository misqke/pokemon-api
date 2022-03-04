require("dotenv").config();
const express = require("express");
const getPokemon = require("./pokemonController");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api", getPokemon);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server listening on port ${port}...`));
