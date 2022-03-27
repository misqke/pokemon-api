const express = require("express");
const router = express.Router();

const {
  getSinglePokemon,
  advancedSearchPokemon,
} = require("../controllers/searchControllers");

router.get("/", getSinglePokemon);
router.post("/", advancedSearchPokemon);

module.exports = router;
