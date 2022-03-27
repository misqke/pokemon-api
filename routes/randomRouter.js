const express = require("express");
const router = express.Router();

const {
  randomPokemon,
  whosThatPokemon,
} = require("../controllers/randomControllers");

router.post("/", randomPokemon);
router.get("/", whosThatPokemon);

module.exports = router;
