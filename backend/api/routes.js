const express = require("express");
const router = express.Router()

const pokemonRouter = require("./pokemon/routes");
const userRouter = require("./users/routes");


router.use("/pokemon", pokemonRouter);
router.use("/user", userRouter);


module.exports = router; 