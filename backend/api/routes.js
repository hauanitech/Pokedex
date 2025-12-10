const express = require("express");
const router = express.Router();

const pokemonRouter = require("./pokemon/routes");
const userRouter = require("./users/routes");
const adminRouter = require("./admin/routes");


router.use("/pokemon", pokemonRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);


module.exports = router; 